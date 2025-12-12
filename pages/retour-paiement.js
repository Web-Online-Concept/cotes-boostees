import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BottomBar from '../components/BottomBar';

export default function RetourPaiement() {
  const router = useRouter();
  const [status, setStatus] = useState(null);

  useEffect(() => {
    // Déterminer le statut en fonction des paramètres URL
    const { st, tx, amt, cc, cm, item_number } = router.query;
    
    // PayPal renvoie 'Completed' dans le paramètre 'st' en cas de succès
    if (st === 'Completed' || tx) {
      setStatus('success');
    } else if (st === 'Failed' || st === 'Canceled') {
      setStatus('failure');
    } else {
      // Par défaut, on considère que c'est un succès si la page est chargée
      // (le client a été redirigé depuis PayPal)
      setStatus('success');
    }
  }, [router.query]);

  if (!status) {
    return (
      <div className="min-h-screen bg-white pb-20 lg:pb-0">
        <Header />
        <main className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-xl">Chargement...</p>
          </div>
        </main>
        <Footer />
        <BottomBar currentPage="" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pb-20 lg:pb-0">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          
          {status === 'success' ? (
            // PAGE DE SUCCÈS
            <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 border border-gray-200">
              <div className="text-center mb-8">
                <div className="inline-block p-4 bg-green-100 rounded-full mb-4">
                  <svg className="w-16 h-16 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                  🎉 Paiement réussi !
                </h1>
                <p className="text-xl text-gray-600">
                  Merci pour votre confiance
                </p>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 mb-8">
                <h2 className="text-xl font-bold text-gray-800 mb-4">✅ Prochaines étapes :</h2>
                <div className="space-y-3 text-gray-700">
                  <p className="flex items-start">
                    <span className="text-green-600 font-bold mr-2">1.</span>
                    <span>Vous allez recevoir un email de confirmation de PayPal</span>
                  </p>
                  <p className="flex items-start">
                    <span className="text-green-600 font-bold mr-2">2.</span>
                    <span>Sous <strong>12 heures maximum</strong>, nous vous enverrons par email les liens d'accès à notre groupe Telegram privé CB 2026</span>
                  </p>
                  <p className="flex items-start">
                    <span className="text-green-600 font-bold mr-2">3.</span>
                    <span>Vous recevrez toutes nos cotes boostées en temps réel directement sur Telegram</span>
                  </p>
                </div>
              </div>

              <div className="bg-blue-50 rounded-xl p-6 mb-8">
                <h3 className="font-bold text-gray-800 mb-2">📧 Vérifiez vos emails :</h3>
                <p className="text-gray-700">
                  Si vous ne recevez pas nos accès sous 12h, vérifiez vos spams ou contactez-nous à : 
                  <a href="mailto:cotes.boostees@gmail.com" className="text-indigo-600 font-semibold ml-1 hover:underline">
                    cotes.boostees@gmail.com
                  </a>
                </p>
              </div>

              <div className="flex justify-center">
                <Link href="/" className="inline-block bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 text-center">
                  Retour à l'accueil
                </Link>
              </div>
            </div>
          ) : (
            // PAGE D'ÉCHEC
            <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 border border-gray-200">
              <div className="text-center mb-8">
                <div className="inline-block p-4 bg-red-100 rounded-full mb-4">
                  <svg className="w-16 h-16 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                  ❌ Paiement non abouti
                </h1>
                <p className="text-xl text-gray-600">
                  Le paiement n'a pas pu être finalisé
                </p>
              </div>

              <div className="bg-red-50 rounded-xl p-6 mb-8">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Que s'est-il passé ?</h2>
                <p className="text-gray-700 mb-4">
                  Votre paiement a été annulé ou n'a pas pu être traité par PayPal.
                </p>
                <p className="text-gray-700">
                  Cela peut arriver pour plusieurs raisons :
                </p>
                <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
                  <li>Vous avez annulé le paiement</li>
                  <li>Problème avec votre moyen de paiement</li>
                  <li>Erreur de connexion</li>
                </ul>
              </div>

              <div className="bg-blue-50 rounded-xl p-6 mb-8">
                <h3 className="font-bold text-gray-800 mb-2">💡 Besoin d'aide ?</h3>
                <p className="text-gray-700">
                  N'hésitez pas à nous contacter si vous rencontrez des difficultés : 
                  <a href="mailto:cotes.boostees@gmail.com" className="text-indigo-600 font-semibold ml-1 hover:underline">
                    cotes.boostees@gmail.com
                  </a>
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/abonnement" className="inline-block bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 text-center">
                  Réessayer le paiement
                </Link>
                <Link href="/" className="inline-block bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 border-2 border-indigo-600 transition-all duration-300 text-center">
                  Retour à l'accueil
                </Link>
              </div>
            </div>
          )}

        </div>
      </main>

      <Footer />
      <BottomBar currentPage="" />
    </div>
  );
}