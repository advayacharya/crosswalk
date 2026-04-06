import { NavLink } from 'react-router-dom';

export default function Navbar() {
  const linkClasses = ({ isActive }) =>
    `px-3 py-2 rounded text-sm font-medium transition-colors ${
      isActive
        ? 'bg-white/15 text-white'
        : 'text-white/70 hover:text-white hover:bg-white/10'
    }`;

  return (
    <nav className="bg-navy sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          <NavLink to="/" className="flex items-center gap-2 text-white font-bold text-lg tracking-tight">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
            Control Mapping Engine
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
