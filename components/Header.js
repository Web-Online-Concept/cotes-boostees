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

    const targetPosition = element.getBoundingClientRect().top + window.pageYOffset;
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
          <div className="flex items-center justify-between">
            
            {/* VERSION MOBILE : Burger → Logo → Titre */}
            <div className="lg:hidden flex items-center gap-3 w-full">
              {/* Bouton Menu Hamburger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition flex-shrink-0"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6 text-white" />
                ) : (
                  <Menu className="w-6 h-6 text-white" />
                )}
              </button>

              {/* Logo */}
              <Link href="/" className="flex-shrink-0">
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

              {/* Titre + Sous-titre */}
              <div className="flex flex-col min-w-0">
                <h1 className="text-base font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-yellow-200 to-white tracking-wide drop-shadow-2xl leading-tight truncate">
                  Cotes-Boostées.com
                </h1>
                <p className="text-white text-xs font-semibold tracking-wide drop-shadow-lg leading-tight truncate">
                  Meilleures CB ARJEL
                </p>
              </div>
            </div>

            {/* VERSION DESKTOP : Logo + Titre à gauche, Navigation à droite (INCHANGÉ) */}
            <div className="hidden lg:flex items-center gap-4">
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

            {/* Navigation Desktop (cachée sur mobile) */}
            <div className="hidden lg:flex items-center space-x-2">
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

      {/* Menu Mobile (overlay) */}
      {mobileMenuOpen && (
        <>
          {/* Overlay sombre */}
          <div 
            className="lg:hidden fixed inset-0 bg-black/50 z-40"
            style={{ top: '66px' }}
            onClick={() => setMobileMenuOpen(false)}
          />
          
          {/* Menu slide depuis la gauche */}
          <div className="lg:hidden fixed top-[66px] left-0 w-64 h-[calc(100vh-66px)] bg-gradient-to-b from-indigo-600 to-purple-700 shadow-2xl z-50 overflow-y-auto">
            <nav className="flex flex-col p-4 space-y-2">
              {navItems.map((item) => {
                const isActive = currentPage === item.key;
                
                if (item.isAnchor) {
                  return (
                    <button
                      key={item.key}
                      onClick={(e) => handleSmoothScroll(e, 'fonctionnement')}
                      className={`
                        w-full text-left px-4 py-3 rounded-lg font-semibold
                        transition-all duration-200
                        ${isActive 
                          ? 'bg-white text-indigo-700 shadow-lg' 
                          : 'bg-white/10 text-white hover:bg-white/20'
                        }
                      `}
                    >
                      <span className="flex items-center gap-3">
                        <span className="text-xl">{item.emoji}</span>
                        {item.name}
                      </span>
                    </button>
                  );
                }
                
                return (
                  <Link key={item.key} href={item.path} onClick={handleNavClick}>
                    <button
                      className={`
                        w-full text-left px-4 py-3 rounded-lg font-semibold
                        transition-all duration-200
                        ${isActive 
                          ? 'bg-white text-indigo-700 shadow-lg' 
                          : 'bg-white/10 text-white hover:bg-white/20'
                        }
                      `}
                    >
                      <span className="flex items-center gap-3">
                        <span className="text-xl">{item.emoji}</span>
                        {item.name}
                      </span>
                    </button>
                  </Link>
                );
              })}
            </nav>
          </div>
        </>
      )}
      
      {/* Spacer pour compenser la hauteur du header fixe */}
      <div className="lg:hidden" style={{ height: '66px' }} />
      <div className="hidden lg:block" style={{ height: '110px' }} />
    </>
  );
}