import { useState, useEffect } from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BottomBar from '../components/BottomBar';

export default function StatsPage() {
  const [pronos, setPronos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPronos();
  }, []);

  const loadPronos = async () => {
    try {
      const res = await fetch('/api/pronos');
      const data = await res.json();
      setPronos(data);
    } catch (error) {
      console.error('Erreur chargement pronos:', error);
    }
    setLoading(false);
  };

  // IMPORTANT: Filtrer les pronos "En Attente" pour les statistiques
  const pronosValides = pronos.filter(p => p.statut !== 'En Attente');

  // Calculs globaux (SANS les pronos "En Attente")
  const totalPronos = pronosValides.length;
  const pronosGagnes = pronosValides.filter(p => p.statut === 'Gagne').length;
  const pronosPerdus = pronosValides.filter(p => p.statut === 'Perdu').length;
  const pronosRembourses = pronosValides.filter(p => p.statut === 'Rembourse').length;
  
  const miseTotal = pronosValides.reduce((sum, p) => sum + parseFloat(p.mise), 0);
  
  const gainsTotal = pronosValides.reduce((sum, p) => {
    if (p.statut === 'Gagne') {
      return sum + (parseFloat(p.mise) * parseFloat(p.cote));
    }
    if (p.statut === 'Rembourse') {
      return sum + parseFloat(p.mise);
    }
    return sum;
  }, 0);
  
  const gainNet = gainsTotal - miseTotal;
  const roi = miseTotal > 0 ? ((gainNet / miseTotal) * 100) : 0;
  const tauxReussite = (pronosGagnes + pronosPerdus) > 0 
    ? ((pronosGagnes / (pronosGagnes + pronosPerdus)) * 100) 
    : 0;

  // Evolution mensuelle (SANS les pronos "En Attente")
  const pronosByMonth = pronosValides.reduce((acc, p) => {
    const date = new Date(p.date);
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    
    if (!acc[monthKey]) {
      acc[monthKey] = {
        month: monthKey,
        total: 0,
        gagnes: 0,
        perdus: 0,
        rembourses: 0,
        miseTotal: 0,
        gainsTotal: 0
      };
    }
    
    acc[monthKey].total++;
    acc[monthKey].miseTotal += parseFloat(p.mise);
    
    if (p.statut === 'Gagne') {
      acc[monthKey].gagnes++;
      acc[monthKey].gainsTotal += parseFloat(p.mise) * parseFloat(p.cote);
    } else if (p.statut === 'Perdu') {
      acc[monthKey].perdus++;
    } else if (p.statut === 'Rembourse') {
      acc[monthKey].rembourses++;
      acc[monthKey].gainsTotal += parseFloat(p.mise);
    }
    
    return acc;
  }, {});

  const monthlyStats = Object.values(pronosByMonth).sort((a, b) => b.month.localeCompare(a.month));

  // Données pour le graphique d'évolution cumulée (SANS les pronos "En Attente")
  const sortedPronosByCB = [...pronosValides].sort((a, b) => a.cb_number.localeCompare(b.cb_number));
  const cumulativeData = sortedPronosByCB.reduce((acc, prono, index) => {
    const previousSolde = index > 0 ? acc[index - 1].soldeCumule : 0;
    const previousMise = index > 0 ? acc[index - 1].miseCumulee : 0;

    let gainBrutProno = 0;
    if (prono.statut === 'Gagne') {
      gainBrutProno = parseFloat(prono.mise) * parseFloat(prono.cote);
    } else if (prono.statut === 'Rembourse') {
      gainBrutProno = parseFloat(prono.mise);
    }
    // Si Perdu, gainBrutProno = 0

    const miseCumulee = previousMise + parseFloat(prono.mise);
    const soldeCumule = previousSolde + gainBrutProno - parseFloat(prono.mise);
    const roiCumule = miseCumulee > 0 ? (soldeCumule / miseCumulee) * 100 : 0;

    acc.push({
      cbNumber: prono.cb_number,
      date: new Date(prono.date).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' }),
      soldeCumule: parseFloat(soldeCumule.toFixed(2)),
      roiCumule: parseFloat(roiCumule.toFixed(2)),
      miseCumulee: parseFloat(miseCumulee.toFixed(2))
    });

    return acc;
  }, []);

  // Calcul des extremums pour l'échelle du graphique
  const maxGain = Math.max(...cumulativeData.map(d => d.soldeCumule), 0);
  const minGain = Math.min(...cumulativeData.map(d => d.soldeCumule), 0);
  const maxROI = Math.max(...cumulativeData.map(d => d.roiCumule), 0);
  const minROI = Math.min(...cumulativeData.map(d => d.roiCumule), 0);

  // Bilan par bookmaker (SANS les pronos "En Attente")
  const pronosByBookmaker = pronosValides.reduce((acc, p) => {
    if (!acc[p.bookmaker]) {
      acc[p.bookmaker] = {
        bookmaker: p.bookmaker,
        total: 0,
        gagnes: 0,
        perdus: 0,
        rembourses: 0,
        miseTotal: 0,
        gainsTotal: 0
      };
    }
    
    acc[p.bookmaker].total++;
    acc[p.bookmaker].miseTotal += parseFloat(p.mise);
    
    if (p.statut === 'Gagne') {
      acc[p.bookmaker].gagnes++;
      acc[p.bookmaker].gainsTotal += parseFloat(p.mise) * parseFloat(p.cote);
    } else if (p.statut === 'Perdu') {
      acc[p.bookmaker].perdus++;
    } else if (p.statut === 'Rembourse') {
      acc[p.bookmaker].rembourses++;
      acc[p.bookmaker].gainsTotal += parseFloat(p.mise);
    }
    
    return acc;
  }, {});

  const bookmakerStats = Object.values(pronosByBookmaker).sort((a, b) => {
    const gainNetA = a.gainsTotal - a.miseTotal;
    const gainNetB = b.gainsTotal - b.miseTotal;
    return gainNetB - gainNetA; // Du meilleur au moins bon
  });

  // Evolution mensuelle par bookmaker (SANS les pronos "En Attente")
  const monthlyByBookmaker = pronosValides.reduce((acc, p) => {
    const date = new Date(p.date);
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    const key = `${monthKey}_${p.bookmaker}`;
    
    if (!acc[key]) {
      acc[key] = {
        month: monthKey,
        bookmaker: p.bookmaker,
        total: 0,
        gagnes: 0,
        perdus: 0,
        rembourses: 0,
        miseTotal: 0,
        gainsTotal: 0
      };
    }
    
    acc[key].total++;
    acc[key].miseTotal += parseFloat(p.mise);
    
    if (p.statut === 'Gagne') {
      acc[key].gagnes++;
      acc[key].gainsTotal += parseFloat(p.mise) * parseFloat(p.cote);
    } else if (p.statut === 'Perdu') {
      acc[key].perdus++;
    } else if (p.statut === 'Rembourse') {
      acc[key].rembourses++;
      acc[key].gainsTotal += parseFloat(p.mise);
    }
    
    return acc;
  }, {});

  const monthlyBookmakerStats = Object.values(monthlyByBookmaker).sort((a, b) => {
    if (b.month !== a.month) return b.month.localeCompare(a.month);
    return a.bookmaker.localeCompare(b.bookmaker);
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-xl text-gray-600">Chargement...</div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Statistiques Cotes Boostées 2026 | Analyses & ROI Paris Sportifs</title>
        <meta name="description" content="Statistiques complètes de nos cotes boostées 2026 : ROI, taux de réussite, évolution mensuelle, bilan par bookmaker. Performance transparente et détaillée." />
        <meta name="keywords" content="statistiques cotes boostées, ROI paris sportifs, stats bookmakers, analyse CB 2026" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Statistiques CB 2026 | Performance & ROI" />
        <meta property="og:description" content="Analyses détaillées et transparence totale sur nos performances." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.cotes-boostees.com/stats" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Statistiques CB 2026 | Performance" />
        <meta name="twitter:description" content="Toutes nos statistiques en détail." />
        
        <link rel="canonical" href="https://www.cotes-boostees.com/stats" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col pb-20 lg:pb-0">
        <Header currentPage="stats" />

        <div className="max-w-7xl mx-auto px-4 py-8 flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">Statistiques CB 2026</h1>

          {/* Stats Globales */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="text-sm text-gray-600 mb-1">Total CB</div>
              <div className="text-2xl font-bold text-indigo-600">{totalPronos}</div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="text-sm text-gray-600 mb-1">Taux Réussite</div>
              <div className="text-2xl font-bold text-indigo-600">{tauxReussite.toFixed(1)}%</div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="text-sm text-gray-600 mb-1">Gain Net</div>
              <div className={`text-2xl font-bold ${gainNet >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {gainNet >= 0 ? '+' : ''}{gainNet.toFixed(2)} €
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="text-sm text-gray-600 mb-1">ROI</div>
              <div className={`text-2xl font-bold ${roi >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {roi >= 0 ? '+' : ''}{roi.toFixed(2)}%
              </div>
            </div>
          </div>

          {/* Répartition Gagnés/Perdus/Remboursés */}
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Répartition des Résultats</h2>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">{pronosGagnes}</div>
                <div className="text-sm text-gray-600">Gagnés</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-600">{pronosPerdus}</div>
                <div className="text-sm text-gray-600">Perdus</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">{pronosRembourses}</div>
                <div className="text-sm text-gray-600">Remboursés</div>
              </div>
            </div>
          </div>

          {/* Graphique Evolution Cumulée */}
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Évolution Cumulée</h2>
            {cumulativeData.length === 0 ? (
              <div className="py-8 text-center text-gray-500">Aucune donnée disponible</div>
            ) : (
              <div className="overflow-x-auto">
                <div className="min-w-[600px] h-80 relative">
                  <svg className="w-full h-full" viewBox="0 0 1000 400" preserveAspectRatio="none">
                    {/* Axes */}
                    <line x1="50" y1="350" x2="950" y2="350" stroke="#e5e7eb" strokeWidth="2" />
                    <line x1="50" y1="50" x2="50" y2="350" stroke="#e5e7eb" strokeWidth="2" />
                    
                    {/* Ligne zéro */}
                    <line x1="50" y1="200" x2="950" y2="200" stroke="#9ca3af" strokeWidth="1" strokeDasharray="5,5" />
                    
                    {/* Courbe des gains */}
                    {cumulativeData.map((point, i) => {
                      if (i === 0) return null;
                      const prevPoint = cumulativeData[i - 1];
                      
                      const x1 = 50 + ((i - 1) / (cumulativeData.length - 1)) * 900;
                      const x2 = 50 + (i / (cumulativeData.length - 1)) * 900;
                      
                      const range = Math.max(Math.abs(maxGain), Math.abs(minGain)) || 1;
                      const y1 = 200 - (prevPoint.soldeCumule / range) * 150;
                      const y2 = 200 - (point.soldeCumule / range) * 150;
                      
                      const color = point.soldeCumule >= 0 ? '#10b981' : '#ef4444';
                      
                      return (
                        <line 
                          key={i}
                          x1={x1} 
                          y1={y1} 
                          x2={x2} 
                          y2={y2} 
                          stroke={color}
                          strokeWidth="2"
                        />
                      );
                    })}
                    
                    {/* Points */}
                    {cumulativeData.map((point, i) => {
                      const x = 50 + (i / (cumulativeData.length - 1)) * 900;
                      const range = Math.max(Math.abs(maxGain), Math.abs(minGain)) || 1;
                      const y = 200 - (point.soldeCumule / range) * 150;
                      const color = point.soldeCumule >= 0 ? '#10b981' : '#ef4444';
                      
                      return (
                        <circle 
                          key={i}
                          cx={x} 
                          cy={y} 
                          r="3" 
                          fill={color}
                        />
                      );
                    })}
                  </svg>
                  
                  {/* Légende Y */}
                  <div className="absolute left-0 top-0 text-xs text-gray-600">
                    +{maxGain.toFixed(0)}€
                  </div>
                  <div className="absolute left-0 top-1/2 -mt-2 text-xs text-gray-600">
                    0€
                  </div>
                  <div className="absolute left-0 bottom-12 text-xs text-gray-600">
                    {minGain.toFixed(0)}€
                  </div>
                </div>
                
                {/* Infos supplémentaires */}
                <div className="mt-4 text-xs text-gray-600 text-center">
                  De {cumulativeData[0]?.cbNumber} à {cumulativeData[cumulativeData.length - 1]?.cbNumber} • 
                  ROI final : {cumulativeData[cumulativeData.length - 1]?.roiCumule.toFixed(2)}%
                </div>
              </div>
            )}
          </div>

          {/* Evolution Mensuelle */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Évolution Mensuelle</h2>
            
            {/* VERSION DESKTOP - Tableau */}
            <div className="hidden lg:block bg-white rounded-lg shadow overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-indigo-50 border-b">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">Mois</th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-600 uppercase">Total</th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-600 uppercase">Gagnés</th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-600 uppercase">Perdus</th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-600 uppercase">Remboursés</th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-600 uppercase">Taux</th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-600 uppercase">Mise</th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-600 uppercase">Gain Net</th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-600 uppercase">ROI</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {monthlyStats.length === 0 ? (
                      <tr>
                        <td colSpan="9" className="px-4 py-8 text-center text-gray-500">
                          Aucune donnée disponible
                        </td>
                      </tr>
                    ) : (
                      monthlyStats.map(stat => {
                        const gainNet = stat.gainsTotal - stat.miseTotal;
                        const roi = stat.miseTotal > 0 ? ((gainNet / stat.miseTotal) * 100) : 0;
                        const taux = (stat.gagnes + stat.perdus) > 0 
                          ? ((stat.gagnes / (stat.gagnes + stat.perdus)) * 100) 
                          : 0;
                        
                        return (
                          <tr key={stat.month} className="hover:bg-gray-50">
                            <td className="px-4 py-3 text-sm font-medium text-gray-900">{stat.month}</td>
                            <td className="px-4 py-3 text-sm text-center text-gray-900">{stat.total}</td>
                            <td className="px-4 py-3 text-sm text-center text-green-600">{stat.gagnes}</td>
                            <td className="px-4 py-3 text-sm text-center text-red-600">{stat.perdus}</td>
                            <td className="px-4 py-3 text-sm text-center text-blue-600">{stat.rembourses}</td>
                            <td className="px-4 py-3 text-sm text-center text-gray-900">{taux.toFixed(1)}%</td>
                            <td className="px-4 py-3 text-sm text-right text-gray-900">{stat.miseTotal.toFixed(2)} €</td>
                            <td className={`px-4 py-3 text-sm text-right font-semibold ${gainNet >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {gainNet >= 0 ? '+' : ''}{gainNet.toFixed(2)} €
                            </td>
                            <td className={`px-4 py-3 text-sm text-right font-semibold ${roi >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {roi >= 0 ? '+' : ''}{roi.toFixed(2)}%
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* VERSION MOBILE - Cards */}
            <div className="lg:hidden space-y-4">
              {monthlyStats.length === 0 ? (
                <div className="bg-white rounded-lg shadow-lg p-8 text-center text-gray-500">
                  Aucune donnée disponible
                </div>
              ) : (
                monthlyStats.map(stat => {
                  const gainNet = stat.gainsTotal - stat.miseTotal;
                  const roi = stat.miseTotal > 0 ? ((gainNet / stat.miseTotal) * 100) : 0;
                  const taux = (stat.gagnes + stat.perdus) > 0 
                    ? ((stat.gagnes / (stat.gagnes + stat.perdus)) * 100) 
                    : 0;
                  
                  return (
                    <div key={stat.month} className="bg-white rounded-lg shadow-lg p-4">
                      {/* Header */}
                      <div className="flex items-center justify-between mb-3 pb-3 border-b border-gray-200">
                        <span className="text-lg font-bold text-indigo-600">{stat.month}</span>
                        <span className="text-sm text-gray-600">Total : {stat.total}</span>
                      </div>

                      {/* Stats */}
                      <div className="grid grid-cols-3 gap-2 mb-3">
                        <div className="text-center">
                          <div className="text-xs text-gray-600">Gagnés</div>
                          <div className="text-lg font-bold text-green-600">{stat.gagnes}</div>
                        </div>
                        <div className="text-center">
                          <div className="text-xs text-gray-600">Perdus</div>
                          <div className="text-lg font-bold text-red-600">{stat.perdus}</div>
                        </div>
                        <div className="text-center">
                          <div className="text-xs text-gray-600">Rembours.</div>
                          <div className="text-lg font-bold text-blue-600">{stat.rembourses}</div>
                        </div>
                      </div>

                      {/* Infos */}
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Taux de réussite :</span>
                          <span className="font-semibold text-indigo-600">{taux.toFixed(1)}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Mise totale :</span>
                          <span className="font-semibold text-gray-900">{stat.miseTotal.toFixed(2)} €</span>
                        </div>
                        <div className="flex justify-between pt-2 border-t border-gray-200">
                          <span className="text-gray-600 font-medium">Gain Net :</span>
                          <span className={`text-lg font-bold ${gainNet >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {gainNet >= 0 ? '+' : ''}{gainNet.toFixed(2)} €
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 font-medium">ROI :</span>
                          <span className={`text-lg font-bold ${roi >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {roi >= 0 ? '+' : ''}{roi.toFixed(2)}%
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Bilan par Bookmaker */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Bilan par Bookmaker</h2>
            
            {/* VERSION DESKTOP - Tableau */}
            <div className="hidden lg:block bg-white rounded-lg shadow overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-indigo-50 border-b">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">Bookmaker</th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-600 uppercase">Total</th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-600 uppercase">Gagnés</th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-600 uppercase">Perdus</th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-600 uppercase">Remboursés</th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-600 uppercase">Taux</th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-600 uppercase">Mise</th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-600 uppercase">Gain Net</th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-600 uppercase">ROI</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {bookmakerStats.length === 0 ? (
                      <tr>
                        <td colSpan="9" className="px-4 py-8 text-center text-gray-500">
                          Aucune donnée disponible
                        </td>
                      </tr>
                    ) : (
                      bookmakerStats.map(stat => {
                        const gainNet = stat.gainsTotal - stat.miseTotal;
                        const roi = stat.miseTotal > 0 ? ((gainNet / stat.miseTotal) * 100) : 0;
                        const taux = (stat.gagnes + stat.perdus) > 0 
                          ? ((stat.gagnes / (stat.gagnes + stat.perdus)) * 100) 
                          : 0;
                        
                        return (
                          <tr key={stat.bookmaker} className="hover:bg-gray-50">
                            <td className="px-4 py-3 text-sm font-medium text-gray-900">{stat.bookmaker}</td>
                            <td className="px-4 py-3 text-sm text-center text-gray-900">{stat.total}</td>
                            <td className="px-4 py-3 text-sm text-center text-green-600">{stat.gagnes}</td>
                            <td className="px-4 py-3 text-sm text-center text-red-600">{stat.perdus}</td>
                            <td className="px-4 py-3 text-sm text-center text-blue-600">{stat.rembourses}</td>
                            <td className="px-4 py-3 text-sm text-center text-gray-900">{taux.toFixed(1)}%</td>
                            <td className="px-4 py-3 text-sm text-right text-gray-900">{stat.miseTotal.toFixed(2)} €</td>
                            <td className={`px-4 py-3 text-sm text-right font-semibold ${gainNet >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {gainNet >= 0 ? '+' : ''}{gainNet.toFixed(2)} €
                            </td>
                            <td className={`px-4 py-3 text-sm text-right font-semibold ${roi >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {roi >= 0 ? '+' : ''}{roi.toFixed(2)}%
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* VERSION MOBILE - Cards */}
            <div className="lg:hidden space-y-4">
              {bookmakerStats.length === 0 ? (
                <div className="bg-white rounded-lg shadow-lg p-8 text-center text-gray-500">
                  Aucune donnée disponible
                </div>
              ) : (
                bookmakerStats.map(stat => {
                  const gainNet = stat.gainsTotal - stat.miseTotal;
                  const roi = stat.miseTotal > 0 ? ((gainNet / stat.miseTotal) * 100) : 0;
                  const taux = (stat.gagnes + stat.perdus) > 0 
                    ? ((stat.gagnes / (stat.gagnes + stat.perdus)) * 100) 
                    : 0;
                  
                  return (
                    <div key={stat.bookmaker} className="bg-white rounded-lg shadow-lg p-4">
                      {/* Header */}
                      <div className="flex items-center justify-between mb-3 pb-3 border-b border-gray-200">
                        <span className="text-lg font-bold text-indigo-600">{stat.bookmaker}</span>
                        <span className="text-sm text-gray-600">Total : {stat.total}</span>
                      </div>

                      {/* Stats */}
                      <div className="grid grid-cols-3 gap-2 mb-3">
                        <div className="text-center">
                          <div className="text-xs text-gray-600">Gagnés</div>
                          <div className="text-lg font-bold text-green-600">{stat.gagnes}</div>
                        </div>
                        <div className="text-center">
                          <div className="text-xs text-gray-600">Perdus</div>
                          <div className="text-lg font-bold text-red-600">{stat.perdus}</div>
                        </div>
                        <div className="text-center">
                          <div className="text-xs text-gray-600">Rembours.</div>
                          <div className="text-lg font-bold text-blue-600">{stat.rembourses}</div>
                        </div>
                      </div>

                      {/* Infos */}
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Taux de réussite :</span>
                          <span className="font-semibold text-indigo-600">{taux.toFixed(1)}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Mise totale :</span>
                          <span className="font-semibold text-gray-900">{stat.miseTotal.toFixed(2)} €</span>
                        </div>
                        <div className="flex justify-between pt-2 border-t border-gray-200">
                          <span className="text-gray-600 font-medium">Gain Net :</span>
                          <span className={`text-lg font-bold ${gainNet >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {gainNet >= 0 ? '+' : ''}{gainNet.toFixed(2)} €
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 font-medium">ROI :</span>
                          <span className={`text-lg font-bold ${roi >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {roi >= 0 ? '+' : ''}{roi.toFixed(2)}%
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Evolution Mensuelle par Bookmaker */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Évolution Mensuelle par Bookmaker</h2>
            
            {/* VERSION DESKTOP - Tableau */}
            <div className="hidden lg:block bg-white rounded-lg shadow overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-indigo-50 border-b">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">Mois</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">Bookmaker</th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-600 uppercase">Total</th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-600 uppercase">Gagnés</th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-600 uppercase">Perdus</th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-600 uppercase">Remboursés</th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-600 uppercase">Taux</th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-600 uppercase">Mise</th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-600 uppercase">Gain Net</th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-600 uppercase">ROI</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {monthlyBookmakerStats.length === 0 ? (
                      <tr>
                        <td colSpan="10" className="px-4 py-8 text-center text-gray-500">
                          Aucune donnée disponible
                        </td>
                      </tr>
                    ) : (
                      monthlyBookmakerStats.map(stat => {
                        const gainNet = stat.gainsTotal - stat.miseTotal;
                        const roi = stat.miseTotal > 0 ? ((gainNet / stat.miseTotal) * 100) : 0;
                        const taux = (stat.gagnes + stat.perdus) > 0 
                          ? ((stat.gagnes / (stat.gagnes + stat.perdus)) * 100) 
                          : 0;
                        
                        return (
                          <tr key={`${stat.month}_${stat.bookmaker}`} className="hover:bg-gray-50">
                            <td className="px-4 py-3 text-sm text-gray-900">{stat.month}</td>
                            <td className="px-4 py-3 text-sm font-medium text-gray-900">{stat.bookmaker}</td>
                            <td className="px-4 py-3 text-sm text-center text-gray-900">{stat.total}</td>
                            <td className="px-4 py-3 text-sm text-center text-green-600">{stat.gagnes}</td>
                            <td className="px-4 py-3 text-sm text-center text-red-600">{stat.perdus}</td>
                            <td className="px-4 py-3 text-sm text-center text-blue-600">{stat.rembourses}</td>
                            <td className="px-4 py-3 text-sm text-center text-gray-900">{taux.toFixed(1)}%</td>
                            <td className="px-4 py-3 text-sm text-right text-gray-900">{stat.miseTotal.toFixed(2)} €</td>
                            <td className={`px-4 py-3 text-sm text-right font-semibold ${gainNet >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {gainNet >= 0 ? '+' : ''}{gainNet.toFixed(2)} €
                            </td>
                            <td className={`px-4 py-3 text-sm text-right font-semibold ${roi >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {roi >= 0 ? '+' : ''}{roi.toFixed(2)}%
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* VERSION MOBILE - Cards */}
            <div className="lg:hidden space-y-4">
              {monthlyBookmakerStats.length === 0 ? (
                <div className="bg-white rounded-lg shadow-lg p-8 text-center text-gray-500">
                  Aucune donnée disponible
                </div>
              ) : (
                monthlyBookmakerStats.map(stat => {
                  const gainNet = stat.gainsTotal - stat.miseTotal;
                  const roi = stat.miseTotal > 0 ? ((gainNet / stat.miseTotal) * 100) : 0;
                  const taux = (stat.gagnes + stat.perdus) > 0 
                    ? ((stat.gagnes / (stat.gagnes + stat.perdus)) * 100) 
                    : 0;
                  
                  return (
                    <div key={`${stat.month}_${stat.bookmaker}`} className="bg-white rounded-lg shadow-lg p-4">
                      {/* Header */}
                      <div className="flex items-center justify-between mb-3 pb-3 border-b border-gray-200">
                        <div>
                          <div className="text-lg font-bold text-indigo-600">{stat.month}</div>
                          <div className="text-sm text-gray-600">{stat.bookmaker}</div>
                        </div>
                        <span className="text-sm text-gray-600">Total : {stat.total}</span>
                      </div>

                      {/* Stats */}
                      <div className="grid grid-cols-3 gap-2 mb-3">
                        <div className="text-center">
                          <div className="text-xs text-gray-600">Gagnés</div>
                          <div className="text-lg font-bold text-green-600">{stat.gagnes}</div>
                        </div>
                        <div className="text-center">
                          <div className="text-xs text-gray-600">Perdus</div>
                          <div className="text-lg font-bold text-red-600">{stat.perdus}</div>
                        </div>
                        <div className="text-center">
                          <div className="text-xs text-gray-600">Rembours.</div>
                          <div className="text-lg font-bold text-blue-600">{stat.rembourses}</div>
                        </div>
                      </div>

                      {/* Infos */}
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Taux de réussite :</span>
                          <span className="font-semibold text-indigo-600">{taux.toFixed(1)}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Mise totale :</span>
                          <span className="font-semibold text-gray-900">{stat.miseTotal.toFixed(2)} €</span>
                        </div>
                        <div className="flex justify-between pt-2 border-t border-gray-200">
                          <span className="text-gray-600 font-medium">Gain Net :</span>
                          <span className={`text-lg font-bold ${gainNet >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {gainNet >= 0 ? '+' : ''}{gainNet.toFixed(2)} €
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 font-medium">ROI :</span>
                          <span className={`text-lg font-bold ${roi >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {roi >= 0 ? '+' : ''}{roi.toFixed(2)}%
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

        <Footer />
        <BottomBar currentPage="stats" />
      </div>
    </>
  );
}