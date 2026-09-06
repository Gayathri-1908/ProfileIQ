import { Github } from 'lucide-react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="mt-24 bg-[#00072D] text-white">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          {/* Brand */}
          <div className="md:col-span-2">

            <Link
              to="/"
              className="flex items-center gap-2"
            >
              <Logo className="w-9 h-9" />

              <span className="font-bold text-lg text-white">
                Profile<span className="text-white">IQ</span>
              </span>
            </Link>

            <p className="mt-4 text-sm text-white/65 max-w-md">
              AI-powered resume and LinkedIn analysis with specific, honest
              fixes — not just a score.
            </p>

            {/* Social Links */}
            <div className="flex gap-3 mt-5">

              {/* GitHub */}
              <a
                href="https://github.com/Gayathri-1908"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  w-9 h-9 rounded-lg
                  bg-white/10
                  flex items-center justify-center
                  text-white/70
                  hover:bg-white/20
                  hover:text-white
                  active:scale-95
                  transition-all duration-200
                "
              >
                <Github className="w-4 h-4" />
              </a>

            </div>
          </div>

          {/* Product */}
          <div>

            <h4 className="font-semibold text-white mb-4">
              Product
            </h4>

            <ul className="space-y-2 text-sm">

              <li>
                <Link
                  to="/analyzer"
                  className="
                    text-white/60
                    hover:text-white
                    transition-colors duration-200
                  "
                >
                  Analyzer
                </Link>
              </li>

              <li>
                <Link
                  to="/results"
                  className="
                    text-white/60
                    hover:text-white
                    transition-colors duration-200
                  "
                >
                  Results
                </Link>
              </li>

              <li>
                <Link
                  to="/pricing"
                  className="
                    text-white/60
                    hover:text-white
                    transition-colors duration-200
                  "
                >
                  Pricing
                </Link>
              </li>

            </ul>
          </div>

          {/* Company */}
          <div>

            <h4 className="font-semibold text-white mb-4">
              Company
            </h4>

            <ul className="space-y-2 text-sm">

              <li>
                <Link
                  to="/about"
                  className="
                    text-white/60
                    hover:text-white
                    transition-colors duration-200
                  "
                >
                  About
                </Link>
              </li>

              <li>
                <Link
                  to="/faq"
                  className="
                    text-white/60
                    hover:text-white
                    transition-colors duration-200
                  "
                >
                  FAQ
                </Link>
              </li>

              <li>
                <Link
                  to="/contact"
                  className="
                    text-white/60
                    hover:text-white
                    transition-colors duration-200
                  "
                >
                  Contact
                </Link>
              </li>

            </ul>
          </div>

        </div>

        {/* Bottom */}
        <div
          className="
            mt-10 pt-6
            border-t border-white/15
            flex flex-col sm:flex-row
            justify-between items-center
            gap-3
          "
        >

          <p className="text-sm text-white/45">
            © {new Date().getFullYear()} ProfileIQ. All rights reserved.
          </p>

          <p className="text-xs text-white/45">
            Privacy Policy · Terms of Service
          </p>

        </div>

      </div>
    </footer>
  );
}