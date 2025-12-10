import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Script from 'next/script';
import Header from '../components/Header';
import Footer from '../components/Footer';

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
      <Script
        src="https://www.paypal.com/sdk/js?client-id=BAAyGY891j1-xPHRbB7F4fWvVNwMca1Jdbuf2jVxLB5KC2a-7GjyT2LYLeMs0Grb174sluulT9xH9fd9VM&components=hosted-buttons&disable-funding=venmo&currency=EUR"
        onLoad={() => setPaypalLoaded(true)}
      />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
        <Header currentPage="abonnement" />

        <div className="max-w-4xl mx-auto px-4 py-8 flex-1">
          <div className="bg-white rounded-xl shadow-2xl p-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-6 text-center">
              Abonnement Telegram CB 2026
            </h1>

            {/* Prix */}
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl p-6 mb-8 text-white text-center">
              <div className="text-5xl font-bold mb-2">100 €</div>
              <div className="text-xl font-semibold">Abonnement annuel 2026</div>
              <p className="text-sm mt-2 opacity-90">Accès jusqu'au 31 décembre 2026</p>
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
                <div className="text-center">
                  <div id="paypal-container-YJXASTHAJTYYE" className="flex justify-center" />
                </div>

                <button
                  onClick={() => setIsSubmitted(false)}
                  className="w-full bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition"
                >
                  ← Modifier mes informations
                </button>
              </div>
            )}

            {/* Description du service - DÉPLACÉ ICI */}
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
      </div>
    </>
  );
}