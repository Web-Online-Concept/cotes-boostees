import { useRouter } from 'next/router';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
      <Header currentPage="home" />

      {/* Video Background Fullscreen (hauteur écran - header) */}
      <div className="relative w-full overflow-hidden" style={{ height: 'calc(100vh - 110px)' }}>
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover"
        >
          <source src="/videos/video_accueil_cb.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Ancre pour le lien Fonctionnement */}
      <div id="fonctionnement"></div>

      {/* Contenu principal */}
      <div className="max-w-7xl mx-auto px-4 py-8 flex-1">
        <div className="space-y-8">
          
          {/* Hero Section */}
          <div className="bg-gradient-to-r from-indigo-600 to-blue-500 rounded-xl shadow-2xl p-8 text-white text-center transform transition hover:scale-105 hover:shadow-3xl">
            <h2 className="text-4xl font-bold mb-4">Gagnez avec les meilleures Cotes Boostées ARJEL</h2>
            <p className="text-2xl mb-6">- CANAL & GROUPE PRIVÉS TELEGRAM -</p>
            <p className="text-xl opacity-90">Maximisez vos gains en ne pariant que sur les vraies opportunités ! 🚀</p>
          </div>

          {/* NOUVEAU - Cadre explicatif Cotes Boostées */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-400 rounded-xl shadow-xl p-8 transform transition hover:shadow-2xl">
            <div className="flex items-start gap-4">
              <div className="text-5xl flex-shrink-0">💡</div>
              <div>
                <h3 className="text-2xl font-bold text-amber-900 mb-4">C'est quoi une Cote Boostée ?</h3>
                <p className="text-lg text-gray-800 leading-relaxed mb-3">
                  Une <strong>cote boostée</strong> (CB) est une promotion proposée par les bookmakers qui augmente temporairement la cote d'un pari sportif.
                </p>
                <p className="text-lg text-gray-800 leading-relaxed mb-3">
                  <strong>Exemple simple :</strong> Si la victoire du PSG est normalement cotée à <span className="text-indigo-700 font-bold">1.80</span>, 
                  le bookmaker peut la booster à <span className="text-green-700 font-bold">2.50</span> pendant quelques heures. 
                  Pour la même mise, vous gagnez plus ! 💰
                </p>
                <div className="bg-white rounded-lg p-4 mt-4 border-l-4 border-amber-500">
                  <p className="text-gray-700">
                    ⚠️ <strong>Attention :</strong> Toutes les CB ne se valent pas ! Beaucoup sont des pièges marketing sans valeur réelle. 
                    C'est pourquoi nous sélectionnons <strong>uniquement celles qui offrent un avantage mathématique</strong> (EV+).
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Galerie d'exemples de CB */}
          <div className="bg-white rounded-xl shadow-lg p-8 transform transition hover:shadow-2xl">
            <h3 className="text-2xl font-bold text-gray-900 mb-2 text-center">Exemples de Cotes Boostées</h3>
            <p className="text-center text-gray-600 mb-6">Découvrez divers exemples de CB postées sur notre canal</p>
            
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                <div 
                  key={num}
                  className="relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transform transition hover:scale-105 cursor-pointer"
                >
                  <img
                    src={`/images/cb_accueil_${num.toString().padStart(2, '0')}.png`}
                    alt={`Exemple Cote Boostée ${num}`}
                    className="w-full h-auto object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Avantages en cards */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-indigo-600 transform transition hover:scale-105 hover:shadow-2xl cursor-pointer">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Sélection Expert</h3>
              <p className="text-gray-700">
                Ne perdez plus de temps à analyser toutes les cotes boostées. Nous faisons le tri pour vous et ne gardons que les meilleures.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-green-600 transform transition hover:scale-105 hover:shadow-2xl cursor-pointer">
              <div className="text-4xl mb-4">📈</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Transparence Absolue</h3>
              <p className="text-gray-700">
                Tous nos résultats sont publics. ROI, taux de réussite, évolution mensuelle : suivez nos performances en temps réel.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-blue-600 transform transition hover:scale-105 hover:shadow-2xl cursor-pointer">
              <div className="text-4xl mb-4">💎</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Que de la Valeur</h3>
              <p className="text-gray-700">
                Zéro perte de temps avec des cotes sans intérêt. Chaque notification = une vraie opportunité de gain.
              </p>
            </div>
          </div>

          {/* Présentation principale */}
          <div className="bg-white rounded-xl shadow-lg p-8 transform transition hover:shadow-2xl">
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Chez <strong>Cotes Boostées</strong>, nous ne vous proposons PAS toutes les cotes boostées du marché. 
              Notre objectif ? <strong>Sélectionner UNIQUEMENT les cotes à valeur positive (EV+)</strong> pour maximiser vos profits 💰.
            </p>
            
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Notre méthode sélective :</h3>
            
            {/* Sélection / Écart côte à côte */}
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-green-50 border-l-4 border-green-600 p-6 rounded-lg transform transition hover:translate-x-2">
                <h3 className="text-xl font-bold text-green-900 mb-3">✅ Ce que nous SÉLECTIONNONS :</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• UNIQUEMENT les cotes boostées à valeur positive (EV+)</li>
                  <li>• Les vraies opportunités rentables sur le long terme</li>
                  <li>• Les cotes où l'avantage mathématique est en votre faveur</li>
                </ul>
              </div>

              <div className="bg-red-50 border-l-4 border-red-600 p-6 rounded-lg transform transition hover:translate-x-2">
                <h3 className="text-xl font-bold text-red-900 mb-3">❌ Ce que nous ÉCARTONS :</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Les cotes boostées à EV neutre (EV=0)</li>
                  <li>• Les cotes boostées sans valeur réelle</li>
                  <li>• Les promotions trompeuses des bookmakers</li>
                </ul>
              </div>
            </div>

            <div className="bg-indigo-50 border-l-4 border-indigo-600 p-6 rounded-lg transform transition hover:translate-x-2">
              <h3 className="text-xl font-bold text-indigo-900 mb-4">Notre processus d'analyse :</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="text-2xl">🔍</span>
                  <span><strong>Analyse quotidienne :</strong> Nous scannons toutes les cotes boostées des bookmakers ARJEL</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl">📊</span>
                  <span><strong>Calcul de la valeur :</strong> Nous déterminons si la cote boostée présente une espérance de gain positive</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl">✂️</span>
                  <span><strong>Sélection rigoureuse :</strong> Nous ne gardons QUE les cotes avec un avantage réel</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl">⚡️</span>
                  <span><strong>Notification immédiate :</strong> Vous recevez uniquement les vraies opportunités sur Telegram</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Explication valeur */}
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl shadow-2xl p-8 text-white transform transition hover:scale-105 hover:shadow-3xl">
            <h3 className="text-3xl font-bold mb-4 text-center">Pourquoi la VALEUR est essentielle ?</h3>
            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <div className="bg-white bg-opacity-20 rounded-lg p-6 transform transition hover:bg-opacity-30">
                <h4 className="text-xl font-bold mb-3">❌ Sans sélection :</h4>
                <p className="text-lg">
                  Jouer toutes les cotes boostées = diluer vos gains avec des paris sans valeur. 
                  Résultat : ROI médiocre voire négatif.
                </p>
              </div>
              <div className="bg-white bg-opacity-20 rounded-lg p-6 transform transition hover:bg-opacity-30">
                <h4 className="text-xl font-bold mb-3">✅ Avec notre sélection :</h4>
                <p className="text-lg">
                  Ne jouer QUE les cotes à valeur = concentrer vos mises sur les vraies opportunités. 
                  Résultat : ROI optimisé sur le long terme.
                </p>
              </div>
            </div>
          </div>

          {/* Comment ça marche */}
          <div className="bg-white rounded-xl shadow-lg p-8 transform transition hover:shadow-2xl">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Comment ça marche ?</h3>
            
            <div className="space-y-6">
              <div className="flex gap-4 transform transition hover:translate-x-2">
                <div className="flex-shrink-0 w-12 h-12 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                  1
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Abonnez-vous au service</h4>
                  <p className="text-gray-700">
                    Rendez-vous sur notre page d'abonnement pour rejoindre la communauté des parieurs intelligents.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 transform transition hover:translate-x-2">
                <div className="flex-shrink-0 w-12 h-12 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                  2
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Recevez vos accès Telegram</h4>
                  <p className="text-gray-700 mb-3">
                    Après validation de votre paiement, vous recevez un mail avec les liens d'invitations pour intégrer le canal et le groupe privé CB 2026.
                  </p>
                  <p className="text-gray-700">
                    Une fois intégré au canal et au groupe, vous serez notifié à chaque CB publiée sur le canal, et vous pourrez discuter et échanger avec les autres membres du groupe.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 transform transition hover:translate-x-2">
                <div className="flex-shrink-0 w-12 h-12 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                  3
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Ne jouez QUE les cotes à valeur</h4>
                  <p className="text-gray-700">
                    Chaque jour, recevez UNIQUEMENT les cotes boostées sélectionnées pour leur valeur réelle. Chaque prono = numéro unique (CB 001, CB 002...).
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
                    Tous nos résultats sont publics sur ce site. Consultez notre ROI, nos stats par bookmaker et notre évolution en temps réel.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Final */}
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl shadow-2xl p-8 text-white text-center transform transition hover:scale-105 hover:shadow-3xl">
            <h3 className="text-3xl font-bold mb-4">Prêt à parier intelligemment ?</h3>
            <p className="text-xl mb-6">
              Arrêtez de perdre du temps avec des cotes sans valeur. Rejoignez-nous et ne jouez plus QUE les vraies opportunités !
            </p>
            <button 
              onClick={() => router.push('/abonnement')}
              className="bg-white text-green-600 px-8 py-4 rounded-lg text-xl font-bold hover:bg-gray-100 transition transform hover:scale-110"
            >
              S'abonner aux Cotes Boostées 2026 🚀
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}