import { useState, useEffect } from 'react';
import { Home, BarChart3, Lock, Plus, Edit2, Trash2, LogOut } from 'lucide-react';
import { useRouter } from 'next/router';

export default function AdminPage() {
  const [pronos, setPronos] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    cb_number: '',
    date: new Date().toISOString().split('T')[0],
    bookmaker: '',
    event: '',
    mise: '',
    cote: '',
    statut: 'En cours'
  });
  const router = useRouter();

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
      setIsAuthenticated(false);
      router.push('/');
    } catch (error) {
      console.error('Erreur logout:', error);
    }
  };

  const handleSubmit = async () => {
    if (!formData.cb_number || !formData.date || !formData.bookmaker || !formData.event || !formData.mise || !formData.cote) {
      alert('Veuillez remplir tous les champs');
      return;
    }

    try {
      if (editingId) {
        // Mise à jour
        const res = await fetch('/api/pronos', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editingId, ...formData })
        });

        const data = await res.json();
        
        if (res.ok) {
          await loadPronos();
          resetForm();
          alert('Prono modifié avec succès');
        } else {
          alert(data.message || 'Erreur lors de la modification');
        }
      } else {
        // Création
        const res = await fetch('/api/pronos', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });

        const data = await res.json();
        
        if (res.ok) {
          await loadPronos();
          resetForm();
          alert('Prono ajouté avec succès');
        } else {
          alert(data.message || 'Erreur lors de la création');
        }
      }
    } catch (error) {
      console.error('Erreur:', error);
      alert('Erreur lors de l\'enregistrement');
    }
  };

  const handleEdit = (prono) => {
    setFormData({
      cb_number: prono.cb_number,
      date: prono.date,
      bookmaker: prono.bookmaker,
      event: prono.event,
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
        alert('Prono supprimé');
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
      bookmaker: '',
      event: '',
      mise: '',
      cote: '',
      statut: 'En cours'
    });
    setEditingId(null);
    setShowForm(false);
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-md border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-indigo-600">Cotes-Boostées.com</h1>
            <p className="text-sm text-gray-600">Suivi intelligent de vos pronos</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
          >
            <LogOut className="w-4 h-4" />
            Déconnexion
          </button>
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
              onClick={() => router.push('/stats')}
              className="py-4 px-2 border-b-2 border-transparent text-gray-500 hover:text-gray-700 font-medium text-sm flex items-center gap-2"
            >
              <BarChart3 className="w-4 h-4" />
              Statistiques
            </button>
            <button
              onClick={() => router.push('/admin')}
              className="py-4 px-2 border-b-2 border-indigo-500 text-indigo-600 font-medium text-sm flex items-center gap-2"
            >
              <Lock className="w-4 h-4" />
              Gestion
            </button>
          </div>
        </div>
      </nav>

      {/* Contenu */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Gestion des Pronos</h2>
          <button
            onClick={() => {
              setShowForm(!showForm);
              if (!showForm) resetForm();
            }}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center gap-2 transition"
          >
            <Plus className="w-4 h-4" />
            Ajouter un prono
          </button>
        </div>

        {/* Formulaire */}
        {showForm && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h3 className="text-lg font-semibold mb-4">
              {editingId ? 'Modifier le prono' : 'Nouveau prono'}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Numéro CB</label>
                <input
                  type="text"
                  value={formData.cb_number}
                  onChange={(e) => setFormData({...formData, cb_number: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  placeholder="CB 001"
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
                <input
                  type="text"
                  value={formData.bookmaker}
                  onChange={(e) => setFormData({...formData, bookmaker: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  placeholder="Betclic, Winamax..."
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Événement</label>
                <input
                  type="text"
                  value={formData.event}
                  onChange={(e) => setFormData({...formData, event: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  placeholder="PSG - OM"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mise (€)</label>
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Statut</label>
                <select
                  value={formData.statut}
                  onChange={(e) => setFormData({...formData, statut: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                >
                  <option>En cours</option>
                  <option>Gagné</option>
                  <option>Perdu</option>
                  <option>Remboursé</option>
                </select>
              </div>
              <div className="col-span-2 md:col-span-3 flex gap-2">
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
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-indigo-50 border-b">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">N° CB</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">Date</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">Événement</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">Bookmaker</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-600 uppercase">Mise</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-600 uppercase">Cote</th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-600 uppercase">Statut</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-600 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {pronos.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="px-4 py-8 text-center text-gray-500">
                      Aucun prono enregistré. Cliquez sur "Ajouter un prono" pour commencer.
                    </td>
                  </tr>
                ) : (
                  pronos.map(prono => (
                    <tr key={prono.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm font-semibold text-indigo-600">{prono.cb_number}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {new Date(prono.date).toLocaleDateString('fr-FR')}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900">{prono.event}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{prono.bookmaker}</td>
                      <td className="px-4 py-3 text-sm text-gray-900 text-right">{parseFloat(prono.mise).toFixed(2)}€</td>
                      <td className="px-4 py-3 text-sm text-gray-900 text-right">{parseFloat(prono.cote).toFixed(2)}</td>
                      <td className="px-4 py-3 text-center">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          prono.statut === 'Gagné' ? 'bg-green-100 text-green-800' :
                          prono.statut === 'Perdu' ? 'bg-red-100 text-red-800' :
                          prono.statut === 'Remboursé' ? 'bg-blue-100 text-blue-800' :
                          'bg-yellow-100 text-yellow-800'
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
      </div>
    </div>
  );
}