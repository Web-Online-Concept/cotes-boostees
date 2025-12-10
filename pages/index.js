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

          {/* Comment ca marche */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Comment ca marche ?</h3>
            
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                  1
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Abonnez-vous au groupe Telegram</h4>
                  <p className="text-gray-700">
                    Rejoignez notre communaute privee et accedez a toutes les cotes boostees selectionnees par nos experts.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                  2
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Recevez les notifications en temps reel</h4>
                  <p className="text-gray-700">
                    Chaque cote boostee est postee instantanement avec toutes les informations : bookmaker, evenement, cote, mise recommandee.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                  3
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Placez vos paris en quelques clics</h4>
                  <p className="text-gray-700">
                    Suivez les cotes boostees proposees. Chaque prono est identifie par un numero unique (CB 001, CB 002...) pour un suivi precis.
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
                    Tous les resultats sont publics et mis a jour en temps reel. Suivez notre ROI, nos performances par bookmaker et notre evolution.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Final */}
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl shadow-2xl p-8 text-white text-center">
            <h3 className="text-3xl font-bold mb-4">Pret a transformer vos paris en succes ?</h3>
            <p className="text-xl mb-6">
              Rejoignez-nous des maintenant et decouvrez comment optimiser vos gains avec les meilleures cotes boostees ARJEL !
            </p>
            <button 
              onClick={() => window.location.href = '/paiement'}
              className="bg-white text-green-600 px-8 py-4 rounded-lg text-xl font-bold hover:bg-gray-100 transition transform hover:scale-105"
            >
              Rejoindre le groupe Telegram 🚀
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}