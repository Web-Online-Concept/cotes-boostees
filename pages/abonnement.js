import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Script from 'next/script';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BottomBar from '../components/BottomBar';

export default function AbonnementPage() {
  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [paypalLoaded, setPaypalLoaded] = useState(false);
  const router = useRouter();

  // Charger le bouton PayPal après soumission
  useEffect(() => {
    if (isSubmitted && paypalLoaded && window.paypal) {
      // Nettoyer l'ancien bouton
      const container = document.getElementById('paypal-container-YJXASTHAJTYYE');
      if (container) {
        container.innerHTML = '';
      }
      
      // Rendre le nouveau bouton
      window.paypal.HostedButtons({
        hostedButtonId: "YJXASTHAJTYYE"
      }).render("#paypal-container-YJXASTHAJTYYE");
    }
  }, [isSubmitted, paypalLoaded]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!nom || !email) {
      setError('Veuillez remplir tous les champs');
      setLoading(false);
      return;
    }

    // Validation email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Veuillez entrer une adresse email valide');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/abonnes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nom, email, statut_paiement: 'en_attente' })
      });

      const data = await res.json();

      if (res.ok) {
        setIsSubmitted(true);
        setLoading(false);
      } else {
        setError(data.message || 'Erreur lors de l\'enregistrement');
        setLoading(false);
      }
    } catch (error) {
      console.error('Erreur:', error);
      setError('Erreur de connexion au serveur');
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Abonnement Telegram CB 2026 | Accès Annuel Cotes Boostées</title>
        <meta name="description" content="Abonnez-vous et accédez à notre canal et groupe Telegram privés CB 2026. Recevez quotidiennement les meilleures cotes boostées EV+ sélectionnées par nos experts." />
        <meta name="keywords" content="abonnement cotes boostées, telegram paris sportifs, canal privé CB, groupe telegram paris, abonnement 2026" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Abonnement Telegram CB 2026 | Accès Annuel" />
        <meta property="og:description" content="Abonnement annuel pour accéder à nos sélections quotidiennes de cotes boostées EV+." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.cotes-boostees.com/abonnement" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Abonnement CB 2026 | Accès Annuel" />
        <meta name="twitter:description" content="Accédez à nos sélections quotidiennes de cotes boostées." />
        
        <link rel="canonical" href="https://www.cotes-boostees.com/abonnement" />
      </Head>

      <Script
        src="https://www.paypal.com/sdk/js?client-id=BAAyGY891j1-xPHRbB7F4fWvVNwMca1Jdbuf2jVxLB5KC2a-7GjyT2LYLeMs0Grb174sluulT9xH9fd9VM&components=hosted-buttons&disable-funding=venmo&currency=EUR"
        onLoad={() => setPaypalLoaded(true)}
      />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col pb-20 lg:pb-0">
        <Header currentPage="abonnement" />

        <div className="max-w-4xl mx-auto px-4 py-8 flex-1">
          <div className="bg-white rounded-xl shadow-2xl p-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-6 text-center">
              Abonnement Telegram CB 2026
            </h1>

            {/* Prix */}
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl p-6 mb-8 text-white text-center">
              <div className="text-5xl font-bold mb-2">120 €</div>
              <div className="text-xl font-semibold">Abonnement annuel 2026</div>
              <p className="text-sm mt-2 opacity-90">Accès du 1er Janvier au 31 décembre 2026</p>
            </div>

            {/* Formulaire ou Bouton PayPal */}
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nom complet <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={nom}
                    onChange={(e) => setNom(e.target.value)}
                    placeholder="Votre nom"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Adresse email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="votre@email.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Vous recevrez vos accès Telegram à cette adresse après validation du paiement.
                  </p>
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-indigo-600 text-white px-6 py-4 rounded-lg hover:bg-indigo-700 transition font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Enregistrement...' : 'Continuer vers le paiement →'}
                </button>
              </form>
            ) : (
              <div className="space-y-6">
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-center">
                  <p className="font-semibold">✅ Vos informations ont été enregistrées !</p>
                  <p className="text-sm mt-1">Procédez maintenant au paiement sécurisé via PayPal.</p>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-700 font-medium">Nom :</span>
                    <span className="text-gray-900 font-semibold">{nom}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 font-medium">Email :</span>
                    <span className="text-gray-900 font-semibold">{email}</span>
                  </div>
                </div>

                {/* Bouton PayPal */}
                <div className="flex justify-center py-4">
                  <div id="paypal-container-YJXASTHAJTYYE" style={{ minWidth: '400px', maxWidth: '500px', width: '100%' }} />
                </div>

                <button
                  onClick={() => setIsSubmitted(false)}
                  className="w-full bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition"
                >
                  ← Modifier mes informations
                </button>
              </div>
            )}

            {/* NOUVEAU - Bloc explicatif des tarifs dégressifs */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-300 rounded-lg p-6 mt-8">
              <h2 className="text-2xl font-bold text-purple-900 mb-4 flex items-center gap-2">
                <span className="text-3xl">💰</span>
                Tarifs dégressifs 2026
              </h2>
              
              <p className="text-gray-700 mb-4 leading-relaxed">
                L'abonnement CB 2026 donne accès à toutes nos sélections <strong>du 1er janvier au 31 décembre 2026</strong>, 
                quelle que soit votre date de souscription. Le tarif est calculé au prorata : <strong>10€ par mois restant</strong>.
              </p>

              <div className="bg-white rounded-lg p-4 shadow-md">
                <h3 className="font-bold text-gray-900 mb-3 text-center">Tarifs par mois de souscription :</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  <div className="text-center p-2 bg-gray-50 rounded">
                    <div className="font-semibold text-indigo-600">Janvier</div>
                    <div className="text-lg font-bold">120 €</div>
                    <div className="text-xs text-gray-500">12 mois</div>
                  </div>
                  <div className="text-center p-2 bg-gray-50 rounded">
                    <div className="font-semibold text-indigo-600">Février</div>
                    <div className="text-lg font-bold">110 €</div>
                    <div className="text-xs text-gray-500">11 mois</div>
                  </div>
                  <div className="text-center p-2 bg-gray-50 rounded">
                    <div className="font-semibold text-indigo-600">Mars</div>
                    <div className="text-lg font-bold">100 €</div>
                    <div className="text-xs text-gray-500">10 mois</div>
                  </div>
                  <div className="text-center p-2 bg-gray-50 rounded">
                    <div className="font-semibold text-indigo-600">Avril</div>
                    <div className="text-lg font-bold">90 €</div>
                    <div className="text-xs text-gray-500">9 mois</div>
                  </div>
                  <div className="text-center p-2 bg-gray-50 rounded">
                    <div className="font-semibold text-indigo-600">Mai</div>
                    <div className="text-lg font-bold">80 €</div>
                    <div className="text-xs text-gray-500">8 mois</div>
                  </div>
                  <div className="text-center p-2 bg-gray-50 rounded">
                    <div className="font-semibold text-indigo-600">Juin</div>
                    <div className="text-lg font-bold">70 €</div>
                    <div className="text-xs text-gray-500">7 mois</div>
                  </div>
                  <div className="text-center p-2 bg-gray-50 rounded">
                    <div className="font-semibold text-indigo-600">Juillet</div>
                    <div className="text-lg font-bold">60 €</div>
                    <div className="text-xs text-gray-500">6 mois</div>
                  </div>
                  <div className="text-center p-2 bg-gray-50 rounded">
                    <div className="font-semibold text-indigo-600">Août</div>
                    <div className="text-lg font-bold">50 €</div>
                    <div className="text-xs text-gray-500">5 mois</div>
                  </div>
                  <div className="text-center p-2 bg-gray-50 rounded">
                    <div className="font-semibold text-indigo-600">Septembre</div>
                    <div className="text-lg font-bold">40 €</div>
                    <div className="text-xs text-gray-500">4 mois</div>
                  </div>
                  <div className="text-center p-2 bg-gray-50 rounded">
                    <div className="font-semibold text-indigo-600">Octobre</div>
                    <div className="text-lg font-bold">30 €</div>
                    <div className="text-xs text-gray-500">3 mois</div>
                  </div>
                  <div className="text-center p-2 bg-gray-50 rounded">
                    <div className="font-semibold text-indigo-600">Novembre</div>
                    <div className="text-lg font-bold">20 €</div>
                    <div className="text-xs text-gray-500">2 mois</div>
                  </div>
                  <div className="text-center p-2 bg-gray-50 rounded">
                    <div className="font-semibold text-indigo-600">Décembre</div>
                    <div className="text-lg font-bold">10 €</div>
                    <div className="text-xs text-gray-500">1 mois</div>
                  </div>
                </div>
              </div>

              <div className="mt-4 bg-purple-100 border-l-4 border-purple-500 p-4 rounded">
                <p className="text-sm text-gray-700">
                  <strong>💡 Exemple :</strong> Si vous vous abonnez en mars, vous payez 100€ et bénéficiez de toutes les CB 
                  de mars à décembre 2026 (10 mois complets).
                </p>
              </div>
            </div>

            {/* Comment ça marche */}
            <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6 mt-8">
              <h2 className="text-2xl font-bold text-blue-900 mb-4 flex items-center gap-2">
                <span className="text-3xl">🔄</span>
                Comment ça marche ?
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    1
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Remplissez le formulaire</h3>
                    <p className="text-sm text-gray-700">
                      Saisissez vos informations (nom et email) puis cliquez sur "Continuer vers le paiement".
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    2
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Effectuez le paiement sécurisé</h3>
                    <p className="text-sm text-gray-700">
                      Procédez au paiement demandé via PayPal en toute sécurité.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    3
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Recevez vos accès sous 12h</h3>
                    <p className="text-sm text-gray-700">
                      Après validation du paiement, vous recevrez <strong>dans les 12 heures</strong> via votre adresse email :
                    </p>
                    <ul className="list-disc pl-5 mt-2 space-y-1 text-sm text-gray-700">
                      <li>Une confirmation de votre abonnement</li>
                      <li>Le lien d'accès au <strong>Canal Telegram CB 2026</strong></li>
                      <li>Le lien d'accès au <strong>Groupe Telegram CB 2026</strong></li>
                    </ul>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    ✓
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">C'est parti !</h3>
                    <p className="text-sm text-gray-700">
                      Intégrez immédiatement le canal et le groupe pour commencer à recevoir nos sélections quotidiennes de cotes boostées EV+.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4 bg-white border-l-4 border-blue-600 p-4 rounded">
                <p className="text-xs text-gray-600">
                  <strong>📧 Astuce :</strong> Pensez à vérifier vos spams si vous ne recevez pas l'email dans les 12h. 
                  En cas de problème, contactez-nous à{' '}
                  <a href="mailto:cotes.boostees@gmail.com" className="text-blue-600 hover:underline font-semibold">
                    cotes.boostees@gmail.com
                  </a>
                </p>
              </div>
            </div>

            {/* Description du service */}
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-6 mt-8">
              <h2 className="text-2xl font-bold text-indigo-900 mb-4">🎯 Rejoignez notre communauté exclusive</h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                En vous abonnant, vous accédez à notre <strong>canal et groupe privés Telegram CB 2026</strong> où nous 
                partageons quotidiennement les meilleures cotes boostées à valeur positive (EV+).
              </p>

              <div className="grid md:grid-cols-2 gap-4 mt-6">
                <div className="bg-white rounded-lg p-4 shadow">
                  <div className="text-2xl mb-2">✅</div>
                  <h3 className="font-bold text-gray-900 mb-2">Sélection experte quotidienne</h3>
                  <p className="text-sm text-gray-600">
                    Uniquement les CB avec une vraie valeur mathématique, analysées et vérifiées par nos experts.
                  </p>
                </div>

                <div className="bg-white rounded-lg p-4 shadow">
                  <div className="text-2xl mb-2">📊</div>
                  <h3 className="font-bold text-gray-900 mb-2">Transparence totale</h3>
                  <p className="text-sm text-gray-600">
                    Tous nos résultats sont publics. Consultez nos statistiques et notre ROI en temps réel.
                  </p>
                </div>

                <div className="bg-white rounded-lg p-4 shadow">
                  <div className="text-2xl mb-2">💬</div>
                  <h3 className="font-bold text-gray-900 mb-2">Groupe de discussion</h3>
                  <p className="text-sm text-gray-600">
                    Échangez avec la communauté, partagez vos analyses et bénéficiez de conseils.
                  </p>
                </div>

                <div className="bg-white rounded-lg p-4 shadow">
                  <div className="text-2xl mb-2">⚡</div>
                  <h3 className="font-bold text-gray-900 mb-2">Notifications instantanées</h3>
                  <p className="text-sm text-gray-600">
                    Recevez les CB en temps réel pour ne manquer aucune opportunité rentable.
                  </p>
                </div>
              </div>

              <div className="mt-6 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
                <p className="text-sm text-gray-700">
                  <strong>⚠️ Important :</strong> Notre approche est basée sur l'analyse mathématique et la sélection 
                  rigoureuse. Nous ne publions QUE les cotes à valeur positive. Pas de volume inutile, que de la qualité !
                </p>
              </div>
            </div>

            {/* Informations légales */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-xs text-gray-500 text-center">
                En procédant au paiement, vous acceptez nos{' '}
                <a href="/cgv" className="text-indigo-600 hover:underline">Conditions Générales de Vente</a> et notre{' '}
                <a href="/politique-confidentialite" className="text-indigo-600 hover:underline">Politique de confidentialité</a>.
              </p>
              <p className="text-xs text-gray-500 text-center mt-2">
                🔒 Paiement 100% sécurisé par PayPal
              </p>
            </div>
          </div>
        </div>

        <Footer />
        <BottomBar currentPage="abonnement" />
      </div>
    </>
  );
}