import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <Link href="/">
            <img 
              src="/images/logo_cb.png" 
              alt="Cotes Boostees Logo" 
              className="cursor-pointer hover:scale-105 transition-transform duration-300"
              style={{ width: '200px', height: '100px' }}
            />
          </Link>
          <div className="text-center flex-1">
            <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-yellow-200 to-white tracking-wide drop-shadow-2xl">
              Cotes-Boostées.com
            </h1>
            <p className="text-white text-xl mt-2 font-semibold tracking-wide drop-shadow-lg">
              Gagnez avec les meilleures CB ARJEL
            </p>
          </div>
          <Link href="/abonnement">
            <button className="bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-4 rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-300 font-bold shadow-xl hover:shadow-2xl hover:scale-105 text-lg">
              S'abonner aux CB 2026
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
}