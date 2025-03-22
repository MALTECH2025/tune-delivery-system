
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const NavigationBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo and brand name */}
          <a href="/" className="flex items-center">
            <img src="/lovable-uploads/33be2c38-edf9-42e0-aa88-0b492632243d.png" alt="MalpinohDistro Logo" className="h-10 mr-2" />
            <span className={`font-bold text-xl ${isScrolled ? 'text-gray-900' : 'text-white'}`}>MalpinohDistro</span>
          </a>
          
          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="/" className={`${isScrolled ? 'text-gray-700' : 'text-white'} hover:text-red-600 transition-colors`}>Home</a>
            <a href="/dashboard" className={`${isScrolled ? 'text-gray-700' : 'text-white'} hover:text-red-600 transition-colors`}>Dashboard</a>
            <a href="#features" className={`${isScrolled ? 'text-gray-700' : 'text-white'} hover:text-red-600 transition-colors`}>Features</a>
            <a href="#how-it-works" className={`${isScrolled ? 'text-gray-700' : 'text-white'} hover:text-red-600 transition-colors`}>How It Works</a>
            <a href="#submit" className={`bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors`}>Submit Music</a>
          </div>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden text-gray-500 hover:text-gray-700 focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4">
            <div className="flex flex-col space-y-4">
              <a href="/" className="text-gray-900 hover:text-red-600 transition-colors" onClick={() => setIsMenuOpen(false)}>Home</a>
              <a href="/dashboard" className="text-gray-900 hover:text-red-600 transition-colors" onClick={() => setIsMenuOpen(false)}>Dashboard</a>
              <a href="#features" className="text-gray-900 hover:text-red-600 transition-colors" onClick={() => setIsMenuOpen(false)}>Features</a>
              <a href="#how-it-works" className="text-gray-900 hover:text-red-600 transition-colors" onClick={() => setIsMenuOpen(false)}>How It Works</a>
              <a href="#submit" className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors w-full text-center" onClick={() => setIsMenuOpen(false)}>Submit Music</a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavigationBar;
