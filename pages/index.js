import { useState } from 'react';
import Header from '../components/Header';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Navigation currentPage="accueil" />

      {/* Video de fond */}
      <div className="relative w-full" style={{ height: 'calc(100vh - 140px)' }}>
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/video_accueil_cb.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      </div>

      {/* Contenu principal */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-100">
        {/* Section Hero */}
        <section className="max-w-7xl mx-auto px-4 py-16 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Les Cotes Boostees a Valeur Positive
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-8">
            Nous selectionnons uniquement les cotes boostees qui presentent une esperance de gain positive (EV+). 
            Pas de paris aleatoires, que des opportunites mathematiquement avantageuses.
          </p>
        </section>

        {/* 3 cartes de caracteristiques */}
        <section className="max-w-7xl mx-auto px-4 pb-16">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl hover:scale-105 transition-all duration-300">
              <div className="text-5xl mb-4">🎯</div>
              <h3 className="text-2xl font-bold text-indigo-600 mb-3">Selection Expert</h3>
              <p className="text-gray-600">
                Chaque cote boostee est analysee pour garantir une esperance de gain positive. 
                Seules les meilleures opportunites sont retenues.
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl hover:scale-105 transition-all duration-300">
              <div className="text-5xl mb-4">💎</div>
              <h3 className="text-2xl font-bold text-indigo-600 mb-3">Transparence Absolue</h3>
              <p className="text-gray-600">
                Tous nos resultats sont publics et horodates. Consultez librement nos statistiques 
                et verifiez notre performance reelle.
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl hover:scale-105 transition-all duration-300">
              <div className="text-5xl mb-4">📈</div>
              <h3 className="text-2xl font-bold text-indigo-600 mb-3">Que de la Valeur</h3>
              <p className="text-gray-600">
                Nous ne publions que les CB avec une vraie valeur mathematique. 
                Pas de volume pour le volume, uniquement de la qualite.
              </p>
            </div>
          </div>
        </section>

        {/* Section Ce que nous selectionnons / ecartons */}
        <section className="max-w-7xl mx-auto px-4 pb-16">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-500 rounded-xl shadow-lg p-8 hover:shadow-2xl hover:translate-x-2 transition-all duration-300">
              <h3 className="text-2xl font-bold text-green-700 mb-4 flex items-center gap-2">
                <span className="text-3xl">✅</span>
                Ce que nous SELECTIONNONS
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">•</span>
                  Cotes boostees avec esperance de gain positive (EV+)
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">•</span>
                  Analyse mathematique rigoureuse de chaque opportunite
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">•</span>
                  Bookmakers ARJEL fiables et reconnus
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">•</span>
                  Transparence totale sur tous les resultats
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-500 rounded-xl shadow-lg p-8 hover:shadow-2xl hover:translate-x-2 transition-all duration-300">
              <h3 className="text-2xl font-bold text-red-700 mb-4 flex items-center gap-2">
                <span className="text-3xl">❌</span>
                Ce que nous ECARTONS
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">•</span>
                  Cotes boostees sans valeur reelle (EV = 0 ou negatif)
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">•</span>
                  Paris "marketing" sans avantage mathematique
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">•</span>
                  Volume pour le volume sans analyse
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">•</span>
                  Bookmakers peu fiables ou non regules
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section importance de la valeur */}
        <section className="bg-gradient-to-r from-purple-600 to-indigo-600 py-16">
          <div className="max-w-4xl mx-auto px-4 text-center text-white">
            <h3 className="text-3xl font-bold mb-6">Pourquoi la valeur est-elle si importante ?</h3>
            <p className="text-lg mb-4">
              Une cote boostee n'est pas automatiquement une bonne affaire. Beaucoup de CB sont en realite 
              des operations marketing sans avantage reel pour le parieur.
            </p>
            <p className="text-lg mb-4">
              Notre approche mathematique garantit que chaque CB selectionnee presente une <strong>esperance 
              de gain positive sur le long terme</strong>. C'est la seule facon de generer des profits durables.
            </p>
            <p className="text-lg font-semibold">
              🎲 Nous transformons le pari en investissement calcule.
            </p>
          </div>
        </section>

        {/* Section Comment ca marche */}
        <section className="max-w-7xl mx-auto px-4 py-16">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">Comment ca marche ?</h3>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-indigo-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow-lg">
                1
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">Abonnez-vous</h4>
              <p className="text-gray-600">
                Choisissez votre formule d'abonnement mensuel pour acceder a nos selections CB.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-indigo-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow-lg">
                2
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">Recevez l'acces Telegram</h4>
              <p className="text-gray-600">
                Rejoignez notre canal prive "CB 2026" et notre groupe pour echanger avec la communaute.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-indigo-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow-lg">
                3
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">Recevez les CB a valeur</h4>
              <p className="text-gray-600">
                Chaque CB selectionnee vous est envoyee en temps reel avec tous les details necessaires.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-indigo-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow-lg">
                4
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">Suivez les resultats</h4>
              <p className="text-gray-600">
                Consultez nos statistiques publiques et transparentes pour verifier notre performance.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="bg-gradient-to-r from-green-500 to-green-600 py-16">
          <div className="max-w-4xl mx-auto px-4 text-center text-white">
            <h3 className="text-4xl font-bold mb-6">Pret a parier intelligemment ?</h3>
            <p className="text-xl mb-8">
              Rejoignez les parieurs qui misent sur la valeur, pas sur le hasard.
            </p>
            <a href="/abonnement">
              <button className="bg-white text-green-600 px-12 py-4 rounded-xl hover:bg-gray-100 transition-all duration-300 font-bold shadow-2xl hover:shadow-3xl hover:scale-105 text-xl">
                Voir les formules d'abonnement →
              </button>
            </a>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}