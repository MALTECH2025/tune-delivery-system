
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AnimatedLogo from './AnimatedLogo';
import { cn } from '@/lib/utils';

export const NavigationBar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 py-4 px-6 transition-all duration-500",
        scrolled ? "bg-white/80 backdrop-blur-md shadow-sm" : "bg-transparent"
      )}
    >
      <div className="max-w-screen-xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-3 opacity-90 hover:opacity-100 transition-opacity">
          <AnimatedLogo />
          <span className="text-xl font-medium tracking-tight">SoundFlow</span>
        </Link>
        
        <div className="hidden md:flex items-center space-x-8">
          <NavLink href="/">Home</NavLink>
          <NavLink href="#features">Features</NavLink>
          <NavLink href="#how-it-works">How it Works</NavLink>
          <NavLink href="#submit">Submit Music</NavLink>
        </div>
        
        <button 
          className="block md:hidden btn-transition p-2 rounded-lg hover:bg-black/5"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <MenuIcon open={menuOpen} />
        </button>
      </div>
      
      {/* Mobile menu */}
      <div 
        className={cn(
          "fixed inset-x-0 top-[72px] p-6 bg-white/95 backdrop-blur-lg shadow-lg md:hidden transition-all duration-300 ease-in-out",
          menuOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"
        )}
      >
        <nav className="flex flex-col space-y-4">
          <MobileNavLink href="/" onClick={() => setMenuOpen(false)}>Home</MobileNavLink>
          <MobileNavLink href="#features" onClick={() => setMenuOpen(false)}>Features</MobileNavLink>
          <MobileNavLink href="#how-it-works" onClick={() => setMenuOpen(false)}>How it Works</MobileNavLink>
          <MobileNavLink href="#submit" onClick={() => setMenuOpen(false)}>Submit Music</MobileNavLink>
        </nav>
      </div>
    </header>
  );
};

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ href, children }) => {
  return (
    <a 
      href={href} 
      className="relative text-sm font-medium text-gray-900 py-2 btn-transition group"
    >
      {children}
      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-900 group-hover:w-full transition-all duration-300"></span>
    </a>
  );
};

interface MobileNavLinkProps extends NavLinkProps {
  onClick: () => void;
}

const MobileNavLink: React.FC<MobileNavLinkProps> = ({ href, onClick, children }) => {
  return (
    <a 
      href={href} 
      onClick={onClick}
      className="text-lg font-medium py-2 hover:translate-x-1 transition-transform duration-200"
    >
      {children}
    </a>
  );
};

interface MenuIconProps {
  open: boolean;
}

const MenuIcon: React.FC<MenuIconProps> = ({ open }) => {
  return (
    <div className="relative w-6 h-6">
      <span 
        className={cn(
          "absolute left-0 block h-0.5 w-6 bg-gray-900 transition-all duration-300",
          open ? "top-3 rotate-45" : "top-1"
        )}
      ></span>
      <span 
        className={cn(
          "absolute left-0 top-3 block h-0.5 bg-gray-900 transition-all duration-300",
          open ? "w-0 opacity-0" : "w-6 opacity-100"
        )}
      ></span>
      <span 
        className={cn(
          "absolute left-0 block h-0.5 w-6 bg-gray-900 transition-all duration-300",
          open ? "top-3 -rotate-45" : "top-5"
        )}
      ></span>
    </div>
  );
};

export default NavigationBar;
