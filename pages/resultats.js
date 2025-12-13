import { useState, useEffect } from 'react';
import Head from 'next/head';
import { Search, X } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BottomBar from '../components/BottomBar';

export default function ResultatsPage() {
  const [pronos, setPronos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBookmaker, setFilterBookmaker] = useState('');
  const [filterStatut, setFilterStatut] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('cb'); // 'cb' ou 'date'
  const itemsPerPage = 20;

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

  const bookmakers = [...new Set(pronos.map(p => p.bookmaker))].sort();
  const statuts = ['Gagne', 'Perdu', 'Rembourse'];

  const filteredPronos = pronos.filter(prono => {
    const matchSearch = prono.cb_number.toLowerCase().includes(searchTerm.toLowerCase());
    const matchBookmaker = filterBookmaker === '' || prono.bookmaker === filterBookmaker;
    const matchStatut = filterStatut === '' || prono.statut === filterStatut;
    return matchSearch && matchBookmaker && matchStatut;
  });

  const sortedPronos = [...filteredPronos].sort((a, b) => {
    if (sortBy === 'cb') {
      return b.cb_number.localeCompare(a.cb_number); // Tri décroissant
    } else {
      const dateCompare = new Date(b.date) - new Date(a.date);
      if (dateCompare !== 0) return dateCompare;
      return b.cb_number.localeCompare(a.cb_number);
    }
  });

  const totalPages = Math.ceil(sortedPronos.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedPronos = sortedPronos.slice(startIndex, startIndex + itemsPerPage);

  const resetFilters = () => {
    setSearchTerm('');
    setFilterBookmaker('');
    setFilterStatut('');
    setSortBy('cb');
    setCurrentPage(1);
  };

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
        <title>Résultats Cotes Boostées 2026 | Historique Complet Paris Sportifs</title>
        <meta name="description" content="Consultez l'historique complet de nos cotes boostées 2026 : résultats détaillés, filtres par bookmaker et statut. Transparence totale sur toutes nos CB." />
        <meta name="keywords" content="résultats cotes boostées, historique paris sportifs, résultats bookmakers, CB 2026" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Résultats CB 2026 | Historique Complet" />
        <meta property="og:description" content="Historique complet et détaillé de toutes nos cotes boostées avec filtres." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.cotes-boostees.com/resultats" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Résultats CB 2026 | Historique" />
        <meta name="twitter:description" content="Consultez tous nos résultats en détail." />
        
        <link rel="canonical" href="https://www.cotes-boostees.com/resultats" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col pb-20 lg:pb-0">
        <Header currentPage="resultats" />

        <div className="max-w-7xl mx-auto px-4 py-8 flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">Résultats CB 2026</h1>

          {/* Filtres */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Rechercher par N° CB..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>
              <select
                value={filterBookmaker}
                onChange={(e) => {
                  setFilterBookmaker(e.target.value);
                  setCurrentPage(1);
                }}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              >
                <option value="">Tous les bookmakers</option>
                {bookmakers.map(bk => (
                  <option key={bk} value={bk}>{bk}</option>
                ))}
              </select>
              <select
                value={filterStatut}
                onChange={(e) => {
                  setFilterStatut(e.target.value);
                  setCurrentPage(1);
                }}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              >
                <option value="">Tous les résultats</option>
                {statuts.map(st => (
                  <option key={st} value={st}>{st}</option>
                ))}
              </select>
              <select
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value);
                  setCurrentPage(1);
                }}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              >
                <option value="cb">Tri par N° CB</option>
                <option value="date">Tri par Date</option>
              </select>
              <button
                onClick={resetFilters}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition flex items-center justify-center gap-2"
              >
                <X className="w-4 h-4" />
                Réinitialiser
              </button>
            </div>
          </div>

          {/* VERSION DESKTOP - Tableau (inchangé) */}
          <div className="hidden lg:block bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-indigo-50 border-b">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">N° CB</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">Date</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">Bookmaker</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-600 uppercase">Mise</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-600 uppercase">Cote</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-600 uppercase">Résultat</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-600 uppercase">Gain</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {paginatedPronos.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="px-4 py-8 text-center text-gray-500">
                        Aucun résultat ne correspond à vos critères.
                      </td>
                    </tr>
                  ) : (
                    paginatedPronos.map(prono => {
                      let gain = 0;
                      let gainDisplay = '';
                      
                      if (prono.statut === 'Gagne') {
                        gain = (parseFloat(prono.mise) * parseFloat(prono.cote)) - parseFloat(prono.mise);
                        gainDisplay = `+${gain.toFixed(2)} €`;
                      } else if (prono.statut === 'Perdu') {
                        gain = -parseFloat(prono.mise);
                        gainDisplay = `${gain.toFixed(2)} €`;
                      } else if (prono.statut === 'Rembourse') {
                        gain = 0;
                        gainDisplay = '0.00 €';
                      }

                      return (
                        <tr key={prono.id} className="hover:bg-gray-50">
                          <td className="px-4 py-3 text-sm font-semibold text-indigo-600">{prono.cb_number}</td>
                          <td className="px-4 py-3 text-sm text-gray-900">
                            {new Date(prono.date).toLocaleDateString('fr-FR')}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-600">{prono.bookmaker}</td>
                          <td className="px-4 py-3 text-sm text-gray-900 text-right">{parseFloat(prono.mise).toFixed(2)} €</td>
                          <td className="px-4 py-3 text-sm text-gray-900 text-right">{parseFloat(prono.cote).toFixed(2)}</td>
                          <td className="px-4 py-3 text-center">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              prono.statut === 'Gagne' ? 'bg-green-100 text-green-800' :
                              prono.statut === 'Perdu' ? 'bg-red-100 text-red-800' :
                              'bg-blue-100 text-blue-800'
                            }`}>
                              {prono.statut}
                            </span>
                          </td>
                          <td className={`px-4 py-3 text-sm text-right font-semibold ${
                            gain > 0 ? 'text-green-600' :
                            gain < 0 ? 'text-red-600' :
                            'text-gray-600'
                          }`}>
                            {gainDisplay}
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Desktop */}
            {totalPages > 1 && (
              <div className="bg-gray-50 px-4 py-3 flex items-center justify-between border-t">
                <div className="text-sm text-gray-700">
                  Affichage de {startIndex + 1} à {Math.min(startIndex + itemsPerPage, sortedPronos.length)} sur {sortedPronos.length} résultats
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1 bg-white border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Précédent
                  </button>
                  <div className="flex items-center gap-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-3 py-1 rounded ${
                          currentPage === page
                            ? 'bg-indigo-600 text-white'
                            : 'bg-white border border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 bg-white border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Suivant
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* VERSION MOBILE - Cards */}
          <div className="lg:hidden space-y-4">
            {paginatedPronos.length === 0 ? (
              <div className="bg-white rounded-lg shadow-lg p-8 text-center text-gray-500">
                Aucun résultat ne correspond à vos critères.
              </div>
            ) : (
              paginatedPronos.map(prono => {
                let gain = 0;
                let gainDisplay = '';
                
                if (prono.statut === 'Gagne') {
                  gain = (parseFloat(prono.mise) * parseFloat(prono.cote)) - parseFloat(prono.mise);
                  gainDisplay = `+${gain.toFixed(2)} €`;
                } else if (prono.statut === 'Perdu') {
                  gain = -parseFloat(prono.mise);
                  gainDisplay = `${gain.toFixed(2)} €`;
                } else if (prono.statut === 'Rembourse') {
                  gain = 0;
                  gainDisplay = '0.00 €';
                }

                return (
                  <div key={prono.id} className="bg-white rounded-lg shadow-lg p-4">
                    {/* Header de la carte */}
                    <div className="flex items-center justify-between mb-3 pb-3 border-b border-gray-200">
                      <span className="text-lg font-bold text-indigo-600">{prono.cb_number}</span>
                      <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                        prono.statut === 'Gagne' ? 'bg-green-100 text-green-800' :
                        prono.statut === 'Perdu' ? 'bg-red-100 text-red-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {prono.statut}
                      </span>
                    </div>

                    {/* Contenu de la carte */}
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Date :</span>
                        <span className="font-semibold text-gray-900">
                          {new Date(prono.date).toLocaleDateString('fr-FR')}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Bookmaker :</span>
                        <span className="font-semibold text-gray-900">{prono.bookmaker}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Mise :</span>
                        <span className="font-semibold text-gray-900">{parseFloat(prono.mise).toFixed(2)} €</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Cote :</span>
                        <span className="font-semibold text-gray-900">{parseFloat(prono.cote).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                        <span className="text-gray-600 font-medium">Gain :</span>
                        <span className={`text-lg font-bold ${
                          gain > 0 ? 'text-green-600' :
                          gain < 0 ? 'text-red-600' :
                          'text-gray-600'
                        }`}>
                          {gainDisplay}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}

            {/* Pagination Mobile */}
            {totalPages > 1 && (
              <div className="bg-white rounded-lg shadow-lg p-4">
                <div className="text-sm text-gray-700 text-center mb-3">
                  Page {currentPage} sur {totalPages}
                </div>
                <div className="flex gap-2 justify-center">
                  <button
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    ← Préc.
                  </button>
                  <button
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Suiv. →
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <Footer />
        <BottomBar currentPage="resultats" />
      </div>
    </>
  );
}