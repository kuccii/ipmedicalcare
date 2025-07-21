import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Mail } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Products', path: '/products' },
    { name: 'Industries', path: '/industries' },
    { name: 'Case Studies', path: '/case-studies' },
    { name: 'Resources', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      {/* Top bar */}
      <div className="bg-gradient-to-r from-blue-800 via-teal-700 to-emerald-700 text-white py-2 px-4 text-sm hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <span>+255621232883</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <span>info@ipmedicare.co.tz</span>
            </div>
          </div>
          <div className="text-sm">
            Excellence in Supplying Medical Equipment - Tanzania
          </div>
        </div>
      </div>

      {/* Main header */}
      <header className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-xl' : 'bg-white/98 backdrop-blur-sm shadow-lg'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <img src="/ip-medical-logo.png" alt="IP Medical Care Logo" className="h-16 w-auto" />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`font-medium transition-all duration-200 relative group ${
                    location.pathname === item.path
                      ? 'text-transparent bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text'
                      : 'text-gray-700 hover:text-transparent hover:bg-gradient-to-r hover:from-blue-600 hover:to-teal-600 hover:bg-clip-text'
                  }`}
                >
                  {item.name}
                  <div className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-blue-600 to-teal-600 transition-all duration-200 ${
                    location.pathname === item.path ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}></div>
                </Link>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-4">
              <Link
                to="/contact"
                className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-teal-600 to-emerald-600 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative">Request Quote</span>
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="lg:hidden border-t border-gray-200 py-4 bg-white/95 backdrop-blur-sm">
              <nav className="flex flex-col gap-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`font-medium py-2 transition-colors duration-200 ${
                      location.pathname === item.path
                        ? 'text-transparent bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text'
                        : 'text-gray-700 hover:text-transparent hover:bg-gradient-to-r hover:from-blue-600 hover:to-teal-600 hover:bg-clip-text'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
                <Link
                  to="/contact"
                  onClick={() => setIsMenuOpen(false)}
                  className="bg-gradient-to-r from-blue-600 via-teal-600 to-emerald-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-200 text-center mt-4"
                >
                  Request Quote
                </Link>
              </nav>
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;