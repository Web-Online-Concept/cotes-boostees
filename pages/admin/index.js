import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Lock, TrendingUp, Users, LogOut } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [password, setPassword] = useState('');
  const [stats, setStats] = useState({
    totalPronos: 0,
    totalAbonnes: 0
  });
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const res = await fetch('/api/auth');
      const data = await res.json();
      
      if (data.authenticated) {
        setIsAuthenticated(true);
        await loadStats();
      }
    } catch (error) {
      console.error('Erreur auth:', error);
    }
    setLoading(false);
  };

  const loadStats = async () => {
    try {
      // Charger stats des pronos
      const pronosRes = await fetch('/api/pronos');
      const pronosData = await pronosRes.json();
      
      // Charger stats des abonnés
      const abonnesRes = await fetch('/api/abonnes');
      const abonnesData = await abonnesRes.json();
      
      setStats({
        totalPronos: pronosData.length,
        totalAbonnes: abonnesData.length
      });
    } catch (error) {
      console.error('Erreur chargement stats:', error);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });
      
      const data = await res.json();
      
      if (data.success) {
        setIsAuthenticated(true);
        setPassword('');
        await loadStats();
      } else {
        alert('Mot de passe incorrect');
      }
    } catch (error) {
      console.error('Erreur login:', error);
      alert('Erreur de connexion');
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth', { method: 'DELETE' });
      setIsAuthenticated(false);
      setStats({ totalPronos: 0, totalAbonnes: 0 });
    } catch (error) {
      console.error('Erreur déconnexion:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-xl text-gray-600">Chargement...</div>
      </div>
    );
  }

  // PAGE DE CONNEXION (si pas authentifié)
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
        <Header />
        
        <div className="flex-1 flex items-center justify-center px-4 py-12">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
            <div className="text-center mb-8">
              <div className="inline-block p-4 bg-indigo-100 rounded-full mb-4">
                <Lock className="w-12 h-12 text-indigo-600" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Administration
              </h1>
              <p className="text-gray-600">
                Connectez-vous pour accéder au tableau de bord
              </p>
            </div>
            
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mot de passe administrateur
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Entrez le mot de passe"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  autoFocus
                  required
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-indigo-700 hover:to-purple-700 flex items-center justify-center gap-2 transition font-semibold"
              >
                <Lock className="w-5 h-5" />
                Se connecter
              </button>
            </form>
          </div>
        </div>
        
        <Footer />
      </div>
    );
  }

  // DASHBOARD (si authentifié)
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
      <Header />
      
      <div className="flex-1 max-w-7xl mx-auto px-4 py-12 w-full">
        {/* En-tête avec déconnexion */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Dashboard Administration
            </h1>
            <p className="text-gray-600">
              Bienvenue dans votre espace de gestion
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 flex items-center gap-2 transition"
          >
            <LogOut className="w-4 h-4" />
            Déconnexion
          </button>
        </div>

        {/* Statistiques rapides */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="inline-block p-4 bg-indigo-100 rounded-full mb-4">
              <TrendingUp className="w-8 h-8 text-indigo-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Cotes Boostées
            </h3>
            <p className="text-4xl font-bold text-indigo-600 mb-2">
              {stats.totalPronos}
            </p>
            <p className="text-sm text-gray-500">
              CB enregistrées
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="inline-block p-4 bg-purple-100 rounded-full mb-4">
              <Users className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Abonnés
            </h3>
            <p className="text-4xl font-bold text-purple-600 mb-2">
              {stats.totalAbonnes}
            </p>
            <p className="text-sm text-gray-500">
              Abonnés inscrits
            </p>
          </div>
        </div>

        {/* Boutons de navigation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <button
            onClick={() => router.push('/admin/pronos')}
            className="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300 group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-4 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl group-hover:scale-110 transition-transform">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <span className="text-indigo-600 group-hover:translate-x-2 transition-transform">
                →
              </span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Gérer les Cotes Boostées
            </h2>
            <p className="text-gray-600">
              Ajouter, modifier ou supprimer des cotes boostées
            </p>
          </button>

          <button
            onClick={() => router.push('/admin/abonnes')}
            className="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300 group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-4 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl group-hover:scale-110 transition-transform">
                <Users className="w-8 h-8 text-white" />
              </div>
              <span className="text-purple-600 group-hover:translate-x-2 transition-transform">
                →
              </span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Gérer les Abonnés
            </h2>
            <p className="text-gray-600">
              Consulter et gérer la liste des abonnés
            </p>
          </button>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}