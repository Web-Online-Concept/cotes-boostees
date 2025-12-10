import { useState, useEffect } from 'react';
import { Home, BarChart3, Lock, Filter } from 'lucide-react';
import { useRouter } from 'next/router';

export default function Navigation({ currentPage }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const res = await fetch('/api/auth');
      const data = await res.json();
      setIsAuthenticated(data.authenticated);
    } catch (error) {
      console.error('Erreur auth:', error);
    }
  };

  const isActive = (page) => currentPage === page;

  return (
    <nav className="bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-center space-x-8">
          <button
            onClick={() => router.push('/')}
            className={`py-4 px-2 border-b-2 font-medium text-sm flex items-center gap-2 ${
              isActive('home')
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <Home className="w-4 h-4" />
            Accueil
          </button>
          <button
            onClick={() => router.push('/resultats')}
            className={`py-4 px-2 border-b-2 font-medium text-sm flex items-center gap-2 ${
              isActive('resultats')
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <Filter className="w-4 h-4" />
            Resultats
          </button>
          <button
            onClick={() => router.push('/stats')}
            className={`py-4 px-2 border-b-2 font-medium text-sm flex items-center gap-2 ${
              isActive('stats')
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            Statistiques
          </button>
          {isAuthenticated && (
            <button
              onClick={() => router.push('/admin')}
              className={`py-4 px-2 border-b-2 font-medium text-sm flex items-center gap-2 ${
                isActive('admin')
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <Lock className="w-4 h-4" />
              Gestion
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}