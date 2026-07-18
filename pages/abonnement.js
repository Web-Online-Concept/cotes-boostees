import { useState, useEffect } from 'react';
import { Home, BarChart3, Lock, Filter, LogOut, CreditCard } from 'lucide-react';
import { useRouter } from 'next/router';

export default function AbonnementPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-md border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <img
              src="/images/logo_cb_100.png"
              alt="Logo Cotes Boostees"
              className="h-16"
            />
            <div>
              <h1 className="text-3xl font-bold text-indigo-600">Cotes-Boostees.com</h1>
              <p className="text-sm text-gray-600">Suivi des Cotes Boostees a Valeur</p>
            </div>
          </div>

          {isAuthenticated && (
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
            >
              <LogOut className="w-4 h-4" />
              Deconnexion
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
              <Filter className="w-4 h-4" />
              Resultats
            </button>
            <button
              onClick={() => router.push('/stats')}
              className="py-4 px-2 border-b-2 border-transparent text-gray-500 hover:text-gray-700 font-medium text-sm flex items-center gap-2"
            >
              <BarChart3 className="w-4 h-4" />
              Statistiques
            </button>
            <button
              onClick={() => router.push('/abonnement')}
              className="py-4 px-2 border-b-2 border-indigo-500 text-indigo-600 font-medium text-sm flex items-center gap-2"
            >
              <CreditCard className="w-4 h-4" />
              S'abonner
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
      <div className="max-w-4xl mx-auto px-4 py-12 flex-1">
        <div className="space-y-8">
          
          {/* Message principal */}
          <div className="bg-white rounded-xl shadow-2xl p-8 text-center transform transition hover:shadow-3xl">
            <div className="text-6xl mb-6">🙏</div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Merci pour votre interet !</h2>
            <p className="text-xl text-gray-700 mb-6">
              Nous sommes ravis de voir que notre service de selection de Cotes Boostees vous interesse.
            </p>
          </div>

          {/* Annonce fermeture */}
          <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-xl shadow-2xl p-8 text-white text-center transform transition hover:scale-105">
            <div className="text-5xl mb-4">🔒</div>
            <h3 className="text-3xl font-bold mb-4">Abonnement 2026 clos</h3>
            <p className="text-xl opacity-95">
              L'abonnement pour l'annee 2026 est desormais <strong>ferme et indisponible</strong>.
            </p>
          </div>

          {/* Explication */}
          <div className="bg-white rounded-xl shadow-lg p-8 transform transition hover:shadow-2xl">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Pourquoi l'abonnement est-il clos ?</h3>
            
            <div className="space-y-4 text-gray-700">
              <p className="text-lg leading-relaxed">
                Afin de garantir une <strong>qualite de service optimale</strong> et de maintenir une communaute engagee, 
                nous avons decide de limiter le nombre de membres dans notre groupe prive Telegram.
              </p>
              <p className="text-lg leading-relaxed">
                Le quota de places pour l'annee 2026 a ete atteint. Nous vous invitons a revenir 
                lors de l'ouverture des inscriptions pour la prochaine saison.
              </p>
            </div>
          </div>

          {/* Alternatives */}
          <div className="bg-indigo-50 rounded-xl shadow-lg p-8 border-l-4 border-indigo-600 transform transition hover:shadow-2xl">
            <h3 className="text-2xl font-bold text-indigo-900 mb-6">En attendant, vous pouvez :</h3>
            
            <ul className="space-y-4 text-gray-700">
              <li className="flex items-start gap-3">
                <span className="text-2xl">📊</span>
                <span className="text-lg">Consulter nos <strong>resultats publics</strong> sur la page Resultats</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-2xl">📈</span>
                <span className="text-lg">Analyser nos <strong>statistiques detaillees</strong> sur la page Statistiques</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-2xl">🔔</span>
                <span className="text-lg">Nous suivre pour etre informe de la <strong>reouverture des inscriptions</strong></span>
              </li>
            </ul>
          </div>

          {/* CTA vers resultats */}
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl shadow-2xl p-8 text-white text-center transform transition hover:scale-105">
            <h3 className="text-2xl font-bold mb-4">Decouvrez nos performances</h3>
            <p className="text-lg mb-6 opacity-95">
              Consultez nos resultats et statistiques en toute transparence pour voir la qualite de notre selection.
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <button 
                onClick={() => router.push('/resultats')}
                className="bg-white text-green-600 px-6 py-3 rounded-lg text-lg font-bold hover:bg-gray-100 transition transform hover:scale-105"
              >
                Voir les Resultats 📊
              </button>
              <button 
                onClick={() => router.push('/stats')}
                className="bg-white text-green-600 px-6 py-3 rounded-lg text-lg font-bold hover:bg-gray-100 transition transform hover:scale-105"
              >
                Voir les Statistiques 📈
              </button>
            </div>
          </div>

          {/* Message de remerciement final */}
          <div className="text-center text-gray-600">
            <p className="text-lg">
              Merci de votre comprehension et a bientot sur <strong>Cotes-Boostees.com</strong> ! 🙌
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="text-center text-gray-600 text-sm">
            <p>&copy; {new Date().getFullYear()} Cotes-Boostees.com - Tous droits reserves</p>
            <p className="mt-2">Suivi professionnel des cotes boostees</p>
          </div>
        </div>
      </footer>
    </div>
  );
}