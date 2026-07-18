import Header from '../components/Header';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

export default function AbonnementPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
      <Header />
      <Navigation currentPage="abonnement" />

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
              <a 
                href="/resultats"
                className="bg-white text-green-600 px-6 py-3 rounded-lg text-lg font-bold hover:bg-gray-100 transition transform hover:scale-105"
              >
                Voir les Resultats 📊
              </a>
              <a 
                href="/stats"
                className="bg-white text-green-600 px-6 py-3 rounded-lg text-lg font-bold hover:bg-gray-100 transition transform hover:scale-105"
              >
                Voir les Statistiques 📈
              </a>
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

      <Footer />
    </div>
  );
}