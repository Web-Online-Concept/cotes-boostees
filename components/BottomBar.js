import Link from 'next/link';
import { useRouter } from 'next/router';

export default function BottomBar({ currentPage }) {
  const router = useRouter();

  const smoothScrollTo = (targetId) => {
    const element = document.getElementById(targetId);
    if (!element) return;

    const headerHeight = 66;
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

  const handleTutorielClick = (e) => {
    e.preventDefault();
    
    if (router.pathname === '/') {
      smoothScrollTo('fonctionnement');
    } else {
      router.push('/').then(() => {
        setTimeout(() => {
          smoothScrollTo('fonctionnement');
        }, 100);
      });
    }
  };

  const navItems = [
    { 
      name: 'Tutos', 
      path: '/#fonctionnement', 
      key: 'home', 
      emoji: '🎯',
      isAnchor: true,
      onClick: handleTutorielClick
    },
    { 
      name: 'Résultats', 
      path: '/resultats', 
      key: 'resultats', 
      emoji: '📊',
      isAnchor: false
    },
    { 
      name: 'Stats', 
      path: '/stats', 
      key: 'stats', 
      emoji: '📈',
      isAnchor: false
    },
    { 
      name: 'Abos', 
      path: '/abonnement', 
      key: 'abonnement', 
      emoji: '🚀',
      isAnchor: false
    },
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 shadow-2xl z-40 border-t-2 border-white/20">
      <div className="flex items-center justify-around px-2 py-2">
        {navItems.map((item) => {
          const isActive = currentPage === item.key;
          
          if (item.isAnchor) {
            return (
              <button
                key={item.key}
                onClick={item.onClick}
                className={`
                  flex flex-col items-center justify-center gap-1 px-2 py-2 rounded-lg
                  transition-all duration-200 w-20
                  ${isActive 
                    ? 'bg-white text-indigo-700 shadow-lg' 
                    : 'text-white hover:bg-white/10'
                  }
                `}
              >
                <span className="text-xl">{item.emoji}</span>
                <span className="text-xs font-semibold">{item.name}</span>
              </button>
            );
          }

          return (
            <Link key={item.key} href={item.path}>
              <button
                className={`
                  flex flex-col items-center justify-center gap-1 px-2 py-2 rounded-lg
                  transition-all duration-200 w-20
                  ${isActive 
                    ? 'bg-white text-indigo-700 shadow-lg' 
                    : 'text-white hover:bg-white/10'
                  }
                `}
              >
                <span className="text-xl">{item.emoji}</span>
                <span className="text-xs font-semibold">{item.name}</span>
              </button>
            </Link>
          );
        })}
      </div>
    </div>
  );
}