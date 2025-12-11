import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function ContactConfirmationPage() {
  const router = useRouter();

  useEffect(() => {
    // Rediriger vers la page de contact après 10 secondes
    const timer = setTimeout(() => {
      router.push('/');
    }, 10000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <>
      <Head>
        <title>Message envoyé | Cotes-Boostées.com</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
        <Header />

        <div className="max-w-3xl mx-auto px-4 py-16 flex-1 flex items-center">
          <div className="bg-white rounded-xl shadow-2xl p-12 w-full text-center">
            {/* Icône de succès */}
            <div className="mb-6 flex justify-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>

            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Message bien reçu ! ✅
            </h1>

            <p className="text-xl text-gray-700 mb-6 leading-relaxed">
              Merci de nous avoir contacté. Nous avons bien reçu votre message et nous vous répondrons 
              dans les <strong>24 heures</strong>.
            </p>

            <div className="bg-indigo-50 border-l-4 border-indigo-500 p-6 mb-8 text-left rounded">
              <p className="text-gray-700 mb-2">
                <strong>📧 Une copie de votre message a été envoyée à votre adresse email.</strong>
              </p>
              <p className="text-sm text-gray-600">
                Si vous ne recevez pas de réponse sous 24h, pensez à vérifier vos spams ou contactez-nous 
                directement à{' '}
                <a href="mailto:cotes.boostees@gmail.com" className="text-indigo-600 hover:underline font-semibold">
                  cotes.boostees@gmail.com
                </a>
              </p>
            </div>

            {/* Boutons d'action */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/">
                <button className="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 transition font-bold">
                  Retour à l'accueil
                </button>
              </Link>
              <Link href="/abonnement">
                <button className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition font-bold">
                  Découvrir nos offres
                </button>
              </Link>
            </div>

            <p className="text-sm text-gray-500 mt-8">
              Redirection automatique vers l'accueil dans 10 secondes...
            </p>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}