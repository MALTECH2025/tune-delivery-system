
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import UserMenu from './UserMenu';
import { Button } from '@/components/ui/button';

const NavigationBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isAuthenticated } = useAuth();
  
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
          <Link to="/" className="flex items-center">
            <img src="/lovable-uploads/33be2c38-edf9-42e0-aa88-0b492632243d.png" alt="MalpinohDistro Logo" className="h-10 mr-2" />
            <span className={`font-bold text-xl ${isScrolled ? 'text-gray-900' : 'text-white'}`}>MalpinohDistro</span>
          </Link>
          
          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className={`${isScrolled ? 'text-gray-700' : 'text-white'} hover:text-red-600 transition-colors`}>Home</Link>
            
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className={`${isScrolled ? 'text-gray-700' : 'text-white'} hover:text-red-600 transition-colors`}>Dashboard</Link>
                <Link to="/settings" className={`${isScrolled ? 'text-gray-700' : 'text-white'} hover:text-red-600 transition-colors`}>Settings</Link>
                <UserMenu />
              </>
            ) : (
              <>
                <Link to="/login" className={`${isScrolled ? 'text-gray-700' : 'text-white'} hover:text-red-600 transition-colors`}>Login</Link>
                <Link to="/signup" className={`bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors`}>Sign Up</Link>
              </>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            {isAuthenticated && <UserMenu />}
            <Button 
              variant="ghost"
              size="icon"
              className="ml-2 text-gray-500 hover:text-gray-700 focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4">
            <div className="flex flex-col space-y-4">
              <Link to="/" className="text-gray-900 hover:text-red-600 transition-colors" onClick={() => setIsMenuOpen(false)}>Home</Link>
              
              {isAuthenticated ? (
                <>
                  <Link to="/dashboard" className="text-gray-900 hover:text-red-600 transition-colors" onClick={() => setIsMenuOpen(false)}>Dashboard</Link>
                  <Link to="/settings" className="text-gray-900 hover:text-red-600 transition-colors" onClick={() => setIsMenuOpen(false)}>Settings</Link>
                </>
              ) : (
                <>
                  <Link to="/login" className="text-gray-900 hover:text-red-600 transition-colors" onClick={() => setIsMenuOpen(false)}>Login</Link>
                  <Link to="/signup" className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors w-full text-center" onClick={() => setIsMenuOpen(false)}>Sign Up</Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavigationBar;
