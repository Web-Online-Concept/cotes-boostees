import Header from '../components/Header';
import Footer from '../components/Footer';

export default function CGVPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
      <Header currentPage="cgv" />

      <div className="max-w-4xl mx-auto px-4 py-8 flex-1">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-6 text-center">
            CONDITIONS GÉNÉRALES DE VENTE
          </h1>
          <p className="text-center text-gray-600 mb-8">www.cotes-boostees.com</p>
          <p className="text-sm text-gray-500 mb-8">Date de dernière mise à jour : 10 décembre 2025</p>

          <div className="prose prose-lg max-w-none space-y-6 text-gray-700">
            <p>
              Les présentes Conditions Générales de Vente (ci-après « CGV ») régissent les relations contractuelles entre :
            </p>

            <ul className="list-disc pl-6 space-y-2">
              <li>
                Web Online Concept, auto-entreprise, domiciliée à rue Paul Estival, 31200 Toulouse, Siret 510 583 800, 
                ci-après dénommé(e) « le Prestataire »,
              </li>
              <li>
                Et toute personne physique ou morale souscrivant à un abonnement sur le site www.cotes-boostees.com, 
                ci-après dénommée « l'Abonné ».
              </li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Article 1 – Objet</h2>
            <p>
              Le Prestataire propose via le site www.cotes-boostees.com un service d'abonnement annuel donnant accès à 
              des informations sur des cotes boostées dans le domaine des paris sportifs, diffusées via un canal Telegram 
              et un groupe de discussion Telegram. Ce service est fourni à titre informatif et ne constitue ni un conseil 
              financier, ni une garantie de gains.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Article 2 – Description du service</h2>
            <p>L'abonnement annuel inclut :</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>L'accès à un canal Telegram dédié à la diffusion de cotes boostées sélectionnées par le Prestataire.</li>
              <li>L'accès à un groupe de discussion Telegram pour échanger sur les informations partagées.</li>
              <li>Une durée d'abonnement courant jusqu'au 31 décembre de l'année en cours, quelle que soit la date de souscription.</li>
            </ul>
            <p className="mt-4">
              Le contenu fourni est purement informatif. Le Prestataire ne garantit pas les résultats des paris effectués 
              par l'Abonné sur la base de ces informations.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Article 3 – Tarifs et modalités de paiement</h2>
            
            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">3.1. Tarif de l'abonnement</h3>
            <p>
              Le prix de l'abonnement est calculé de manière dégressive selon le mois de souscription, sur une base de 10 € 
              par mois restant jusqu'au 31 décembre de l'année en cours.
            </p>
            <p className="mt-4">Exemples :</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Souscription en janvier : 10 € x 12 mois = 120 €.</li>
              <li>Souscription en juillet : 10 € x 6 mois = 60 €.</li>
              <li>Souscription en décembre : 10 € x 1 mois = 10 €.</li>
            </ul>
            <p className="mt-4">Le montant total est payable en une seule fois lors de la souscription.</p>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">3.2. Modalités de paiement</h3>
            <p>
              Le paiement s'effectue en ligne via carte bancaire ou Paypal sur le site www.cotes-boostees.com. Un mail de 
              confirmation sera transmis à l'Abonné par e-mail dans les 12h suivant son paiement, avec les liens d'accès au 
              Canal et Groupe Telegram des Cotes Boostées.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">3.3. Devise</h3>
            <p>Les prix sont indiqués en euros (€), toutes taxes comprises (TTC), sauf mention contraire.</p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Article 4 – Durée et prise d'effet</h2>
            <p>
              L'abonnement débute dès validation du paiement et expire automatiquement le 31 décembre de l'année en cours, 
              sans reconduction tacite. L'Abonné recevra les identifiants d'accès au canal et au groupe Telegram dans un 
              délai maximum de 24 heures après la confirmation du paiement.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Article 5 – Obligations du Prestataire</h2>
            <p>Le Prestataire s'engage à :</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Fournir un accès continu aux services Telegram pendant la durée de l'abonnement, sauf en cas de force majeure 
                ou maintenance technique annoncée.
              </li>
              <li>Sélectionner et diffuser des cotes boostées selon ses propres critères d'analyse.</li>
            </ul>
            <p className="mt-4">
              Le Prestataire ne garantit aucun résultat financier découlant de l'utilisation des informations fournies.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Article 6 – Obligations de l'Abonné</h2>
            <p>L'Abonné s'engage à :</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Fournir des informations exactes lors de la souscription (nom, e-mail, etc.).</li>
              <li>
                Utiliser les services conformément à leur finalité informative, sans diffuser ou reproduire le contenu à des 
                fins commerciales ou publiques.
              </li>
              <li>
                Respecter les règles de bonne conduite dans le groupe Telegram (pas de spam, insultes, contenus illégaux, etc.).
              </li>
            </ul>
            <p className="mt-4">
              En cas de non-respect, le Prestataire se réserve le droit de suspendre ou résilier l'accès sans remboursement.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Article 7 – Droit de rétractation</h2>
            <p>
              Conformément à l'article L221-18 du Code de la consommation, l'Abonné dispose d'un délai de 14 jours calendaires 
              à compter de la souscription pour exercer son droit de rétractation, sans motif ni pénalité, sauf si le service a 
              été pleinement exécuté avant la fin de ce délai avec son accord exprès.
            </p>
            <p className="mt-4">
              Pour exercer ce droit, l'Abonné doit notifier sa décision par e-mail à{' '}
              <a href="mailto:cotes.boostees@gmail.com" className="text-indigo-600 hover:underline">
                cotes.boostees@gmail.com
              </a>{' '}
              ou via le formulaire de contact, en utilisant le modèle suivant :
            </p>
            <p className="italic bg-gray-50 p-4 rounded mt-4">
              « Je soussigné(e), [nom], notifie par la présente ma rétractation du contrat d'abonnement souscrit le [date] 
              sur www.cotes-boostees.com. »
            </p>
            <p className="mt-4">
              Le remboursement sera effectué dans un délai de 14 jours suivant la réception de la demande, par le même moyen 
              de paiement utilisé.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Article 8 – Responsabilité</h2>
            <p>
              Le Prestataire décline toute responsabilité en cas de pertes financières ou autres dommages subis par l'Abonné 
              suite à l'utilisation des informations fournies. Les paris sportifs comportent des risques inhérents, dont 
              l'Abonné assume l'entière responsabilité. Le Prestataire n'est pas affilié aux plateformes de paris et 
              n'intervient pas dans les transactions entre l'Abonné et ces plateformes.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Article 9 – Résiliation</h2>
            <p>Le Prestataire peut résilier l'abonnement sans préavis ni remboursement en cas de :</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Non-paiement.</li>
              <li>Comportement inapproprié dans le groupe Telegram.</li>
              <li>Violation des présentes CGV.</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Article 10 – Données personnelles</h2>
            <p>
              Les données collectées (nom, e-mail, etc.) sont utilisées uniquement pour la gestion de l'abonnement et ne sont 
              pas transmises à des tiers, sauf obligation légale. L'Abonné dispose d'un droit d'accès, de rectification et de 
              suppression de ses données, exerçable à{' '}
              <a href="mailto:cotes.boostees@gmail.com" className="text-indigo-600 hover:underline">
                cotes.boostees@gmail.com
              </a>
              . Voir notre{' '}
              <a href="/politique-confidentialite" className="text-indigo-600 hover:underline">
                Politique de confidentialité
              </a>
              .
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Article 11 – Force majeure</h2>
            <p>
              Le Prestataire ne pourra être tenu responsable en cas d'inexécution due à un événement de force majeure 
              (ex : panne technique, interruption de Telegram, catastrophe naturelle).
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Article 12 – Droit applicable et litiges</h2>
            <p>
              Les présentes CGV sont soumises au droit français. En cas de litige, une solution amiable sera recherchée. 
              À défaut, les tribunaux compétents de Toulouse (31) seront saisis.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Article 13 – Acceptation des CGV</h2>
            <p>
              La souscription à l'abonnement implique l'acceptation pleine et entière des présentes CGV par l'Abonné.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}