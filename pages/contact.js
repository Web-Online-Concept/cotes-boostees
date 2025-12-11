import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function ContactPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    objet: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.nom.trim()) {
      newErrors.nom = 'Le nom est requis';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est requis';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email invalide';
    }

    if (!formData.objet.trim()) {
      newErrors.objet = 'L\'objet est requis';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Le message est requis';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Le message doit contenir au moins 10 caractères';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        router.push('/contact-confirmation');
      } else {
        const data = await res.json();
        setErrors({ submit: data.message || 'Erreur lors de l\'envoi' });
        setLoading(false);
      }
    } catch (error) {
      console.error('Erreur:', error);
      setErrors({ submit: 'Erreur de connexion au serveur' });
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Effacer l'erreur du champ modifié
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <>
      <Head>
        <title>Nous Contacter | Cotes-Boostées.com</title>
        <meta name="description" content="Une question sur nos cotes boostées ? Contactez-nous via notre formulaire. Réponse sous 24h." />
        <meta name="robots" content="index, follow" />
        
        <link rel="canonical" href="https://www.cotes-boostees.com/contact" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
        <Header currentPage="contact" />

        <div className="max-w-3xl mx-auto px-4 py-8 flex-1">
          <div className="bg-white rounded-xl shadow-2xl p-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-6 text-center">
              Nous Contacter
            </h1>

            <div className="bg-indigo-50 border-l-4 border-indigo-500 p-4 mb-8 rounded">
              <p className="text-gray-700">
                <strong>📧 Une question ?</strong> Remplissez le formulaire ci-dessous et nous vous répondrons 
                dans les <strong>24 heures</strong>.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Nom */}
              <div>
                <label htmlFor="nom" className="block text-sm font-medium text-gray-700 mb-2">
                  Nom complet <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="nom"
                  name="nom"
                  value={formData.nom}
                  onChange={handleChange}
                  placeholder="Votre nom"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none ${
                    errors.nom ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.nom && (
                  <p className="text-red-500 text-sm mt-1">{errors.nom}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Adresse email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="votre@email.com"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              {/* Objet */}
              <div>
                <label htmlFor="objet" className="block text-sm font-medium text-gray-700 mb-2">
                  Objet <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="objet"
                  name="objet"
                  value={formData.objet}
                  onChange={handleChange}
                  placeholder="Objet de votre message"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none ${
                    errors.objet ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.objet && (
                  <p className="text-red-500 text-sm mt-1">{errors.objet}</p>
                )}
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Votre message (minimum 10 caractères)"
                  rows="6"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-none ${
                    errors.message ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                )}
              </div>

              {/* Erreur globale */}
              {errors.submit && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                  {errors.submit}
                </div>
              )}

              {/* Bouton submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-indigo-600 text-white px-6 py-4 rounded-lg hover:bg-indigo-700 transition font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Envoi en cours...' : 'Envoyer le message 📧'}
              </button>
            </form>

            {/* Informations complémentaires */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Autres moyens de nous contacter</h2>
              <div className="space-y-3 text-gray-700">
                <p>
                  <strong>📧 Email direct :</strong>{' '}
                  <a href="mailto:cotes.boostees@gmail.com" className="text-indigo-600 hover:underline">
                    cotes.boostees@gmail.com
                  </a>
                </p>
                <p className="text-sm text-gray-600">
                  Nous nous engageons à répondre à toutes vos questions dans un délai de 24 heures ouvrées.
                </p>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}