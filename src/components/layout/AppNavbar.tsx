import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { label: 'Planning', href: '/planning' },
  { label: 'Disciplines', href: '/disciplines' },
  { label: 'Professeurs', href: '/instructors' },
  { label: 'Tarifs', href: '/pricing' },
  { label: 'Nos Salles', href: '/locations' },
];

const AppNavbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      <nav className="fixed top-0 inset-x-0 z-50 flex justify-center px-6 pt-6">
        <div className="liquid-glass rounded-full px-6 py-3 flex items-center justify-between w-full max-w-5xl">
          <Link to="/">
            <span
              style={{ fontFamily: "'Instrument Serif', serif" }}
              className="text-[#18102E] text-xl tracking-tight"
            >
              Danse&amp;CO
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`text-sm transition-colors ${
                  location.pathname === link.href
                    ? 'text-[#6C5CA8] font-medium'
                    : 'text-[#18102E]/55 hover:text-[#18102E]'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/contact"
              className={`hidden md:block liquid-glass rounded-full px-5 py-2 text-sm font-medium transition-colors ${
                location.pathname === '/contact'
                  ? 'text-[#6C5CA8]'
                  : 'text-[#18102E] hover:text-[#6C5CA8]'
              }`}
            >
              Contact
            </Link>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden liquid-glass rounded-full p-2 text-[#18102E]"
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[88px] z-40 px-6"
          >
            <div className="liquid-glass rounded-3xl p-4 md:p-6 flex flex-col gap-4 max-h-[calc(100vh-100px)] overflow-y-auto">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`text-sm md:text-base transition-colors ${
                    location.pathname === link.href
                      ? 'text-[#6C5CA8] font-medium'
                      : 'text-[#18102E]/60'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/contact"
                onClick={() => setMenuOpen(false)}
                className="text-base text-[#18102E]/60"
              >
                Contact
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AppNavbar;
