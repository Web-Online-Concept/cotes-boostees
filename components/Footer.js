import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 shadow-2xl mt-12">
      <div className="max-w-7xl mx-auto px-4 py-6">
        
        {/* VERSION MOBILE */}
        <div className="lg:hidden text-center space-y-4">
          <p className="text-white text-sm font-semibold">&copy; 2026 Cotes-Boostées.com - Tous droits réservés</p>
          <p className="text-white/80 text-sm">Gagnez avec les meilleures CB ARJEL</p>
          
          {/* Bouton Nous Contacter */}
          <div className="flex justify-center">
            <Link href="/contact">
              <button className="bg-white text-indigo-700 px-6 py-2 rounded-lg font-semibold text-sm hover:bg-gray-100 transition shadow-lg">
                Nous Contacter
              </button>
            </Link>
          </div>

          {/* Liens légaux */}
          <div className="flex items-center justify-center gap-2 text-xs text-white/60 flex-wrap">
            <Link href="/cgv" className="hover:text-white transition">
              CGV
            </Link>
            <span>•</span>
            <Link href="/mentions-legales" className="hover:text-white transition">
              Mentions légales
            </Link>
            <span>•</span>
            <Link href="/politique-confidentialite" className="hover:text-white transition">
              Confidentialité
            </Link>
            <span>•</span>
            <Link href="/admin" className="hover:text-white transition">
              Admin
            </Link>
          </div>
        </div>

        {/* VERSION DESKTOP (INCHANGÉE) */}
        <div className="hidden lg:block text-center space-y-3">
          <p className="text-white text-sm font-semibold">&copy; 2026 Cotes-Boostées.com - Tous droits réservés</p>
          <p className="text-white/80 text-sm">Gagnez avec les meilleures CB ARJEL</p>
          
          {/* Liens légaux */}
          <div className="flex items-center justify-center gap-4 text-xs text-white/60">
            <Link href="/contact" className="hover:text-yellow-300 transition">
              Nous contacter
            </Link>
            <span>•</span>
            <Link href="/cgv" className="hover:text-white transition">
              CGV
            </Link>
            <span>•</span>
            <Link href="/mentions-legales" className="hover:text-white transition">
              Mentions légales
            </Link>
            <span>•</span>
            <Link href="/politique-confidentialite" className="hover:text-white transition">
              Confidentialité
            </Link>
            <span>•</span>
            <Link href="/admin" className="hover:text-white transition">
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}