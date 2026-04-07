import { NavLink } from 'react-router-dom';

export default function Navbar() {
  const linkClasses = ({ isActive }) =>
    `px-4 py-2 text-sm font-semibold transition-all duration-300 relative rounded-md ${
      isActive
        ? 'text-primary bg-primary-light'
        : 'text-steel hover:text-primary hover:bg-stone-low'
    }`;

  return (
    <nav className="sticky top-0 z-50 bg-stone/80 backdrop-blur-md border-b border-stone-high shadow-sm w-full flex justify-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex items-center justify-between h-16">
          <NavLink to="/" className="flex items-center gap-3 text-obsidian font-bold text-xl tracking-tighter">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/20">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            </div>
            <span className="hidden sm:block">Control Mapping Engine</span>
            <span className="sm:hidden">CME</span>
          </NavLink>

          <div className="flex items-center gap-1">
            <NavLink to="/" className={linkClasses} end>Home</NavLink>
            <NavLink to="/frameworks" className={linkClasses}>Frameworks</NavLink>
            <NavLink to="/about" className={linkClasses}>About</NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}
