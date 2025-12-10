import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Header({ currentPage }) {
  const router = useRouter();
  
  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault();
    
    // Si on est déjà sur la page d'accueil
    if (router.pathname === '/') {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      // Si on est sur une autre page, d'abord naviguer puis scroller
      router.push('/').then(() => {
        setTimeout(() => {
          const element = document.getElementById(targetId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 100);
      });
    }
  };
  
  const navItems = [
    { name: 'Tutoriel', path: '/#fonctionnement', key: 'home', emoji: '🎯', isAnchor: true },
    { name: 'Résultats', path: '/resultats', key: 'resultats', emoji: '📊', isAnchor: false },
    { name: 'Statistiques', path: '/stats', key: 'stats', emoji: '📈', isAnchor: false },
    { name: "S'abonner", path: '/abonnement', key: 'abonnement', emoji: '🚀', isAnchor: false },
  ];

  // Ajouter Gestion si on est authentifié (visible seulement en admin)
  if (currentPage === 'admin') {
    navItems.splice(3, 0, { name: 'Gestion', path: '/admin', key: 'admin', emoji: '⚙️', isAnchor: false });
  }

  return (
    <header className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 py-2">
        <div className="flex items-center justify-between">
          {/* Logo + Titre à gauche */}
          <div className="flex items-center gap-4">
            <Link href="/">
              <img 
                src="/images/logo_cb.png" 
                alt="Cotes Boostées Logo" 
                className="cursor-pointer hover:scale-105 transition-transform duration-300"
                style={{ width: '200px', height: '100px' }}
              />
            </Link>
            <div>
              <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-yellow-200 to-white tracking-wide drop-shadow-2xl">
                Cotes-Boostées.com
              </h1>
              <p className="text-white text-base font-semibold tracking-wide drop-shadow-lg">
                Gagnez avec les meilleures CB ARJEL
              </p>
            </div>
          </div>

          {/* Navigation à droite */}
          <div className="flex items-center space-x-2">
            {navItems.map((item) => {
              const isActive = currentPage === item.key;
              
              if (item.isAnchor) {
                return (
                  <button
                    key={item.key}
                    onClick={(e) => handleSmoothScroll(e, 'fonctionnement')}
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
                );
              }
              
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
      </div>
    </header>
  );
}