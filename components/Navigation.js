import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Navigation({ currentPage }) {
  const router = useRouter();
  
  const navItems = [
    { name: 'Accueil', path: '/', key: 'accueil', emoji: '🏠' },
    { name: 'Resultats', path: '/resultats', key: 'resultats', emoji: '📊' },
    { name: 'Statistiques', path: '/stats', key: 'stats', emoji: '📈' },
  ];

  // Ajouter Gestion si on est authentifié (visible seulement en admin)
  if (currentPage === 'admin') {
    navItems.push({ name: 'Gestion', path: '/admin', key: 'admin', emoji: '⚙️' });
  }

  return (
    <nav className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-center items-center space-x-2 py-2">
          {navItems.map((item) => {
            const isActive = currentPage === item.key;
            return (
              <Link key={item.key} href={item.path}>
                <button
                  className={`
                    relative px-5 py-2 rounded-lg font-semibold text-sm
                    transition-all duration-300 ease-in-out
                    ${isActive 
                      ? 'bg-white text-indigo-700 shadow-xl scale-105' 
                      : 'bg-white/10 text-white hover:bg-white/20 hover:shadow-lg hover:scale-105'
                    }
                  `}
                >
                  {isActive && (
                    <span className="absolute inset-0 rounded-lg bg-gradient-to-r from-yellow-200/30 to-white/30 animate-pulse"></span>
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    <span className="text-base">{item.emoji}</span>
                    {item.name}
                  </span>
                </button>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}