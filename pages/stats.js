import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

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

  // Calculs globaux
  const totalPronos = pronos.length;
  const pronosGagnes = pronos.filter(p => p.statut === 'Gagne').length;
  const pronosPerdus = pronos.filter(p => p.statut === 'Perdu').length;
  const pronosRembourses = pronos.filter(p => p.statut === 'Rembourse').length;
  
  const miseTotal = pronos.reduce((sum, p) => sum + parseFloat(p.mise), 0);
  
  const gainsTotal = pronos.reduce((sum, p) => {
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

  // Evolution mensuelle
  const pronosByMonth = pronos.reduce((acc, p) => {
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

  // Bilan par bookmaker
  const pronosByBookmaker = pronos.reduce((acc, p) => {
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

  const bookmakerStats = Object.values(pronosByBookmaker).sort((a, b) => b.total - a.total);

  // Evolution mensuelle par bookmaker
  const monthlyByBookmaker = pronos.reduce((acc, p) => {
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

  const monthlyBookmakerStats = Object.values(monthlyByBookmaker)
    .sort((a, b) => {
      const dateCompare = b.month.localeCompare(a.month);
      if (dateCompare !== 0) return dateCompare;
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
      <Header currentPage="stats" />

      <div className="max-w-7xl mx-auto px-4 py-8 flex-1">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Statistiques CB 2026</h2>

        {/* Bilan Global */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Bilan Global</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg shadow p-4">
              <div className="text-sm text-gray-600 mb-1 text-center">Total CB</div>
              <div className="text-2xl font-bold text-indigo-600 text-center">{totalPronos}</div>
            </div>
            <div className="bg-white rounded-lg shadow p-4">
              <div className="text-sm text-gray-600 mb-1 text-center">Gagnés</div>
              <div className="text-2xl font-bold text-green-600 text-center">{pronosGagnes}</div>
            </div>
            <div className="bg-white rounded-lg shadow p-4">
              <div className="text-sm text-gray-600 mb-1 text-center">Perdus</div>
              <div className="text-2xl font-bold text-red-600 text-center">{pronosPerdus}</div>
            </div>
            <div className="bg-white rounded-lg shadow p-4">
              <div className="text-sm text-gray-600 mb-1 text-center">Remboursés</div>
              <div className="text-2xl font-bold text-blue-600 text-center">{pronosRembourses}</div>
            </div>
            <div className="bg-white rounded-lg shadow p-4">
              <div className="text-sm text-gray-600 mb-1 text-center">Taux de Réussite</div>
              <div className="text-2xl font-bold text-indigo-600 text-center">{tauxReussite.toFixed(2)}%</div>
            </div>
            <div className="bg-white rounded-lg shadow p-4">
              <div className="text-sm text-gray-600 mb-1 text-center">Mise Totale</div>
              <div className="text-2xl font-bold text-gray-900 text-center">{miseTotal.toFixed(2)} €</div>
            </div>
            <div className="bg-white rounded-lg shadow p-4">
              <div className="text-sm text-gray-600 mb-1 text-center">Gain Net</div>
              <div className={`text-2xl font-bold text-center ${gainNet >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {gainNet >= 0 ? '+' : ''}{gainNet.toFixed(2)} €
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-4">
              <div className="text-sm text-gray-600 mb-1 text-center">ROI</div>
              <div className={`text-2xl font-bold text-center ${roi >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {roi >= 0 ? '+' : ''}{roi.toFixed(2)}%
              </div>
            </div>
          </div>
        </div>

        {/* Evolution Mensuelle */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Évolution Mensuelle</h3>
          <div className="bg-white rounded-lg shadow overflow-hidden">
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
        </div>

        {/* Bilan par Bookmaker */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Bilan par Bookmaker</h3>
          <div className="bg-white rounded-lg shadow overflow-hidden">
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
        </div>

        {/* Evolution Mensuelle par Bookmaker */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Évolution Mensuelle par Bookmaker</h3>
          <div className="bg-white rounded-lg shadow overflow-hidden">
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
        </div>
      </div>

      <Footer />
    </div>
  );
}