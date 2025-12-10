import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Navigation({ currentPage }) {
  const router = useRouter();
  
  const navItems = [
    { name: 'Accueil', path: '/', key: 'accueil' },
    { name: 'Resultats', path: '/resultats', key: 'resultats' },
    { name: 'Statistiques', path: '/stats', key: 'stats' },
  ];

  // Ajouter Gestion si on est authentifié (visible seulement en admin)
  if (currentPage === 'admin') {
    navItems.push({ name: 'Gestion', path: '/admin', key: 'admin' });
  }

  return (
    <nav className="bg-white shadow-md border-b-2 border-indigo-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-center items-center space-x-2 py-4">
          {navItems.map((item) => {
            const isActive = currentPage === item.key;
            return (
              <Link key={item.key} href={item.path}>
                <button
                  className={`
                    relative px-8 py-3 rounded-lg font-semibold text-base
                    transition-all duration-300 ease-in-out
                    ${isActive 
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg scale-105' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gradient-to-r hover:from-indigo-500 hover:to-purple-500 hover:text-white hover:shadow-md hover:scale-105'
                    }
                  `}
                >
                  {isActive && (
                    <span className="absolute inset-0 rounded-lg bg-white opacity-20 animate-pulse"></span>
                  )}
                  <span className="relative z-10">{item.name}</span>
                </button>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}