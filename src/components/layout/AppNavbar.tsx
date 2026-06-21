'use client'
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { label: 'Planning', href: '/planning' },
  { label: 'Tarifs', href: '/pricing' },
  { label: 'Les membres', href: '/instructors' },
  { label: 'Actualités', href: '/actualites' },
  { label: 'Les danses', href: '/disciplines' },
  { label: "L'histoire", href: '/histoire' },
];

const AppNavbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <nav className="fixed top-0 inset-x-0 z-50 flex justify-center px-6 pt-6">
        <div className="liquid-glass rounded-full px-6 py-3 flex items-center justify-between w-full max-w-5xl">
          <Link href="/">
            <span
              style={{ fontFamily: "'Instrument Serif', serif" }}
              className="text-[#18102E] text-xl tracking-tight"
            >
              Dans&amp;CO
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm transition-colors ${
                  pathname === link.href
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
              href="/contact"
              className={`hidden lg:block liquid-glass rounded-full px-5 py-2 text-sm font-medium transition-colors ${
                pathname === '/contact'
                  ? 'text-[#6C5CA8]'
                  : 'text-[#18102E] hover:text-[#6C5CA8]'
              }`}
            >
              Contact
            </Link>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden liquid-glass rounded-full p-2 text-[#18102E]"
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
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`text-sm md:text-base transition-colors ${
                    pathname === link.href
                      ? 'text-[#6C5CA8] font-medium'
                      : 'text-[#18102E]/60'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/contact"
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
