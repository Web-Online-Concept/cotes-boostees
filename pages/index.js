import Header from '../components/Header';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
      <Header />
      <Navigation currentPage="home" />

      {/* Contenu principal */}
      <div className="max-w-7xl mx-auto px-4 py-8 flex-1">
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
        </div>
      </div>

      <Footer />
    </div>
  );
}