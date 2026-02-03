export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full py-3 px-6 border-t border-gray-100 bg-white">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[#212529]/60">
        <p>© CF EVOLUTION | {currentYear} Tous droits réservés</p>
        
        <div className="flex items-center gap-6">
          <a
            href="https://cf-evolution.com/mentions-legales"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#5B4FFC] transition-colors"
          >
            Mentions légales
          </a>
          <a
            href="https://cf-evolution.com/politique-de-cookies"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#5B4FFC] transition-colors"
          >
            Politique cookies
          </a>
        </div>
      </div>
    </footer>
  );
}
