import Link from 'next/link';
import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <Link href="/" className="text-xl font-bold text-gray-900 dark:text-white">
              Kaar<span className="text-blue-600">Yab</span>
            </Link>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 max-w-xs">
              Connecting Afghan youth with global and local opportunities.
            </p>
          </div>
          
          <div className="flex flex-col items-center md:items-end gap-2 text-sm text-gray-600 dark:text-gray-300">
            <div className="flex gap-4">
              <Link href="/about" className="hover:text-blue-600 transition-colors">About</Link>
              <Link href="/contact" className="hover:text-blue-600 transition-colors">Contact</Link>
              <Link href="/dashboard" className="hover:text-blue-600 transition-colors">Dashboard</Link>
            </div>
            <p className="flex items-center gap-1 text-xs text-gray-400">
              Made with <Heart size={12} className="text-red-500 fill-red-500" /> for Afghanistan
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}