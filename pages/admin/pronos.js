import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, LogOut } from 'lucide-react';
import { useRouter } from 'next/router';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import BottomBar from '../../components/BottomBar';

export default function AdminPage() {
  const [pronos, setPronos] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    cb_number: '',
    date: new Date().toISOString().split('T')[0],
    bookmaker: 'Winamax',
    event: '-',
    mise: '',
    cote: '',
    statut: 'Gagne'
  });
  const router = useRouter();

  const bookmakers = [
    'Winamax',
    'Betclic',
    'Parions Sport',
    'Unibet',
    'PMU',
    'Betsson',
    'Bwin',
    'Genybet',
    'Netbet',
    'Vbet',
    'Olybet',
    'DAZNBet'
  ];

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const res = await fetch('/api/auth');
      const data = await res.json();
      
      if (!data.authenticated) {
        router.push('/');
        return;
      }
      
      setIsAuthenticated(true);
      await loadPronos();
    } catch (error) {
      console.error('Erreur auth:', error);
      router.push('/');
    }
    setLoading(false);
  };

  const loadPronos = async () => {
    try {
      const res = await fetch('/api/pronos');
      const data = await res.json();
      setPronos(data);
    } catch (error) {
      console.error('Erreur chargement pronos:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth', { method: 'DELETE' });
      router.push('/');
    } catch (error) {
      console.error('Erreur deconnexion:', error);
    }
  };

  const handleSubmit = async () => {
    if (!formData.cb_number || !formData.date || !formData.bookmaker || !formData.mise || !formData.cote) {
      alert('Veuillez remplir tous les champs');
      return;
    }

    try {
      console.log('Envoi des donnees:', formData);
      
      if (editingId) {
        const res = await fetch('/api/pronos', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editingId, ...formData })
        });

        const data = await res.json();
        console.log('Reponse serveur:', data);
        
        if (res.ok) {
          await loadPronos();
          resetForm();
          alert('Prono modifie avec succes');
        } else {
          console.error('Erreur complete:', data);
          alert(`Erreur: ${data.message || JSON.stringify(data)}`);
        }
      } else {
        const res = await fetch('/api/pronos', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });

        const data = await res.json();
        console.log('Reponse serveur:', data);
        
        if (res.ok) {
          await loadPronos();
          resetForm();
          alert('Prono ajoute avec succes');
        } else {
          console.error('Erreur complete:', data);
          alert(`Erreur: ${data.message || JSON.stringify(data)}`);
        }
      }
    } catch (error) {
      console.error('Erreur catch:', error);
      alert(`Erreur lors de l'enregistrement: ${error.message}`);
    }
  };

  const handleEdit = (prono) => {
    setFormData({
      cb_number: prono.cb_number,
      date: prono.date,
      bookmaker: prono.bookmaker,
      event: prono.event || '-',
      mise: prono.mise,
      cote: prono.cote,
      statut: prono.statut
    });
    setEditingId(prono.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Supprimer ce prono ?')) return;

    try {
      const res = await fetch('/api/pronos', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });

      if (res.ok) {
        await loadPronos();
        alert('Prono supprime');
      } else {
        alert('Erreur lors de la suppression');
      }
    } catch (error) {
      console.error('Erreur:', error);
      alert('Erreur lors de la suppression');
    }
  };

  const resetForm = () => {
    setFormData({
      cb_number: '',
      date: new Date().toISOString().split('T')[0],
      bookmaker: 'Winamax',
      event: '-',
      mise: '',
      cote: '',
      statut: 'Gagne'
    });
    setEditingId(null);
    setShowForm(false);
  };

  const toggleForm = () => {
    if (showForm) {
      resetForm();
    } else {
      setShowForm(true);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-xl text-gray-600">Chargement...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col pb-20 lg:pb-0">
      <Header currentPage="admin" />

      <div className="max-w-7xl mx-auto px-4 py-8 flex-1">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">Gestion des Pronos</h2>
          <div className="flex flex-col sm:flex-row justify-center gap-2">
            <button
              onClick={toggleForm}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center justify-center gap-2 transition"
            >
              <Plus className="w-4 h-4" />
              Ajouter un prono
            </button>
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher par N° CB..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 flex items-center justify-center gap-2 transition"
            >
              <LogOut className="w-4 h-4" />
              Déconnexion
            </button>
          </div>
        </div>

        {/* Formulaire */}
        {showForm && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h3 className="text-lg font-semibold mb-4">
              {editingId ? 'Modifier le prono' : 'Nouveau prono'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Numéro CB</label>
                <input
                  type="text"
                  value={formData.cb_number}
                  onChange={(e) => setFormData({...formData, cb_number: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Bookmaker</label>
                <select
                  value={formData.bookmaker}
                  onChange={(e) => setFormData({...formData, bookmaker: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                >
                  {bookmakers.map(bk => (
                    <option key={bk} value={bk}>{bk}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mise</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.mise}
                  onChange={(e) => setFormData({...formData, mise: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cote</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.cote}
                  onChange={(e) => setFormData({...formData, cote: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Résultat</label>
                <select
                  value={formData.statut}
                  onChange={(e) => setFormData({...formData, statut: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                >
                  <option>Gagne</option>
                  <option>Perdu</option>
                  <option>Rembourse</option>
                  <option>En Attente</option>
                </select>
              </div>
              <div className="col-span-1 md:col-span-2 lg:col-span-3 flex flex-col sm:flex-row gap-2">
                <button
                  onClick={handleSubmit}
                  className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
                >
                  {editingId ? 'Modifier' : 'Ajouter'}
                </button>
                <button
                  onClick={resetForm}
                  className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition"
                >
                  Annuler
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Liste des pronos */}
        
        {/* VERSION DESKTOP - Tableau */}
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
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-600 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {pronos.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="px-4 py-8 text-center text-gray-500">
                      Aucun prono enregistré. Cliquez sur "Ajouter un prono" pour commencer.
                    </td>
                  </tr>
                ) : (
                  pronos
                    .filter(p => p.cb_number.toLowerCase().includes(searchTerm.toLowerCase()))
                    .sort((a, b) => b.cb_number.localeCompare(a.cb_number)) // Toujours décroissant
                    .map(prono => (
                    <tr key={prono.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm font-semibold text-indigo-600">{prono.cb_number}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {new Date(prono.date).toLocaleDateString('fr-FR')}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">{prono.bookmaker}</td>
                      <td className="px-4 py-3 text-sm text-gray-900 text-right">{parseFloat(prono.mise).toFixed(2)}</td>
                      <td className="px-4 py-3 text-sm text-gray-900 text-right">{parseFloat(prono.cote).toFixed(2)}</td>
                      <td className="px-4 py-3 text-center">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          prono.statut === 'Gagne' ? 'bg-green-100 text-green-800' :
                          prono.statut === 'Perdu' ? 'bg-red-100 text-red-800' :
                          prono.statut === 'Rembourse' ? 'bg-blue-100 text-blue-800' :
                          'bg-orange-100 text-orange-800'
                        }`}>
                          {prono.statut}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button
                          onClick={() => handleEdit(prono)}
                          className="text-indigo-600 hover:text-indigo-800 mr-3"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(prono.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* VERSION MOBILE - Cards */}
        <div className="lg:hidden space-y-4">
          {pronos.length === 0 ? (
            <div className="bg-white rounded-lg shadow-lg p-8 text-center text-gray-500">
              Aucun prono enregistré. Cliquez sur "Ajouter un prono" pour commencer.
            </div>
          ) : (
            pronos
              .filter(p => p.cb_number.toLowerCase().includes(searchTerm.toLowerCase()))
              .sort((a, b) => b.cb_number.localeCompare(a.cb_number)) // Toujours décroissant
              .map(prono => (
              <div key={prono.id} className="bg-white rounded-lg shadow-lg p-4">
                {/* Header */}
                <div className="flex items-center justify-between mb-3 pb-3 border-b border-gray-200">
                  <span className="text-lg font-bold text-indigo-600">{prono.cb_number}</span>
                  <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                    prono.statut === 'Gagne' ? 'bg-green-100 text-green-800' :
                    prono.statut === 'Perdu' ? 'bg-red-100 text-red-800' :
                    prono.statut === 'Rembourse' ? 'bg-blue-100 text-blue-800' :
                    'bg-orange-100 text-orange-800'
                  }`}>
                    {prono.statut}
                  </span>
                </div>

                {/* Contenu */}
                <div className="space-y-2 text-sm mb-4">
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
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-3 border-t border-gray-200">
                  <button
                    onClick={() => handleEdit(prono)}
                    className="flex-1 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center justify-center gap-2 transition"
                  >
                    <Edit2 className="w-4 h-4" />
                    Modifier
                  </button>
                  <button
                    onClick={() => handleDelete(prono.id)}
                    className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 flex items-center justify-center gap-2 transition"
                  >
                    <Trash2 className="w-4 h-4" />
                    Supprimer
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <Footer />
      <BottomBar currentPage="" />
    </div>
  );
}