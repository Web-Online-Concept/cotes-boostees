import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function RetourPaiementPage() {
  const router = useRouter();
  const [statut, setStatut] = useState('loading'); // loading, success, cancel, error
  const [details, setDetails] = useState({});

  useEffect(() => {
    // Récupération des paramètres de retour PayPal
    const params = new URLSearchParams(window.location.search);
    
    // PayPal renvoie généralement ces paramètres
    const paymentId = params.get('paymentId') || params.get('token');
    const payerId = params.get('PayerID');
    const status = params.get('st'); // Success/Failure status
    
    // Détection du statut
    if (paymentId && payerId) {
      // Paiement probablement réussi
      setStatut('success');
      setDetails({
        paymentId,
        payerId
      });
    } else if (params.get('cancel') === 'true' || params.get('cancelled') === 'true') {
      // Paiement annulé
      setStatut('cancel');
    } else if (status === 'Completed' || status === 'Success') {
      // Paiement confirmé
      setStatut('success');
    } else if (paymentId && !payerId) {
      // Paiement en attente ou incomplet
      setStatut('cancel');
    } else {
      // Par défaut, on considère que c'est un succès si on arrive sur cette page
      setStatut('success');
    }
  }, []);

  if (statut === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Vérification de votre paiement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
      <Header currentPage="abonnement" />

      <div className="max-w-3xl mx-auto px-4 py-8 flex-1">
        {statut === 'success' ? (
          // PAIEMENT RÉUSSI
          <div className="bg-white rounded-xl shadow-2xl p-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>

            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              🎉 Paiement réussi !
            </h1>
            
            <p className="text-xl text-gray-700 mb-8">
              Merci pour votre abonnement aux Cotes Boostées 2026 !
            </p>

            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-6 mb-8 text-left">
              <h2 className="text-xl font-bold text-indigo-900 mb-4">📧 Prochaines étapes :</h2>
              <ol className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold">1</span>
                  <span>
                    <strong>Vérifiez votre boîte mail</strong> (y compris les spams) : vous recevrez vos liens d'accès 
                    au <strong>canal et groupe Telegram CB 2026</strong> dans les <strong>12 heures</strong> suivant votre paiement.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold">2</span>
                  <span>
                    <strong>Rejoignez le canal Telegram</strong> pour recevoir toutes nos sélections de cotes boostées en temps réel.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold">3</span>
                  <span>
                    <strong>Intégrez le groupe de discussion</strong> pour échanger avec la communauté et poser vos questions.
                  </span>
                </li>
              </ol>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 text-left">
              <p className="text-sm text-gray-700">
                <strong>⚠️ Important :</strong> Si vous ne recevez pas vos accès dans les 12 heures, contactez-nous à{' '}
                <a href="mailto:cotes.boostees@gmail.com" className="text-indigo-600 hover:underline font-semibold">
                  cotes.boostees@gmail.com
                </a>
              </p>
            </div>

            {details.paymentId && (
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <p className="text-xs text-gray-500">
                  Référence de transaction : <span className="font-mono font-semibold">{details.paymentId}</span>
                </p>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => router.push('/')}
                className="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 transition font-semibold"
              >
                Retour à l'accueil
              </button>
              <button
                onClick={() => router.push('/stats')}
                className="bg-white border-2 border-indigo-600 text-indigo-600 px-8 py-3 rounded-lg hover:bg-indigo-50 transition font-semibold"
              >
                Voir nos statistiques
              </button>
            </div>
          </div>
        ) : (
          // PAIEMENT ANNULÉ OU ÉCHOUÉ
          <div className="bg-white rounded-xl shadow-2xl p-8 text-center">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </div>

            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Paiement annulé
            </h1>
            
            <p className="text-xl text-gray-700 mb-8">
              Votre paiement n'a pas été finalisé.
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-400 p-6 mb-8 text-left">
              <h3 className="font-bold text-blue-900 mb-2">Que s'est-il passé ?</h3>
              <p className="text-gray-700 text-sm mb-3">
                Le paiement a été annulé ou n'a pas pu être complété. Cela peut arriver si :
              </p>
              <ul className="list-disc pl-5 space-y-1 text-gray-700 text-sm">
                <li>Vous avez annulé la transaction sur PayPal</li>
                <li>Le paiement a été refusé par votre banque</li>
                <li>Un problème technique s'est produit</li>
              </ul>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left">
              <h3 className="font-bold text-gray-900 mb-3">💡 Vous souhaitez réessayer ?</h3>
              <p className="text-gray-700 text-sm mb-4">
                Aucun problème ! Vos informations ont été sauvegardées. Vous pouvez retourner sur la page 
                d'abonnement et refaire le paiement.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => router.push('/abonnement')}
                className="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 transition font-semibold"
              >
                Réessayer le paiement
              </button>
              <button
                onClick={() => router.push('/')}
                className="bg-white border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-50 transition font-semibold"
              >
                Retour à l'accueil
              </button>
            </div>

            <p className="text-sm text-gray-500 mt-6">
              Besoin d'aide ? Contactez-nous à{' '}
              <a href="mailto:cotes.boostees@gmail.com" className="text-indigo-600 hover:underline font-semibold">
                cotes.boostees@gmail.com
              </a>
            </p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}