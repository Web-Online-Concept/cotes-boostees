import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X, LogOut } from 'lucide-react';
import { useRouter } from 'next/router';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function AdminAbonnesPage() {
  const [abonnes, setAbonnes] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    statut_paiement: 'en_attente',
    notes: ''
  });
  const [filterStatut, setFilterStatut] = useState('');
  const router = useRouter();

  const statuts = ['en_attente', 'valide', 'echec', 'rembourse'];

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
      await loadAbonnes();
    } catch (error) {
      console.error('Erreur auth:', error);
      router.push('/');
    }
    setLoading(false);
  };

  const loadAbonnes = async () => {
    try {
      const res = await fetch('/api/abonnes');
      const data = await res.json();
      setAbonnes(data);
    } catch (error) {
      console.error('Erreur chargement abonnés:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth', { method: 'DELETE' });
      router.push('/');
    } catch (error) {
      console.error('Erreur déconnexion:', error);
    }
  };

  const handleSubmit = async () => {
    if (!formData.nom || !formData.email) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }

    try {
      if (editingId) {
        const res = await fetch('/api/abonnes', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editingId, ...formData })
        });

        if (res.ok) {
          await loadAbonnes();
          resetForm();
          alert('Abonné modifié avec succès');
        } else {
          const data = await res.json();
          alert(`Erreur: ${data.message}`);
        }
      } else {
        const res = await fetch('/api/abonnes', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });

        if (res.ok) {
          await loadAbonnes();
          resetForm();
          alert('Abonné ajouté avec succès');
        } else {
          const data = await res.json();
          alert(`Erreur: ${data.message}`);
        }
      }
    } catch (error) {
      console.error('Erreur:', error);
      alert('Erreur lors de l\'enregistrement');
    }
  };

  const handleEdit = (abonne) => {
    setFormData({
      nom: abonne.nom,
      email: abonne.email,
      statut_paiement: abonne.statut_paiement,
      notes: abonne.notes || ''
    });
    setEditingId(abonne.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Supprimer cet abonné ?')) return;

    try {
      const res = await fetch('/api/abonnes', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });

      if (res.ok) {
        await loadAbonnes();
        alert('Abonné supprimé');
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
      nom: '',
      email: '',
      statut_paiement: 'en_attente',
      notes: ''
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

  const filteredAbonnes = filterStatut 
    ? abonnes.filter(a => a.statut_paiement === filterStatut)
    : abonnes;

  const getStatutBadgeClass = (statut) => {
    switch (statut) {
      case 'valide':
        return 'bg-green-100 text-green-800';
      case 'en_attente':
        return 'bg-yellow-100 text-yellow-800';
      case 'echec':
        return 'bg-red-100 text-red-800';
      case 'rembourse':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatutLabel = (statut) => {
    switch (statut) {
      case 'valide':
        return 'Validé';
      case 'en_attente':
        return 'En attente';
      case 'echec':
        return 'Échec';
      case 'rembourse':
        return 'Remboursé';
      default:
        return statut;
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
      <Header currentPage="admin" />

      <div className="max-w-7xl mx-auto px-4 py-8 flex-1">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Gestion des Abonnés</h2>
          <div className="flex gap-2">
            <button
              onClick={toggleForm}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center gap-2 transition"
            >
              <Plus className="w-4 h-4" />
              Ajouter un abonné
            </button>
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 flex items-center gap-2 transition"
            >
              <LogOut className="w-4 h-4" />
              Déconnexion
            </button>
          </div>
        </div>

        {/* Statistiques rapides */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <div className="text-sm text-gray-600 mb-1">Total abonnés</div>
            <div className="text-2xl font-bold text-indigo-600">{abonnes.length}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <div className="text-sm text-gray-600 mb-1">Validés</div>
            <div className="text-2xl font-bold text-green-600">
              {abonnes.filter(a => a.statut_paiement === 'valide').length}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <div className="text-sm text-gray-600 mb-1">En attente</div>
            <div className="text-2xl font-bold text-yellow-600">
              {abonnes.filter(a => a.statut_paiement === 'en_attente').length}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <div className="text-sm text-gray-600 mb-1">Échecs</div>
            <div className="text-2xl font-bold text-red-600">
              {abonnes.filter(a => a.statut_paiement === 'echec').length}
            </div>
          </div>
        </div>

        {/* Formulaire */}
        {showForm && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h3 className="text-lg font-semibold mb-4">
              {editingId ? 'Modifier l\'abonné' : 'Nouvel abonné'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                <input
                  type="text"
                  value={formData.nom}
                  onChange={(e) => setFormData({...formData, nom: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  placeholder="Nom complet"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  placeholder="email@exemple.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Statut</label>
                <select
                  value={formData.statut_paiement}
                  onChange={(e) => setFormData({...formData, statut_paiement: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                >
                  <option value="en_attente">En attente</option>
                  <option value="valide">Validé</option>
                  <option value="echec">Échec</option>
                  <option value="rembourse">Remboursé</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Notes (optionnel)</label>
                <input
                  type="text"
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  placeholder="Notes internes"
                />
              </div>
              <div className="col-span-1 md:col-span-2 flex gap-2">
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

        {/* Filtre */}
        <div className="bg-white rounded-lg shadow-lg p-4 mb-6">
          <div className="flex items-center gap-4">
            <label className="text-sm font-medium text-gray-700">Filtrer par statut :</label>
            <select
              value={filterStatut}
              onChange={(e) => setFilterStatut(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            >
              <option value="">Tous les statuts</option>
              <option value="valide">Validé</option>
              <option value="en_attente">En attente</option>
              <option value="echec">Échec</option>
              <option value="rembourse">Remboursé</option>
            </select>
            {filterStatut && (
              <button
                onClick={() => setFilterStatut('')}
                className="text-sm text-gray-600 hover:text-gray-800"
              >
                Réinitialiser
              </button>
            )}
          </div>
        </div>

        {/* Liste des abonnés */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-indigo-50 border-b">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">Nom</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">Email</th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-600 uppercase">Statut</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">Date inscription</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">Notes</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-600 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredAbonnes.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-4 py-8 text-center text-gray-500">
                      Aucun abonné enregistré.
                    </td>
                  </tr>
                ) : (
                  filteredAbonnes.map(abonne => (
                    <tr key={abonne.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">{abonne.nom}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{abonne.email}</td>
                      <td className="px-4 py-3 text-center">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatutBadgeClass(abonne.statut_paiement)}`}>
                          {getStatutLabel(abonne.statut_paiement)}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {new Date(abonne.date_inscription).toLocaleDateString('fr-FR')} à{' '}
                        {new Date(abonne.date_inscription).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {abonne.notes || '-'}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button
                          onClick={() => handleEdit(abonne)}
                          className="text-indigo-600 hover:text-indigo-800 mr-3"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(abonne.id)}
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

      <Footer />
    </div>
  );
}