import { useState, useEffect } from 'react';
import { Home, BarChart3, Lock, TrendingUp, LogOut } from 'lucide-react';
import { useRouter } from 'next/router';

export default function StatsPage() {
  const [pronos, setPronos] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    checkAuth();
    loadPronos();
  }, []);

  const checkAuth = async () => {
    try {
      const res = await fetch('/api/auth');
      const data = await res.json();
      setIsAuthenticated(data.authenticated);
    } catch (error) {
      console.error('Erreur auth:', error);
    }
  };

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

  const handleLogout = async () => {
    try {
      await fetch('/api/auth', { method: 'DELETE' });
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Erreur logout:', error);
    }
  };

  const calculateStats = () => {
    const stats = {
      total: pronos.length,
      enCours: 0,
      gagnes: 0,
      perdus: 0,
      rembourses: 0,
      miseTotal: 0,
      gainTotal: 0,
      gainNet: 0,
      roi: 0,
      tauxReussite: 0
    };

    pronos.forEach(p => {
      stats.miseTotal += parseFloat(p.mise);
      
      if (p.statut === 'En cours') stats.enCours++;
      else if (p.statut === 'Gagné') {
        stats.gagnes++;
        stats.gainTotal += parseFloat(p.mise) * parseFloat(p.cote);
      } else if (p.statut === 'Perdu') {
        stats.perdus++;
      } else if (p.statut === 'Remboursé') {
        stats.rembourses++;
        stats.gainTotal += parseFloat(p.mise);
      }
    });

    stats.gainNet = stats.gainTotal - stats.miseTotal;
    stats.roi = stats.miseTotal > 0 ? ((stats.gainNet / stats.miseTotal) * 100).toFixed(2) : 0;
    const termines = stats.gagnes + stats.perdus;
    stats.tauxReussite = termines > 0 ? ((stats.gagnes / termines) * 100).toFixed(1) : 0;

    return stats;
  };

  const getStatsByMonth = () => {
    const byMonth = {};
    
    pronos.forEach(p => {
      const date = new Date(p.date);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      
      if (!byMonth[monthKey]) {
        byMonth[monthKey] = {
          miseTotal: 0,
          gainTotal: 0,
          gagnes: 0,
          perdus: 0
        };
      }
      
      const month = byMonth[monthKey];
      month.miseTotal += parseFloat(p.mise);
      
      if (p.statut === 'Gagné') {
        month.gagnes++;
        month.gainTotal += parseFloat(p.mise) * parseFloat(p.cote);
      } else if (p.statut === 'Perdu') {
        month.perdus++;
      } else if (p.statut === 'Remboursé') {
        month.gainTotal += parseFloat(p.mise);
      }
    });

    Object.keys(byMonth).forEach(key => {
      const month = byMonth[key];
      month.gainNet = month.gainTotal - month.miseTotal;
    });

    return byMonth;
  };

  const getStatsByBookmaker = () => {
    const byBookmaker = {};
    
    pronos.forEach(p => {
      if (!byBookmaker[p.bookmaker]) {
        byBookmaker[p.bookmaker] = {
          total: 0,
          gagnes: 0,
          perdus: 0,
          miseTotal: 0,
          gainTotal: 0
        };
      }
      
      const bk = byBookmaker[p.bookmaker];
      bk.total++;
      bk.miseTotal += parseFloat(p.mise);
      
      if (p.statut === 'Gagné') {
        bk.gagnes++;
        bk.gainTotal += parseFloat(p.mise) * parseFloat(p.cote);
      } else if (p.statut === 'Perdu') {
        bk.perdus++;
      } else if (p.statut === 'Remboursé') {
        bk.gainTotal += parseFloat(p.mise);
      }
    });

    Object.keys(byBookmaker).forEach(key => {
      const bk = byBookmaker[key];
      bk.gainNet = bk.gainTotal - bk.miseTotal;
      bk.roi = bk.miseTotal > 0 ? ((bk.gainNet / bk.miseTotal) * 100).toFixed(2) : 0;
    });

    return byBookmaker;
  };

  const getStatsByMonthAndBookmaker = () => {
    const byMonthBk = {};
    
    pronos.forEach(p => {
      const date = new Date(p.date);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      const key = `${monthKey}|${p.bookmaker}`;
      
      if (!byMonthBk[key]) {
        byMonthBk[key] = {
          month: monthKey,
          bookmaker: p.bookmaker,
          miseTotal: 0,
          gainTotal: 0,
          gagnes: 0,
          perdus: 0
        };
      }
      
      const stat = byMonthBk[key];
      stat.miseTotal += parseFloat(p.mise);
      
      if (p.statut === 'Gagné') {
        stat.gagnes++;
        stat.gainTotal += parseFloat(p.mise) * parseFloat(p.cote);
      } else if (p.statut === 'Perdu') {
        stat.perdus++;
      } else if (p.statut === 'Remboursé') {
        stat.gainTotal += parseFloat(p.mise);
      }
    });

    Object.keys(byMonthBk).forEach(key => {
      const stat = byMonthBk[key];
      stat.gainNet = stat.gainTotal - stat.miseTotal;
    });

    return Object.values(byMonthBk).sort((a, b) => b.month.localeCompare(a.month));
  };

  const stats = calculateStats();
  const statsByMonth = getStatsByMonth();
  const statsByBookmaker = getStatsByBookmaker();
  const statsByMonthBk = getStatsByMonthAndBookmaker();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-xl text-gray-600">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-md border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-indigo-600">Cotes-Boostées.com</h1>
            <p className="text-sm text-gray-600">Suivi intelligent de vos pronos</p>
          </div>
          {isAuthenticated && (
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
            >
              <LogOut className="w-4 h-4" />
              Déconnexion
            </button>
          )}
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex space-x-8">
            <button
              onClick={() => router.push('/')}
              className="py-4 px-2 border-b-2 border-transparent text-gray-500 hover:text-gray-700 font-medium text-sm flex items-center gap-2"
            >
              <Home className="w-4 h-4" />
              Accueil
            </button>
            <button
              onClick={() => router.push('/resultats')}
              className="py-4 px-2 border-b-2 border-transparent text-gray-500 hover:text-gray-700 font-medium text-sm flex items-center gap-2"
            >
              <BarChart3 className="w-4 h-4" />
              Résultats
            </button>
            <button
              onClick={() => router.push('/stats')}
              className="py-4 px-2 border-b-2 border-indigo-500 text-indigo-600 font-medium text-sm flex items-center gap-2"
            >
              <BarChart3 className="w-4 h-4" />
              Statistiques
            </button>
            {isAuthenticated && (
              <button
                onClick={() => router.push('/admin')}
                className="py-4 px-2 border-b-2 border-transparent text-gray-500 hover:text-gray-700 font-medium text-sm flex items-center gap-2"
              >
                <Lock className="w-4 h-4" />
                Gestion
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Contenu */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="space-y-6">
          {/* Bilan Global */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-indigo-600" />
              Bilan Global
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="text-sm text-gray-600">Total pronos</div>
                <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
              </div>
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="text-sm text-gray-600">Gagnés</div>
                <div className="text-2xl font-bold text-green-600">{stats.gagnes}</div>
              </div>
              <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                <div className="text-sm text-gray-600">Perdus</div>
                <div className="text-2xl font-bold text-red-600">{stats.perdus}</div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="text-sm text-gray-600">Taux de réussite</div>
                <div className="text-2xl font-bold text-gray-900">{stats.tauxReussite}%</div>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                <div className="text-sm text-gray-600">Mise totale</div>
                <div className="text-2xl font-bold text-gray-900">{stats.miseTotal.toFixed(2)}€</div>
              </div>
              <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <div className="text-sm text-gray-600">Gains totaux</div>
                <div className="text-2xl font-bold text-gray-900">{stats.gainTotal.toFixed(2)}€</div>
              </div>
              <div className={`p-4 rounded-lg border ${stats.gainNet >= 0 ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                <div className="text-sm text-gray-600">Gain net</div>
                <div className={`text-2xl font-bold ${stats.gainNet >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {stats.gainNet >= 0 ? '+' : ''}{stats.gainNet.toFixed(2)}€
                </div>
              </div>
              <div className={`p-4 rounded-lg border ${stats.roi >= 0 ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                <div className="text-sm text-gray-600">ROI</div>
                <div className={`text-2xl font-bold ${stats.roi >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {stats.roi >= 0 ? '+' : ''}{stats.roi}%
                </div>
              </div>
            </div>
          </div>

          {/* Évolution Mensuelle Globale */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Évolution Mensuelle</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Mois</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">G/P</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Mise</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Gains</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Net</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {Object.keys(statsByMonth).length === 0 ? (
                    <tr>
                      <td colSpan="5" className="px-4 py-8 text-center text-gray-500">
                        Aucune statistique disponible
                      </td>
                    </tr>
                  ) : (
                    Object.entries(statsByMonth)
                      .sort((a, b) => b[0].localeCompare(a[0]))
                      .map(([month, data]) => (
                        <tr key={month}>
                          <td className="px-4 py-3 text-sm font-medium text-gray-900">
                            {new Date(month + '-01').toLocaleDateString('fr-FR', { year: 'numeric', month: 'long' })}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900 text-center">
                            <span className="text-green-600">{data.gagnes}</span> / <span className="text-red-600">{data.perdus}</span>
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900 text-right">{data.miseTotal.toFixed(2)}€</td>
                          <td className="px-4 py-3 text-sm text-gray-900 text-right">{data.gainTotal.toFixed(2)}€</td>
                          <td className={`px-4 py-3 text-sm font-medium text-right ${data.gainNet >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {data.gainNet >= 0 ? '+' : ''}{data.gainNet.toFixed(2)}€
                          </td>
                        </tr>
                      ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Bilan par Bookmaker */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Bilan par Bookmaker</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Bookmaker</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Pronos</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">G/P</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Mise</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Gains</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Net</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">ROI</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {Object.keys(statsByBookmaker).length === 0 ? (
                    <tr>
                      <td colSpan="7" className="px-4 py-8 text-center text-gray-500">
                        Aucune statistique disponible
                      </td>
                    </tr>
                  ) : (
                    Object.entries(statsByBookmaker).map(([bookmaker, data]) => (
                      <tr key={bookmaker}>
                        <td className="px-4 py-3 text-sm font-medium text-gray-900">{bookmaker}</td>
                        <td className="px-4 py-3 text-sm text-gray-900 text-center">{data.total}</td>
                        <td className="px-4 py-3 text-sm text-gray-900 text-center">
                          <span className="text-green-600">{data.gagnes}</span> / <span className="text-red-600">{data.perdus}</span>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900 text-right">{data.miseTotal.toFixed(2)}€</td>
                        <td className="px-4 py-3 text-sm text-gray-900 text-right">{data.gainTotal.toFixed(2)}€</td>
                        <td className={`px-4 py-3 text-sm font-medium text-right ${data.gainNet >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {data.gainNet >= 0 ? '+' : ''}{data.gainNet.toFixed(2)}€
                        </td>
                        <td className={`px-4 py-3 text-sm font-medium text-right ${data.roi >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {data.roi >= 0 ? '+' : ''}{data.roi}%
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Évolution Mensuelle par Bookmaker */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Évolution Mensuelle par Bookmaker</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Mois</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Bookmaker</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">G/P</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Mise</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Gains</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Net</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {statsByMonthBk.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="px-4 py-8 text-center text-gray-500">
                        Aucune statistique disponible
                      </td>
                    </tr>
                  ) : (
                    statsByMonthBk.map((stat, idx) => (
                      <tr key={idx}>
                        <td className="px-4 py-3 text-sm font-medium text-gray-900">
                          {new Date(stat.month + '-01').toLocaleDateString('fr-FR', { year: 'numeric', month: 'long' })}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900">{stat.bookmaker}</td>
                        <td className="px-4 py-3 text-sm text-gray-900 text-center">
                          <span className="text-green-600">{stat.gagnes}</span> / <span className="text-red-600">{stat.perdus}</span>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900 text-right">{stat.miseTotal.toFixed(2)}€</td>
                        <td className="px-4 py-3 text-sm text-gray-900 text-right">{stat.gainTotal.toFixed(2)}€</td>
                        <td className={`px-4 py-3 text-sm font-medium text-right ${stat.gainNet >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {stat.gainNet >= 0 ? '+' : ''}{stat.gainNet.toFixed(2)}€
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}