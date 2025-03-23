
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import UserMenu from './UserMenu';
import { Button } from '@/components/ui/button';
import DarkModeToggle from './DarkModeToggle';

const NavigationBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isAuthenticated, isAdmin } = useAuth();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-background/95 backdrop-blur-sm shadow-md py-2' : 'bg-transparent py-4'}`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo and brand name */}
          <Link to="/" className="flex items-center">
            <img src="/lovable-uploads/33be2c38-edf9-42e0-aa88-0b492632243d.png" alt="MALPINOHDistro Logo" className="h-10 mr-2" />
            <span className={`font-bold text-xl ${isScrolled ? 'text-foreground' : 'text-white'}`}>MALPINOHDistro</span>
          </Link>
          
          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className={`${isScrolled ? 'text-foreground' : 'text-white'} hover:text-red-600 transition-colors`}>Home</Link>
            <Link to="/pricing" className={`${isScrolled ? 'text-foreground' : 'text-white'} hover:text-red-600 transition-colors`}>Pricing</Link>
            
            {isAuthenticated ? (
              <>
                {isAdmin ? (
                  <Link to="/admin" className={`${isScrolled ? 'text-foreground' : 'text-white'} hover:text-red-600 transition-colors`}>Admin</Link>
                ) : (
                  <>
                    <Link to="/dashboard" className={`${isScrolled ? 'text-foreground' : 'text-white'} hover:text-red-600 transition-colors`}>Dashboard</Link>
                    <Link to="/distribute" className={`${isScrolled ? 'text-foreground' : 'text-white'} hover:text-red-600 transition-colors`}>Distribute</Link>
                  </>
                )}
                <Link to="/settings" className={`${isScrolled ? 'text-foreground' : 'text-white'} hover:text-red-600 transition-colors`}>Settings</Link>
                <DarkModeToggle />
                <UserMenu />
              </>
            ) : (
              <>
                <Link to="/login" className={`${isScrolled ? 'text-foreground' : 'text-white'} hover:text-red-600 transition-colors`}>Login</Link>
                <Link to="/signup" className={`bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors`}>Sign Up</Link>
                <DarkModeToggle />
              </>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <DarkModeToggle />
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
              <Link to="/" className="text-foreground hover:text-red-600 transition-colors" onClick={() => setIsMenuOpen(false)}>Home</Link>
              <Link to="/pricing" className="text-foreground hover:text-red-600 transition-colors" onClick={() => setIsMenuOpen(false)}>Pricing</Link>
              
              {isAuthenticated ? (
                <>
                  {isAdmin ? (
                    <Link to="/admin" className="text-foreground hover:text-red-600 transition-colors" onClick={() => setIsMenuOpen(false)}>Admin</Link>
                  ) : (
                    <>
                      <Link to="/dashboard" className="text-foreground hover:text-red-600 transition-colors" onClick={() => setIsMenuOpen(false)}>Dashboard</Link>
                      <Link to="/distribute" className="text-foreground hover:text-red-600 transition-colors" onClick={() => setIsMenuOpen(false)}>Distribute</Link>
                    </>
                  )}
                  <Link to="/settings" className="text-foreground hover:text-red-600 transition-colors" onClick={() => setIsMenuOpen(false)}>Settings</Link>
                </>
              ) : (
                <>
                  <Link to="/login" className="text-foreground hover:text-red-600 transition-colors" onClick={() => setIsMenuOpen(false)}>Login</Link>
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
