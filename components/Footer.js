import { useState } from 'react';
import { Lock, X } from 'lucide-react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Footer() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });
      
      const data = await res.json();
      
      if (data.success) {
        setShowLoginModal(false);
        setPassword('');
        router.push('/admin');
      } else {
        alert('Mot de passe incorrect');
      }
    } catch (error) {
      console.error('Erreur login:', error);
      alert('Erreur de connexion');
    }
  };

  return (
    <>
      <footer className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="text-center space-y-3">
            <p className="text-gray-600 text-sm">&copy; 2026 Cotes-Boostées.com - Tous droits réservés</p>
            <p className="text-gray-500 text-sm">Suivi professionnel des cotes boostées</p>
            
            {/* Liens légaux */}
            <div className="flex items-center justify-center gap-4 text-xs text-gray-400">
              <Link href="/cgv" className="hover:text-gray-600 transition">
                CGV
              </Link>
              <span>•</span>
              <Link href="/mentions-legales" className="hover:text-gray-600 transition">
                Mentions légales
              </Link>
              <span>•</span>
              <Link href="/politique-confidentialite" className="hover:text-gray-600 transition">
                Confidentialité
              </Link>
              <span>•</span>
              <button
                onClick={() => setShowLoginModal(true)}
                className="hover:text-gray-600 transition"
              >
                Admin
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Modal de connexion */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full mx-4 relative">
            <button
              onClick={() => {
                setShowLoginModal(false);
                setPassword('');
              }}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>
            
            <div className="flex items-center justify-center mb-6">
              <Lock className="w-8 h-8 text-indigo-600 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900">Connexion Admin</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mot de passe
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                  placeholder="Entrez le mot de passe"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  autoFocus
                />
              </div>
              
              <button
                onClick={handleLogin}
                className="w-full bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 flex items-center justify-center gap-2 transition font-semibold"
              >
                <Lock className="w-5 h-5" />
                Se connecter
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}