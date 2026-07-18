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

            {/* Message de clôture des abonnements */}
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-8 text-white text-center">
              <div className="text-5xl mb-4">🙏</div>
              <h2 className="text-2xl font-bold mb-4">Les abonnements sont désormais terminés</h2>
              <p className="text-lg opacity-95 leading-relaxed mb-2">
                Les inscriptions à l'abonnement Telegram CB 2026 sont désormais clôturées.
              </p>
              <p className="text-lg opacity-95 leading-relaxed">
                Nous remercions chaleureusement tous les visiteurs pour l'intérêt porté à Cotes Boostées.
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