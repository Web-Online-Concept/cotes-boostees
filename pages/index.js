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
          
          {/* Hero Section */}
          <div className="bg-gradient-to-r from-indigo-600 to-blue-500 rounded-xl shadow-2xl p-8 text-white text-center">
            <h2 className="text-4xl font-bold mb-4">Gagnez avec les meilleures Cotes Boostees ARJEL</h2>
            <p className="text-2xl mb-6">- CANAL & GROUPE PRIVES TELEGRAM -</p>
            <p className="text-xl opacity-90">Boostez vos gains en toute simplicite ! 🚀</p>
          </div>

          {/* Presentation principale */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Sur le site des <strong>Cotes Boostees</strong>, l'objectif est clair : vous aider a maximiser vos profits grace aux paris sportifs 💰.
            </p>
            
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Comment ?</h3>
            <p className="text-lg text-gray-700 mb-6">
              En selectionnant pour vous les meilleures cotes boostees des bookmakers ARJEL, celles qui allient simplicite, efficacite et rentabilite 📈.
            </p>

            <div className="bg-indigo-50 border-l-4 border-indigo-600 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold text-indigo-900 mb-4">Notre concept est aussi simple qu'il est performant :</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="text-2xl">⚽️</span>
                  <span>Nous analysons les opportunites du marche</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl">🎯</span>
                  <span>Nous identifions les cotes boostees les plus prometteuses</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl">💵</span>
                  <span>Vous pariez malin et encaissez des gains optimises</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl">⚡️</span>
                  <span>Vous etes notifie en temps reel grace a notre canal Telegram</span>
                </li>
              </ul>
            </div>

            <div className="bg-green-50 border-l-4 border-green-600 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-green-900 mb-4">Pas de complications, pas de pertes de temps ⏳ :</h3>
              <p className="text-gray-700 leading-relaxed">
                Nos experts travaillent pour vous denicher des opportunites rentables, testees et pretes a l'emploi ✅. 
                Que vous soyez novice ou parieur aguerri, notre methode vous permet de tirer le meilleur parti de chaque mise.
              </p>
            </div>
          </div>

          {/* Avantages en cards */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-indigo-600">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Transparence Totale</h3>
              <p className="text-gray-700">
                Consultez tous nos resultats en temps reel. Chaque cote boostee est numerotee et tracee pour une transparence absolue.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-green-600">
              <div className="text-4xl mb-4">📈</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Statistiques Detaillees</h3>
              <p className="text-gray-700">
                Suivez nos performances mois par mois, bookmaker par bookmaker. ROI, taux de reussite, tout est public.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-blue-600">
              <div className="text-4xl mb-4">⚡️</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Notifications Instantanees</h3>
              <p className="text-gray-700">
                Recevez chaque cote boostee directement sur Telegram. Ne manquez plus aucune opportunite rentable.
              </p>
            </div>
          </div>

          {/* Offre speciale */}
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl shadow-2xl p-8 text-center">
            <div className="bg-white bg-opacity-20 rounded-lg p-6 inline-block mb-6">
              <p className="text-white text-lg mb-2">Abonnement annuel</p>
              <p className="text-white text-6xl font-bold">100€</p>
              <p className="text-white text-xl mt-2">Acces illimite pendant 1 an</p>
            </div>
            <p className="text-white text-2xl font-semibold">
              Soit moins de 8.5€ par mois pour des opportunites quotidiennes !
            </p>
          </div>

          {/* Comment ca marche */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Comment ca marche ?</h3>
            
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                  1
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Abonnez-vous a notre service</h4>
                  <p className="text-gray-700">
                    <strong className="text-indigo-600 text-xl">100€ par an</strong> - Un investissement minimal pour des gains optimises toute l'annee. Rendez-vous sur la page d'abonnement pour effectuer votre paiement securise.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                  2
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Confirmation et integration immediate</h4>
                  <p className="text-gray-700">
                    Une fois votre paiement effectue, nous vous envoyons un mail de confirmation avec les liens d'acces a notre canal et groupe de discussions Telegram pour les CB 2025.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                  3
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Recevez et placez vos paris</h4>
                  <p className="text-gray-700">
                    Suivez les cotes boostees proposees en temps reel sur Telegram. Chaque prono est identifie par un numero unique (CB 001, CB 002...) pour un suivi precis.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                  4
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Consultez les resultats et statistiques</h4>
                  <p className="text-gray-700">
                    Tous les resultats sont publics et mis a jour en temps reel sur ce site. Suivez notre ROI, nos performances par bookmaker et notre evolution mensuelle.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Final simplifie */}
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl shadow-2xl p-8 text-white text-center">
            <h3 className="text-3xl font-bold mb-4">Pret a rejoindre la communaute ?</h3>
            <p className="text-xl mb-6">
              Decouvrez nos performances en consultant nos resultats et statistiques publics, puis abonnez-vous pour recevoir toutes les cotes boostees en temps reel !
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}