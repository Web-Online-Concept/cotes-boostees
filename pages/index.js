import { useRouter } from 'next/router';
import Header from '../components/Header';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
      <Header />
      <Navigation currentPage="home" />

      {/* Contenu principal */}
      <div className="max-w-7xl mx-auto px-4 py-8 flex-1">
        <div className="space-y-8">
          
          {/* Hero Section */}
          <div className="bg-gradient-to-r from-indigo-600 to-blue-500 rounded-xl shadow-2xl p-8 text-white text-center transform transition hover:scale-105 hover:shadow-3xl">
            <h2 className="text-4xl font-bold mb-4">Gagnez avec les meilleures Cotes Boostees ARJEL</h2>
            <p className="text-2xl mb-6">- CANAL & GROUPE PRIVES TELEGRAM -</p>
            <p className="text-xl opacity-90">Maximisez vos gains en ne pariant que sur les vraies opportunites ! 🚀</p>
          </div>

          {/* Avantages en cards */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-indigo-600 transform transition hover:scale-105 hover:shadow-2xl cursor-pointer">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Selection Expert</h3>
              <p className="text-gray-700">
                Ne perdez plus de temps a analyser toutes les cotes boostees. Nous faisons le tri pour vous et ne gardons que les meilleures.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-green-600 transform transition hover:scale-105 hover:shadow-2xl cursor-pointer">
              <div className="text-4xl mb-4">📈</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Transparence Absolue</h3>
              <p className="text-gray-700">
                Tous nos resultats sont publics. ROI, taux de reussite, evolution mensuelle : suivez nos performances en temps reel.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-blue-600 transform transition hover:scale-105 hover:shadow-2xl cursor-pointer">
              <div className="text-4xl mb-4">💎</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Que de la Valeur</h3>
              <p className="text-gray-700">
                Zero perte de temps avec des cotes sans interet. Chaque notification = une vraie opportunite de gain.
              </p>
            </div>
          </div>

          {/* Presentation principale */}
          <div className="bg-white rounded-xl shadow-lg p-8 transform transition hover:shadow-2xl">
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Chez <strong>Cotes Boostees</strong>, nous ne vous proposons PAS toutes les cotes boostees du marche. 
              Notre objectif ? <strong>Selectionner UNIQUEMENT les cotes a valeur positive (EV+)</strong> pour maximiser vos profits 💰.
            </p>
            
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Notre methode selective :</h3>
            
            <div className="bg-red-50 border-l-4 border-red-600 p-6 rounded-lg mb-6 transform transition hover:translate-x-2">
              <h3 className="text-xl font-bold text-red-900 mb-3">❌ Ce que nous ECARTONS :</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Les cotes boostees a EV neutre (EV=0)</li>
                <li>• Les cotes boostees sans valeur reelle</li>
                <li>• Les promotions trompeuses des bookmakers</li>
              </ul>
            </div>

            <div className="bg-green-50 border-l-4 border-green-600 p-6 rounded-lg mb-6 transform transition hover:translate-x-2">
              <h3 className="text-xl font-bold text-green-900 mb-3">✅ Ce que nous SELECTIONNONS :</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• UNIQUEMENT les cotes boostees a valeur positive (EV+)</li>
                <li>• Les vraies opportunites rentables sur le long terme</li>
                <li>• Les cotes ou l'avantage mathematique est en votre faveur</li>
              </ul>
            </div>

            <div className="bg-indigo-50 border-l-4 border-indigo-600 p-6 rounded-lg transform transition hover:translate-x-2">
              <h3 className="text-xl font-bold text-indigo-900 mb-4">Notre processus d'analyse :</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="text-2xl">🔍</span>
                  <span><strong>Analyse quotidienne :</strong> Nous scannons toutes les cotes boostees des bookmakers ARJEL</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl">📊</span>
                  <span><strong>Calcul de la valeur :</strong> Nous determinons si la cote boostee presente une esperance de gain positive</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl">✂️</span>
                  <span><strong>Selection rigoureuse :</strong> Nous ne gardons QUE les cotes avec un avantage reel</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl">⚡️</span>
                  <span><strong>Notification immediate :</strong> Vous recevez uniquement les vraies opportunites sur Telegram</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Explication valeur */}
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl shadow-2xl p-8 text-white transform transition hover:scale-105 hover:shadow-3xl">
            <h3 className="text-3xl font-bold mb-4 text-center">Pourquoi la VALEUR est essentielle ?</h3>
            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <div className="bg-white bg-opacity-20 rounded-lg p-6 transform transition hover:bg-opacity-30">
                <h4 className="text-xl font-bold mb-3">❌ Sans selection :</h4>
                <p className="text-lg">
                  Jouer toutes les cotes boostees = diluer vos gains avec des paris sans valeur. 
                  Resultat : ROI mediocre voire negatif.
                </p>
              </div>
              <div className="bg-white bg-opacity-20 rounded-lg p-6 transform transition hover:bg-opacity-30">
                <h4 className="text-xl font-bold mb-3">✅ Avec notre selection :</h4>
                <p className="text-lg">
                  Ne jouer QUE les cotes a valeur = concentrer vos mises sur les vraies opportunites. 
                  Resultat : ROI optimise sur le long terme.
                </p>
              </div>
            </div>
          </div>

          {/* Comment ca marche */}
          <div className="bg-white rounded-xl shadow-lg p-8 transform transition hover:shadow-2xl">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Comment ca marche ?</h3>
            
            <div className="space-y-6">
              <div className="flex gap-4 transform transition hover:translate-x-2">
                <div className="flex-shrink-0 w-12 h-12 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                  1
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Abonnez-vous au service</h4>
                  <p className="text-gray-700">
                    Rendez-vous sur notre page d'abonnement pour rejoindre la communaute des parieurs intelligents.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 transform transition hover:translate-x-2">
                <div className="flex-shrink-0 w-12 h-12 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                  2
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Recevez vos acces Telegram</h4>
                  <p className="text-gray-700">
                    Apres validation de votre paiement, nous vous envoyons un mail avec les liens d'acces au canal et groupe prive CB 2026.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 transform transition hover:translate-x-2">
                <div className="flex-shrink-0 w-12 h-12 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                  3
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Ne jouez QUE les cotes a valeur</h4>
                  <p className="text-gray-700">
                    Chaque jour, recevez UNIQUEMENT les cotes boostees selectionnees pour leur valeur reelle. Chaque prono = numero unique (CB 001, CB 002...).
                  </p>
                </div>
              </div>

              <div className="flex gap-4 transform transition hover:translate-x-2">
                <div className="flex-shrink-0 w-12 h-12 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                  4
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Suivez vos gains en transparence</h4>
                  <p className="text-gray-700">
                    Tous nos resultats sont publics sur ce site. Consultez notre ROI, nos stats par bookmaker et notre evolution en temps reel.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Final */}
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl shadow-2xl p-8 text-white text-center transform transition hover:scale-105 hover:shadow-3xl">
            <h3 className="text-3xl font-bold mb-4">Pret a parier intelligemment ?</h3>
            <p className="text-xl mb-6">
              Arretez de perdre du temps avec des cotes sans valeur. Rejoignez-nous et ne jouez plus QUE les vraies opportunites !
            </p>
            <button 
              onClick={() => router.push('/abonnement')}
              className="bg-white text-green-600 px-8 py-4 rounded-lg text-xl font-bold hover:bg-gray-100 transition transform hover:scale-110"
            >
              S'abonner aux Cotes Boostees 2026 🚀
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}