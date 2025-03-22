
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

export const Hero: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    setIsLoaded(true);
  }, []);
  
  return (
    <section className="relative min-h-screen pt-20 overflow-hidden bg-gradient-to-b from-white to-gray-50">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-64 top-1/4 w-96 h-96 rounded-full bg-gray-100 opacity-70 animate-spin-slow"></div>
        <div className="absolute left-10 bottom-1/3 w-64 h-64 rounded-full bg-gray-100 opacity-40 animate-pulse-soft"></div>
      </div>
      
      <div className="container relative px-4 pt-20 pb-16 mx-auto max-w-screen-xl">
        <div className="flex flex-col md:flex-row items-center">
          <div 
            className={cn(
              "w-full md:w-1/2 pr-0 md:pr-12 mb-12 md:mb-0 transition-all duration-1000 delay-300",
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            )}
          >
            <span className="px-3 py-1 text-xs font-medium tracking-wider text-gray-900 uppercase bg-gray-100 rounded-full inline-block mb-6 animate-fade-in">
              Music Distribution
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight leading-tight">
              Amplify Your Music <br /> 
              <span className="relative">
                Worldwide
                <span className="absolute -bottom-2 left-0 w-full h-1 bg-black"></span>
              </span>
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-lg">
              Submit your music effortlessly and get it distributed to all major platforms. 
              Simple, transparent, and designed for independent artists.
            </p>
            
            <div className="flex flex-wrap space-x-4">
              <a 
                href="#submit" 
                className="px-8 py-3 text-white bg-black hover:bg-black/90 rounded-lg btn-transition inline-block shadow-sm hover:shadow"
              >
                Submit Music
              </a>
              <a 
                href="#how-it-works" 
                className="px-8 py-3 text-black bg-transparent hover:bg-black/5 rounded-lg btn-transition inline-block border border-black/20"
              >
                Learn More
              </a>
            </div>
          </div>
          
          <div 
            className={cn(
              "w-full md:w-1/2 transition-all duration-1000 delay-500",
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            )}
          >
            <div className="relative">
              {/* Audio wave decoration */}
              <div className="absolute -left-10 -top-10 audio-wave flex items-end h-20 z-10 opacity-80">
                <div className="h-14"></div>
                <div className="h-10"></div>
                <div className="h-16"></div>
                <div className="h-8"></div>
                <div className="h-12"></div>
              </div>
              
              {/* Main image */}
              <div className="relative z-0 rounded-2xl overflow-hidden shadow-2xl glass">
                <div className="aspect-w-4 aspect-h-3 bg-gray-100">
                  <div className="p-8 flex items-center justify-center">
                    <div className="w-full max-w-md glass rounded-xl overflow-hidden shadow-sm">
                      <div className="bg-black/90 h-12 flex items-center px-4">
                        <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        <div className="ml-4 h-6 w-40 bg-gray-800 rounded"></div>
                      </div>
                      <div className="p-6 bg-white/80">
                        <div className="h-6 w-3/4 bg-gray-200 rounded mb-4"></div>
                        <div className="h-4 w-1/2 bg-gray-200 rounded mb-2"></div>
                        <div className="h-4 w-5/6 bg-gray-200 rounded mb-2"></div>
                        <div className="h-4 w-4/6 bg-gray-200 rounded mb-6"></div>
                        <div className="h-12 w-full bg-black rounded-lg"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Stats */}
        <div 
          className={cn(
            "flex flex-wrap justify-center mt-20 pt-10 border-t border-gray-200 transition-all duration-1000 delay-700",
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          )}
        >
          <Stat number="100+" label="Platforms" />
          <Stat number="10k+" label="Artists" />
          <Stat number="1M+" label="Listeners" />
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce opacity-75">
        <span className="text-xs uppercase tracking-widest mb-2">Scroll</span>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M7 13l5 5 5-5"></path>
          <path d="M7 7l5 5 5-5"></path>
        </svg>
      </div>
    </section>
  );
};

interface StatProps {
  number: string;
  label: string;
}

const Stat: React.FC<StatProps> = ({ number, label }) => {
  return (
    <div className="px-8 py-4 text-center">
      <div className="text-3xl font-bold mb-1">{number}</div>
      <div className="text-sm text-gray-500 uppercase tracking-wider">{label}</div>
    </div>
  );
};

export default Hero;
