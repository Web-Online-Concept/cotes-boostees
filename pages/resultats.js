import { useState, useEffect } from 'react';
import { Search, Filter } from 'lucide-react';
import Header from '../components/Header';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

export default function ResultatsPage() {
  const [pronos, setPronos] = useState([]);
  const [filteredPronos, setFilteredPronos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBookmaker, setFilterBookmaker] = useState('');
  const [filterStatut, setFilterStatut] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20);

  useEffect(() => {
    loadPronos();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [pronos, searchTerm, filterBookmaker, filterStatut]);

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

  const applyFilters = () => {
    let filtered = [...pronos];

    if (searchTerm) {
      filtered = filtered.filter(p => 
        p.cb_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.event.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.bookmaker.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterBookmaker) {
      filtered = filtered.filter(p => p.bookmaker === filterBookmaker);
    }

    if (filterStatut) {
      filtered = filtered.filter(p => p.statut === filterStatut);
    }

    setFilteredPronos(filtered);
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setSearchTerm('');
    setFilterBookmaker('');
    setFilterStatut('');
  };

  const bookmakers = [...new Set(pronos.map(p => p.bookmaker))].sort();

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPronos = filteredPronos.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredPronos.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-xl text-gray-600">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
      <Header />
      <Navigation currentPage="resultats" />

      <div className="max-w-7xl mx-auto px-4 py-8 flex-1">
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Résultats des Cotes Boostées</h2>
          <p className="text-gray-600">Tous nos pronos en temps réel - {filteredPronos.length} résultat(s)</p>
        </div>

        {/* Filtres et Recherche */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-indigo-600" />
            <h3 className="text-lg font-semibold text-gray-900">Filtres</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <Search className="w-4 h-4 inline mr-1" />
                Rechercher
              </label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="N° CB, événement, bookmaker..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Bookmaker</label>
              <select
                value={filterBookmaker}
                onChange={(e) => setFilterBookmaker(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              >
                <option value="">Tous</option>
                {bookmakers.map(bk => (
                  <option key={bk} value={bk}>{bk}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Statut</label>
              <select
                value={filterStatut}
                onChange={(e) => setFilterStatut(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              >
                <option value="">Tous</option>
                <option value="En cours">En cours</option>
                <option value="Gagné">Gagné</option>
                <option value="Perdu">Perdu</option>
                <option value="Remboursé">Remboursé</option>
              </select>
            </div>
          </div>

          {(searchTerm || filterBookmaker || filterStatut) && (
            <button
              onClick={resetFilters}
              className="mt-4 text-sm text-indigo-600 hover:text-indigo-800 font-medium"
            >
              Réinitialiser les filtres
            </button>
          )}
        </div>

        {/* Tableau des résultats */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-indigo-50 border-b-2 border-indigo-200">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-bold text-indigo-900 uppercase">N° CB</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-indigo-900 uppercase">Date</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-indigo-900 uppercase">Événement</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-indigo-900 uppercase">Bookmaker</th>
                  <th className="px-4 py-3 text-right text-xs font-bold text-indigo-900 uppercase">Mise</th>
                  <th className="px-4 py-3 text-right text-xs font-bold text-indigo-900 uppercase">Cote</th>
                  <th className="px-4 py-3 text-center text-xs font-bold text-indigo-900 uppercase">Statut</th>
                  <th className="px-4 py-3 text-right text-xs font-bold text-indigo-900 uppercase">Gain Potentiel</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {currentPronos.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="px-4 py-12 text-center text-gray-500">
                      {pronos.length === 0 
                        ? "Aucun prono enregistré pour le moment. Revenez bientôt !"
                        : "Aucun résultat ne correspond à vos filtres."
                      }
                    </td>
                  </tr>
                ) : (
                  currentPronos
                    .sort((a, b) => new Date(b.date) - new Date(a.date))
                    .map(prono => (
                      <tr key={prono.id} className="hover:bg-indigo-50 transition">
                        <td className="px-4 py-3 text-sm font-bold text-indigo-600">{prono.cb_number}</td>
                        <td className="px-4 py-3 text-sm text-gray-900">
                          {new Date(prono.date).toLocaleDateString('fr-FR')}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900 font-medium">{prono.event}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{prono.bookmaker}</td>
                        <td className="px-4 py-3 text-sm text-gray-900 text-right font-semibold">
                          {parseFloat(prono.mise).toFixed(2)}€
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900 text-right font-bold text-indigo-600">
                          {parseFloat(prono.cote).toFixed(2)}
                        </td>
                        <td className="px-4 py-3 text-center">
                          <span className={`inline-flex px-3 py-1 text-xs font-bold rounded-full ${
                            prono.statut === 'Gagné' ? 'bg-green-100 text-green-800' :
                            prono.statut === 'Perdu' ? 'bg-red-100 text-red-800' :
                            prono.statut === 'Remboursé' ? 'bg-blue-100 text-blue-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {prono.statut}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-right font-bold">
                          {prono.statut === 'Gagné' ? (
                            <span className="text-green-600">
                              +{(parseFloat(prono.mise) * parseFloat(prono.cote) - parseFloat(prono.mise)).toFixed(2)}€
                            </span>
                          ) : prono.statut === 'Perdu' ? (
                            <span className="text-red-600">
                              -{parseFloat(prono.mise).toFixed(2)}€
                            </span>
                          ) : prono.statut === 'Remboursé' ? (
                            <span className="text-blue-600">0.00€</span>
                          ) : (
                            <span className="text-gray-600">
                              {(parseFloat(prono.mise) * parseFloat(prono.cote) - parseFloat(prono.mise)).toFixed(2)}€
                            </span>
                          )}
                        </td>
                      </tr>
                    ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="bg-gray-50 px-4 py-3 flex items-center justify-between border-t border-gray-200">
              <div className="text-sm text-gray-700">
                Affichage de <span className="font-medium">{indexOfFirstItem + 1}</span> à{' '}
                <span className="font-medium">
                  {Math.min(indexOfLastItem, filteredPronos.length)}
                </span>{' '}
                sur <span className="font-medium">{filteredPronos.length}</span> résultats
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-3 py-1 rounded-lg text-sm font-medium ${
                    currentPage === 1
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-indigo-600 text-white hover:bg-indigo-700'
                  }`}
                >
                  Précédent
                </button>
                
                <div className="flex gap-1">
                  {[...Array(totalPages)].map((_, index) => (
                    <button
                      key={index + 1}
                      onClick={() => paginate(index + 1)}
                      className={`px-3 py-1 rounded-lg text-sm font-medium ${
                        currentPage === index + 1
                          ? 'bg-indigo-600 text-white'
                          : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`px-3 py-1 rounded-lg text-sm font-medium ${
                    currentPage === totalPages
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-indigo-600 text-white hover:bg-indigo-700'
                  }`}
                >
                  Suivant
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}