import { useState, useEffect } from 'react';
import { LogOut, Lock } from 'lucide-react';
import { useRouter } from 'next/router';

export default function Header() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const res = await fetch('/api/auth');
      const data = await res.json();
      setIsAuthenticated(data.authenticated);
    } catch (error) {
      console.error('Erreur auth:', error);
    }
  };

  const handleLogin = async () => {
    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });
      
      const data = await res.json();
      
      if (data.success) {
        setIsAuthenticated(true);
        setPassword('');
        router.push('/admin');
      } else {
        alert('Mot de passe incorrect');
      }
    } catch (error) {
      console.error('Erreur login:', error);
      alert('Erreur de connexion');
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth', { method: 'DELETE' });
      setIsAuthenticated(false);
      router.push('/');
    } catch (error) {
      console.error('Erreur logout:', error);
    }
  };

  return (
    <header className="bg-white shadow-md border-b">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <img 
            src="/images/logo_cb_100.png" 
            alt="Logo Cotes Boostees" 
            className="h-20"
          />
          <div>
            <h1 className="text-3xl font-bold text-indigo-600">Cotes-Boostees.com</h1>
            <p className="text-sm text-gray-600">Suivi intelligent de vos pronos</p>
          </div>
        </div>
        
        <div>
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
            >
              <LogOut className="w-4 h-4" />
              Deconnexion
            </button>
          ) : (
            <div className="flex gap-2 items-center">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                placeholder="Mot de passe admin"
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm"
              />
              <button
                onClick={handleLogin}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center gap-2 transition text-sm"
              >
                <Lock className="w-4 h-4" />
                Connexion
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}