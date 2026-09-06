import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Sparkles, LogIn, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Logo from './Logo';

export default function Navbar() {
  const { pathname } = useLocation();
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const link = (to, label) => (
    <Link
      to={to}
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
          >
            <Logo className="w-9 h-9 transition-transform duration-300 group-hover:scale-105" />

            <span className="font-bold text-lg text-white">
              Profile<span className="text-white">IQ</span>
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {link('/', 'Home')}
            {link('/analyzer', 'Analyzer')}
            {link('/results', 'Results')}
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-3">

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

            {/* Analyze Button */}
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

          </div>
        </div>
      </div>
    </header>
  );
}