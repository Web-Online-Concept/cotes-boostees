import Header from '../components/Header';
import Footer from '../components/Footer';

export default function PolitiqueConfidentialitePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
      <Header currentPage="confidentialite" />

      <div className="max-w-4xl mx-auto px-4 py-8 flex-1">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-6 text-center">
            POLITIQUE DE CONFIDENTIALITÉ
          </h1>
          <p className="text-center text-gray-600 mb-8">www.cotes-boostees.com</p>
          <p className="text-sm text-gray-500 mb-8">Date de dernière mise à jour : 10 décembre 2024</p>

          <div className="prose prose-lg max-w-none space-y-6 text-gray-700">
            <p>
              Chez www.cotes-boostees.com, nous attachons une grande importance à la protection de vos données personnelles. 
              Cette Politique de confidentialité explique comment nous collectons, utilisons et protégeons les informations 
              que vous nous fournissez lors de l'utilisation de notre site et de nos services.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">1 – Responsable du traitement</h2>
            <p>
              Le responsable du traitement des données est :<br />
              Web Online Concept, auto-entreprise domiciliée Rue Paul Estival, 31200 Toulouse, contact :{' '}
              <a href="mailto:web.online.concept@gmail.com" className="text-indigo-600 hover:underline">
                web.online.concept@gmail.com
              </a>
              .
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">2 – Données collectées</h2>
            <p>
              Nous collectons les données suivantes lors de votre souscription à notre abonnement ou de votre navigation 
              sur le site :
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Données d'identification :</strong> nom, prénom (si fourni), adresse e-mail.
              </li>
              <li>
                <strong>Données de paiement :</strong> informations nécessaires au règlement de l'abonnement (ex : données 
                bancaires via notre prestataire de paiement sécurisé). Ces données ne sont pas stockées directement par nous, 
                mais gérées par notre prestataire de paiement (ex : Stripe, PayPal).
              </li>
              <li>
                <strong>Données de connexion :</strong> adresse IP, type de navigateur, pages visitées, horodatage (via des 
                cookies ou outils d'analyse, si applicable).
              </li>
              <li>
                <strong>Données d'interaction :</strong> messages envoyés dans le groupe Telegram (uniquement pour modération).
              </li>
            </ul>
            <p className="mt-4">
              Nous ne collectons aucune donnée sensible non nécessaire à la prestation de nos services.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">3 – Finalités du traitement</h2>
            <p>Vos données sont utilisées pour :</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Gérer votre abonnement (inscription, facturation, accès au canal et groupe Telegram).</li>
              <li>Vous envoyer des informations liées au service (notifications, mises à jour).</li>
              <li>Répondre à vos demandes via notre support (e-mail ou formulaire).</li>
              <li>Améliorer notre site et nos services (analyse anonyme de la navigation, si applicable).</li>
              <li>Respecter nos obligations légales (ex : conservation des factures).</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">4 – Base légale</h2>
            <p>Le traitement de vos données repose sur :</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>L'exécution du contrat :</strong> la gestion de votre abonnement (article 6.1.b du RGPD).
              </li>
              <li>
                <strong>Votre consentement :</strong> pour les communications non essentielles ou l'utilisation de cookies 
                non nécessaires, si applicable (article 6.1.a du RGPD).
              </li>
              <li>
                <strong>Nos obligations légales :</strong> conservation des données comptables (article 6.1.c du RGPD).
              </li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">5 – Destinataires des données</h2>
            <p>Vos données ne sont transmises qu'aux parties suivantes :</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Le Prestataire et son équipe interne pour la gestion du service.</li>
              <li>
                Nos prestataires techniques : Vercel (hébergement), GitHub (code source), PayPal (paiement), Telegram 
                (pour le canal et groupe).
              </li>
              <li>Les autorités compétentes en cas d'obligation légale.</li>
            </ul>
            <p className="mt-4">Aucun tiers non essentiel n'a accès à vos données personnelles.</p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">6 – Durée de conservation</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Données d'abonnement :</strong> conservées pendant la durée de votre abonnement, puis supprimées 
                dans un délai de 6 mois après son expiration, sauf obligation légale contraire.
              </li>
              <li>
                <strong>Données de paiement :</strong> conservées le temps de la transaction par notre prestataire de 
                paiement ; les factures sont archivées 10 ans conformément à la loi française.
              </li>
              <li>
                <strong>Données de navigation :</strong> conservées jusqu'à 12 mois (si cookies ou outils d'analyse utilisés).
              </li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">7 – Sécurité des données</h2>
            <p>
              Nous mettons en œuvre des mesures techniques et organisationnelles pour protéger vos données contre tout accès 
              non autorisé, perte ou altération (ex : chiffrement des paiements, accès restreint aux données). Cependant, 
              aucune transmission sur Internet n'est totalement sécurisée ; nous ne pouvons garantir une protection absolue.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">8 – Transferts hors UE</h2>
            <p>
              Certaines données peuvent être transférées hors de l'Union européenne par Telegram (serveurs aux États-Unis 
              ou ailleurs). Telegram applique ses propres politiques de confidentialité, que nous vous invitons à consulter. 
              Nous nous assurons que tout transfert respecte les clauses contractuelles types ou autres garanties du RGPD.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">9 – Vos droits</h2>
            <p>Conformément au RGPD, vous disposez des droits suivants :</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Droit d'accès :</strong> consulter les données que nous détenons sur vous.</li>
              <li><strong>Droit de rectification :</strong> demander la correction de données inexactes.</li>
              <li>
                <strong>Droit à l'effacement :</strong> demander la suppression de vos données, sauf obligation légale.
              </li>
              <li>
                <strong>Droit à la limitation :</strong> limiter l'utilisation de vos données dans certains cas.
              </li>
              <li>
                <strong>Droit d'opposition :</strong> vous opposer au traitement pour des raisons légitimes.
              </li>
              <li>
                <strong>Droit à la portabilité :</strong> recevoir vos données dans un format structuré.
              </li>
            </ul>
            <p className="mt-4">
              Pour exercer ces droits, contactez-nous à{' '}
              <a href="mailto:cotes.boostees@gmail.com" className="text-indigo-600 hover:underline">
                cotes.boostees@gmail.com
              </a>{' '}
              avec une preuve d'identité. Nous répondrons dans un délai d'un mois, extensible à trois mois en cas de demande 
              complexe. Vous pouvez également porter plainte auprès de la CNIL (
              <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">
                www.cnil.fr
              </a>
              ) si vous estimez que vos droits ne sont pas respectés.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">10 – Cookies (si applicable)</h2>
            <p>
              Si notre site utilise des cookies (ex : Google Analytics), ils servent à analyser le trafic de manière anonyme. 
              Vous pouvez les refuser via les paramètres de votre navigateur ou un bandeau de consentement lors de votre 
              première visite.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">11 – Modification de la politique</h2>
            <p>
              Nous nous réservons le droit de modifier cette Politique de confidentialité. Toute mise à jour sera publiée 
              sur cette page avec une nouvelle date. En cas de changement significatif, les abonnés seront informés par 
              e-mail ou notification.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">12 – Contact</h2>
            <p>
              Pour toute question, contactez-nous à{' '}
              <a href="mailto:cotes.boostees@gmail.com" className="text-indigo-600 hover:underline">
                cotes.boostees@gmail.com
              </a>{' '}
              ou via notre formulaire de contact sur www.cotes-boostees.com.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}