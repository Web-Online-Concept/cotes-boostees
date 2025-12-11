import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Header({ currentPage }) {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const smoothScrollTo = (targetId) => {
    const element = document.getElementById(targetId);
    if (!element) return;

    // Déterminer la hauteur du header selon la taille d'écran
    const headerHeight = window.innerWidth < 1024 ? 66 : 110; // lg breakpoint = 1024px
    
    const targetPosition = element.getBoundingClientRect().top + window.pageYOffset - headerHeight;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 1500;
    let start = null;

    const animation = (currentTime) => {
      if (start === null) start = currentTime;
      const timeElapsed = currentTime - start;
      const progress = Math.min(timeElapsed / duration, 1);
      
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
    setMobileMenuOpen(false);
    
    if (router.pathname === '/') {
      smoothScrollTo(targetId);
    } else {
      router.push('/').then(() => {
        setTimeout(() => {
          smoothScrollTo(targetId);
        }, 100);
      });
    }
  };

  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };
  
  const navItems = [
    { name: 'Tutoriel', path: '/#fonctionnement', key: 'home', emoji: '🎯', isAnchor: true },
    { name: 'Résultats', path: '/resultats', key: 'resultats', emoji: '📊', isAnchor: false },
    { name: 'Statistiques', path: '/stats', key: 'stats', emoji: '📈', isAnchor: false },
    { name: "S'abonner", path: '/abonnement', key: 'abonnement', emoji: '🚀', isAnchor: false },
  ];

  if (currentPage === 'admin') {
    navItems.push({ name: 'Gestion', path: '/admin', key: 'admin', emoji: '⚙️', isAnchor: false });
  }

  return (
    <>
      {/* Header fixed */}
      <header className="fixed top-0 left-0 right-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 shadow-2xl z-50">
        <div className="max-w-7xl mx-auto px-4 py-2">
          
          {/* VERSION MOBILE - Logo + Titre centrés */}
          <div className="lg:hidden flex items-center justify-center gap-2 py-1">
            <Link href="/">
              <img 
                src="/images/logo_cb.png" 
                alt="Cotes Boostées - Logo site de sélection cotes boostées EV+ ARJEL" 
                className="cursor-pointer hover:scale-105 transition-transform duration-300"
                style={{ 
                  width: '100px', 
                  height: '50px'
                }}
              />
            </Link>
            <div className="text-center">
              <h1 className="text-lg font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-yellow-200 to-white tracking-wide drop-shadow-2xl leading-tight">
                Cotes-Boostées.com
              </h1>
              <p className="text-white text-xs font-semibold tracking-wide drop-shadow-lg leading-tight">
                Gagnez avec les meilleures CB ARJEL
              </p>
            </div>
          </div>

          {/* VERSION DESKTOP (INCHANGÉE) */}
          <div className="hidden lg:flex items-center justify-between">
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

            {/* Navigation Desktop */}
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
      
      {/* Spacer pour compenser la hauteur du header fixe */}
      <div className="lg:hidden" style={{ height: '66px' }} />
      <div className="hidden lg:block" style={{ height: '110px' }} />
    </>
  );
}