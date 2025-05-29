import React, { useState, useEffect, ReactNode } from 'react';
import { Percent as Soccer, Menu, X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';

interface HeaderProps {
  children?: ReactNode;
}

const Header: React.FC<HeaderProps> = ({ children }) => {
  const { theme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <header
      className={`sticky top-0 z-10 transition-all duration-300 ${
        isScrolled 
          ? `${theme === 'dark' ? 'bg-gray-800/95 shadow-lg' : 'bg-white/95 shadow-md'} backdrop-blur-sm` 
          : `${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Soccer className={`mr-2 ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`} />
            <span className="font-bold text-xl">FootballMatches</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <nav>
              <ul className="flex space-x-6">
                <li>
                  <a href="#" className="hover:text-green-500 transition-colors">Home</a>
                </li>
                <li>
                  <a href="#" className="hover:text-green-500 transition-colors">Leagues</a>
                </li>
                <li>
                  <a href="#" className="hover:text-green-500 transition-colors">Teams</a>
                </li>
              </ul>
            </nav>
            {children}
          </div>
          
          <div className="md:hidden flex items-center">
            {children}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="ml-2 p-2"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className={`md:hidden ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}
          >
            <nav className="container mx-auto px-4 py-3">
              <ul className="space-y-3">
                <li>
                  <a 
                    href="#" 
                    className="block py-2 hover:text-green-500 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a 
                    href="#" 
                    className="block py-2 hover:text-green-500 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Leagues
                  </a>
                </li>
                <li>
                  <a 
                    href="#" 
                    className="block py-2 hover:text-green-500 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Teams
                  </a>
                </li>
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;