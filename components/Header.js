import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Header({ currentPage }) {
  const router = useRouter();
  
  const smoothScrollTo = (targetId) => {
    const element = document.getElementById(targetId);
    if (!element) return;

    const targetPosition = element.getBoundingClientRect().top + window.pageYOffset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 1500; // 1.5 secondes pour un scroll plus lent
    let start = null;

    const animation = (currentTime) => {
      if (start === null) start = currentTime;
      const timeElapsed = currentTime - start;
      const progress = Math.min(timeElapsed / duration, 1);
      
      // Fonction d'easing pour un mouvement plus fluide (ease-in-out)
      const ease = progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;

      window.scrollTo(0, startPosition + distance * ease);

      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    };

    requestAnimationFrame(animation);
  };
  
  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault();
    
    // Si on est déjà sur la page d'accueil
    if (router.pathname === '/') {
      smoothScrollTo(targetId);
    } else {
      // Si on est sur une autre page, d'abord naviguer puis scroller
      router.push('/').then(() => {
        setTimeout(() => {
          smoothScrollTo(targetId);
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

  // Ajouter Gestion si on est authentifié (visible seulement en admin) - À LA FIN
  if (currentPage === 'admin') {
    navItems.push({ name: 'Gestion', path: '/admin', key: 'admin', emoji: '⚙️', isAnchor: false });
  }

  return (
    <header className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 shadow-2xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-2">
        <div className="flex items-center justify-between">
          {/* Logo + Titre à gauche */}
          <div className="flex items-center gap-4">
            <Link href="/">
              <img 
                src="/images/logo_cb.png" 
                alt="Cotes Boostées - Logo site de sélection cotes boostées EV+ ARJEL" 
                className="cursor-pointer hover:scale-105 transition-transform duration-300"
                style={{ width: '200px', height: '100px' }}
              />
            </Link>
            <div className="text-center">
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