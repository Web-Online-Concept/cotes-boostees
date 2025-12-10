export default function Footer() {
  return (
    <footer className="bg-white border-t mt-12">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="text-center text-gray-600 text-sm">
          <p>&copy; {new Date().getFullYear()} Cotes-Boostées.com - Tous droits réservés</p>
          <p className="mt-2">Suivi professionnel des cotes boostées</p>
        </div>
      </div>
    </footer>
  );
}