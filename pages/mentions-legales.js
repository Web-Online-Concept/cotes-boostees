import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BottomBar from '../components/BottomBar';

export default function MentionsLegalesPage() {
  return (
    <>
      <Head>
        <title>Mentions Légales | Cotes-Boostées.com Informations Légales</title>
        <meta name="description" content="Mentions légales de Cotes-Boostées.com : éditeur, hébergeur, propriété intellectuelle et informations légales." />
        <meta name="robots" content="index, follow" />
        
        <link rel="canonical" href="https://www.cotes-boostees.com/mentions-legales" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col pb-20 lg:pb-0">
        <Header currentPage="mentions" />

        <div className="max-w-4xl mx-auto px-4 py-8 flex-1">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-6 text-center">
              MENTIONS LÉGALES
            </h1>
            <p className="text-center text-gray-600 mb-8">www.cotes-boostees.com</p>

            <div className="prose prose-lg max-w-none space-y-6 text-gray-700">
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Éditeur du site</h2>
              <p>
                Le site www.cotes-boostees.com est édité par la société Web Online Concept, auto-entreprise, domiciliée à 
                rue Paul Estival, 31200 Toulouse, contact :{' '}
                <a href="mailto:web.online.concept@gmail.com" className="text-indigo-600 hover:underline">
                  web.online.concept@gmail.com
                </a>
                .
              </p>
              <p>Numéro SIRET (RCS) : 510 583 800.</p>
              <p>Directeur de la publication : Florent R.</p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Hébergement</h2>
              <p>
                Le site est hébergé par <strong>Vercel Inc.</strong>, situé à 440 N Barranca Ave #4133, Covina, CA 91723, 
                États-Unis.
              </p>
              <p>
                Le code source du site est hébergé sur <strong>GitHub Inc.</strong>, situé à 88 Colin P Kelly Jr St, 
                San Francisco, CA 94107, États-Unis.
              </p>
              <p>
                Le nom de domaine www.cotes-boostees.com est enregistré et géré par <strong>GoDaddy</strong>, 
                situé à 14455 N Hayden Rd, Scottsdale, AZ 85260, États-Unis.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Objet du site</h2>
              <p>
                www.cotes-boostees.com est une plateforme informative dédiée à la sélection et à la présentation de cotes 
                boostées dans le domaine des paris sportifs. Notre service vise à partager des analyses et des suggestions 
                via notre site web, notre canal et groupe Telegram, basées sur des données disponibles, dans un but purement 
                informatif et divertissant.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                Absence de garantie et limitation de responsabilité
              </h2>
              <p>
                www.cotes-boostees.com ne propose aucun conseil financier ou juridique et ne peut être tenu responsable des 
                décisions prises par les utilisateurs sur la base des informations fournies. Les cotes boostées présentées 
                sont sélectionnées à titre indicatif et ne constituent en aucun cas une incitation ou une garantie de gains. 
                Les paris sportifs comportent des risques financiers importants, incluant la perte totale des mises, et 
                relèvent de la seule responsabilité des utilisateurs.
              </p>
              <p className="mt-4">
                Nous déclinons toute responsabilité quant aux pertes financières, matérielles ou immatérielles subies par 
                les abonnés ou visiteurs suite à l'utilisation des informations publiées sur le site. Chaque utilisateur est 
                tenu de vérifier la légalité des paris sportifs dans son pays de résidence et de respecter les lois en vigueur.
              </p>
              <p className="mt-4">
                Les performances passées des cotes boostées ne préjugent pas des résultats futurs. www.cotes-boostees.com 
                ne contrôle pas les plateformes de paris et n'est pas affilié à celles-ci, sauf mention explicite contraire.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Propriété intellectuelle</h2>
              <p>
                L'ensemble des contenus (textes, images, logos, etc.) présents sur www.cotes-boostees.com est protégé par 
                le droit de la propriété intellectuelle. Toute reproduction, modification ou utilisation sans autorisation 
                préalable est strictement interdite.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Données personnelles</h2>
              <p>
                www.cotes-boostees.com s'engage à respecter la confidentialité des données personnelles collectées, 
                conformément au Règlement Général sur la Protection des Données (RGPD). Pour plus d'informations, consultez 
                notre{' '}
                <a href="/politique-confidentialite" className="text-indigo-600 hover:underline">
                  Politique de confidentialité
                </a>
                . Les utilisateurs disposent d'un droit d'accès, de rectification et de suppression de leurs données en nous 
                contactant.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Conditions d'utilisation</h2>
              <p>
                L'accès et l'utilisation du site, du canal et du groupe Telegram impliquent l'acceptation sans réserve des 
                présentes mentions légales. www.cotes-boostees.com se réserve le droit de modifier ou suspendre leurs accès 
                au site à tout moment, sans préavis ni indemnité.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Litiges</h2>
              <p>
                Tout différend lié à l'utilisation du site sera soumis aux lois en vigueur en France et aux tribunaux 
                compétents de Toulouse (31).
              </p>
            </div>
          </div>
        </div>

        <Footer />
        <BottomBar currentPage="" />
      </div>
    </>
  );
}