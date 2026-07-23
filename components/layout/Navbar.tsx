'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useTheme } from 'next-themes';
import { Moon, Sun, Menu, X } from 'lucide-react';

const links = [
  { href: '/', label: 'Home' },
  { href: '/opportunities', label: 'Opportunities' },
  { href: '/add-opportunity', label: 'Add Opportunity' },
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/about', label: 'About' },
];

export default function Navbar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold text-gray-900 dark:text-white">
          Kaar<span className="text-blue-600">Yab</span>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-6">
          {links.map((link) => (
            <li key={link.href}>
              <Link 
                href={link.href} 
                className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                  pathname === link.href ? 'text-blue-600' : 'text-gray-600 dark:text-gray-300'
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 text-gray-600 dark:text-gray-300"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
          <ul className="flex flex-col py-4 px-4">
            {links.map((link) => (
              <li key={link.href} className="py-2">
                <Link 
                  href={link.href} 
                  onClick={() => setMobileOpen(false)}
                  className={`block text-base font-medium ${
                    pathname === link.href ? 'text-blue-600' : 'text-gray-700 dark:text-gray-200'
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}