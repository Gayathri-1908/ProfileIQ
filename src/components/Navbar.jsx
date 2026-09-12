import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Sparkles, LogIn, LogOut, Menu, X, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Logo from './Logo';
import { useState } from 'react';

export default function Navbar() {
  const { pathname } = useLocation();
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const link = (to, label) => (
    <Link
      to={to}
      onClick={() => setMobileMenuOpen(false)}
      className={`
        px-3 py-2 text-sm
        transition-all duration-300 ease-out
        ${
          pathname === to
            ? 'text-white font-bold'
            : 'text-white/60 font-medium hover:text-white'
        }
      `}
    >
      {label}
    </Link>
  );

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 bg-[#00072D] shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 group"
            onClick={() => setMobileMenuOpen(false)}
          >
            <Logo className="w-9 h-9 transition-transform duration-300 group-hover:scale-105" />

            <span className="font-bold text-lg text-white">
              Profile<span className="text-white">IQ</span>
            </span>
          </Link>


          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center gap-6">
            {link('/', 'Home')}
            {link('/analyzer', 'Analyzer')}
            {link('/results', 'Results')}
          </nav>


          {/* Right Side */}
          <div className="flex items-center gap-3">

            {/* Desktop Login / Logout */}
            {isAuthenticated ? (
              <>
                <span className="hidden sm:block text-sm font-medium text-white/80">
                  Hi, {user?.name?.split(' ')[0]}
                </span>

                <button
                  onClick={handleLogout}
                  className="
                    hidden sm:inline-flex items-center gap-2
                    px-4 py-2 rounded-lg
                    text-sm font-semibold
                    text-white
                    border border-white/30
                    hover:bg-white/10
                    hover:border-white/50
                    active:scale-95
                    transition-all duration-200
                  "
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="
                  hidden sm:inline-flex items-center gap-2
                  px-4 py-2 rounded-lg
                  text-sm font-semibold
                  text-white
                  border border-white/30
                  hover:bg-white/10
                  hover:border-white/50
                  active:scale-95
                  transition-all duration-200
                "
              >
                <LogIn className="w-4 h-4" />
                Login
              </Link>
            )}


            {/* Desktop Analyze Button */}
            <Link
              to="/analyzer"
              className="
                hidden sm:inline-flex items-center gap-2
                px-5 py-2 rounded-lg
                bg-white
                text-[#00072D]
                text-sm font-bold
                shadow-md
                hover:bg-gray-100
                active:scale-95
                transition-all duration-200
              "
            >
              <Sparkles className="w-4 h-4" />
              Analyze Now
            </Link>


            {/* Mobile-only: always-visible login indicator (avatar circle)
                so users can tell they're logged in WITHOUT opening the menu */}
            {isAuthenticated && (
              <div
                className="
                  sm:hidden
                  w-8 h-8 rounded-full
                  bg-white/15
                  flex items-center justify-center
                  text-white text-xs font-bold
                  shrink-0
                "
                title={`Logged in as ${user?.name}`}
              >
                {user?.name?.charAt(0)?.toUpperCase() || <User className="w-4 h-4" />}
              </div>
            )}


            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="
                md:hidden
                p-2
                rounded-lg
                text-white
                hover:bg-white/10
                transition-all duration-200
              "
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>

          </div>
        </div>


        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-white/10 py-4">

            {/* Mobile "logged in as" greeting - shown only when authenticated */}
            {isAuthenticated && (
              <div className="flex items-center gap-2 px-3 pb-3 mb-2 border-b border-white/10">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                  <User className="w-4 h-4 text-white/80" />
                </div>
                <div>
                  <p className="text-xs text-white/50">Logged in as</p>
                  <p className="text-sm font-semibold text-white">
                    {user?.name}
                  </p>
                </div>
              </div>
            )}

            <nav className="flex flex-col gap-2">

              {link('/', 'Home')}
              {link('/analyzer', 'Analyzer')}
              {link('/results', 'Results')}


              {/* Mobile Login / Logout */}
              {isAuthenticated ? (
                <button
                  onClick={handleLogout}
                  className="
                    flex items-center gap-2
                    px-3 py-2
                    text-sm font-semibold
                    text-white/80
                    hover:text-white
                    hover:bg-white/10
                    rounded-lg
                    text-left
                    transition-all duration-200
                  "
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="
                    flex items-center gap-2
                    px-3 py-2
                    text-sm font-semibold
                    text-white/80
                    hover:text-white
                    hover:bg-white/10
                    rounded-lg
                    transition-all duration-200
                  "
                >
                  <LogIn className="w-4 h-4" />
                  Login
                </Link>
              )}


              {/* Mobile Analyze Now */}
              <Link
                to="/analyzer"
                onClick={() => setMobileMenuOpen(false)}
                className="
                  flex items-center gap-2
                  px-3 py-2
                  mt-2
                  rounded-lg
                  bg-white
                  text-[#00072D]
                  text-sm font-bold
                  transition-all duration-200
                "
              >
                <Sparkles className="w-4 h-4" />
                Analyze Now
              </Link>

            </nav>
          </div>
        )}

      </div>
    </header>
  );
}