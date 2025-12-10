import { useState, useEffect } from 'react';
import { Home, BarChart3, Lock, LogOut } from 'lucide-react';
import { useRouter } from 'next/router';

export default function HomePage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const res = await fetch('/api/auth');
      const data = await res.json();
      setIsAuthenticated(data.authenticated);
    } catch (error) {
      console.error('Erreur auth:', error);
    }
    setLoading(false);
  };

  const handleLogin = async () => {
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
        router.push('/admin');
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
    } catch (error) {
      console.error('Erreur logout:', error);
    }
  };

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
              className="py-4 px-2 border-b-2 border-indigo-500 text-indigo-600 font-medium text-sm flex items-center gap-2"
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
              className="py-4 px-2 border-b-2 border-transparent text-gray-500 hover:text-gray-700 font-medium text-sm flex items-center gap-2"
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

      {/* Contenu principal */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Introduction */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Bienvenue sur Cotes-Boostées.com</h2>
            <p className="text-lg text-gray-700 mb-6">
              Votre plateforme de suivi des cotes boostées et de vos performances sportives
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 mt-8">
              <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-6 rounded-lg border border-indigo-200">
                <h3 className="text-xl font-semibold text-indigo-900 mb-3">🎯 Notre Mission</h3>
                <p className="text-gray-700">
                  Suivre et analyser toutes vos cotes boostées pour optimiser vos gains et mesurer vos performances réelles.
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-lg border border-green-200">
                <h3 className="text-xl font-semibold text-green-900 mb-3">📊 Statistiques Détaillées</h3>
                <p className="text-gray-700">
                  Accédez à des analyses complètes : bilan global, performance par bookmaker, évolution mensuelle et ROI.
                </p>
              </div>
            </div>
          </div>

          {/* Fonctionnement */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Comment ça fonctionne ?</h3>
            
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                  1
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Consultation Publique</h4>
                  <p className="text-gray-700">
                    Consultez librement toutes les statistiques et performances sur la page "Statistiques". Pas besoin de connexion pour voir les résultats.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                  2
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Accès Sécurisé Administrateur</h4>
                  <p className="text-gray-700">
                    Un mot de passe protège l'accès à la gestion des pronos. Seuls les administrateurs peuvent ajouter, modifier ou supprimer des pronos.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                  3
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Numérotation des Cotes Boostées</h4>
                  <p className="text-gray-700">
                    Chaque prono est identifié par un numéro unique (CB 001, CB 002, etc.) pour un suivi précis et organisé.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                  4
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Mise à Jour Automatique</h4>
                  <p className="text-gray-700">
                    Chaque modification d'un prono (statut Gagné/Perdu/Remboursé) met à jour instantanément toutes les statistiques.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                  5
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Analyses Complètes</h4>
                  <p className="text-gray-700">
                    Visualisez votre ROI, votre taux de réussite, vos meilleurs bookmakers et votre évolution dans le temps.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Connexion Admin */}
          {!isAuthenticated && (
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Connexion Administrateur</h3>
              <p className="text-gray-700 mb-6">
                Entrez le mot de passe pour accéder à la gestion des pronos
              </p>
              <div className="flex gap-4 max-w-md">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                  placeholder="Mot de passe"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
                <button
                  onClick={handleLogin}
                  className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 flex items-center gap-2 transition"
                >
                  <Lock className="w-4 h-4" />
                  Se connecter
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}