import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/">
            <img 
              src="/images/logo_cb.png" 
              alt="Cotes Boostees Logo" 
              className="cursor-pointer"
              style={{ width: '200px', height: '100px' }}
            />
          </Link>
          <div className="text-center flex-1">
            <h1 className="text-3xl font-bold text-indigo-600">Cotes-Boostees.com</h1>
            <p className="text-gray-600 text-sm mt-1">Gagnez avec les meilleures CB ARJEL</p>
          </div>
          <Link href="/abonnement">
            <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition font-semibold shadow-lg">
              S'abonner aux CB 2026
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
}