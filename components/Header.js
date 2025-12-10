import { useRouter } from 'next/router';

export default function Header() {
  const router = useRouter();

  return (
    <header className="bg-white shadow-md border-b">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-4 cursor-pointer" onClick={() => router.push('/')}>
          <img 
            src="/images/logo_cb_100.png" 
            alt="Logo Cotes Boostees" 
            className="h-20"
          />
          <div className="text-center">
            <h1 className="text-3xl font-bold text-indigo-600">Cotes-Boostees.com</h1>
            <p className="text-sm text-gray-600">Gagnez avec les meilleures CB ARJEL</p>
          </div>
        </div>
        
        <div>
          <button
            onClick={() => router.push('/abonnement')}
            className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-lg text-lg font-bold hover:from-green-600 hover:to-emerald-700 transition transform hover:scale-105 shadow-lg"
          >
            S'abonner aux CB 2026 🚀
          </button>
        </div>
      </div>
    </header>
  );
}