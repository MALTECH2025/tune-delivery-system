
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const Hero = () => {
  const { isAuthenticated, isAdmin } = useAuth();
  
  return (
    <section className="relative flex items-center justify-center min-h-screen bg-gradient-to-b from-black to-gray-900 text-white overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute top-[20%] left-[15%] w-48 h-48 rounded-full bg-red-700/20 blur-[100px]"></div>
        <div className="absolute bottom-[20%] right-[15%] w-72 h-72 rounded-full bg-red-600/20 blur-[100px]"></div>
      </div>
      
      <div className="container px-4 mx-auto max-w-screen-xl z-10 py-20 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <img 
                src="/lovable-uploads/33be2c38-edf9-42e0-aa88-0b492632243d.png" 
                alt="MalpinohDistro Logo" 
                className="h-16 w-16"
              />
              <h1 className="text-3xl md:text-4xl font-bold">MalpinohDistro</h1>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Distribute Your Music <span className="text-red-500">Worldwide</span>
            </h2>
            
            <p className="text-xl text-gray-300 mb-8 max-w-xl">
              Get your music on all major streaming platforms and keep 100% of your royalties. 
              Simple, transparent, and artist-friendly distribution.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              {isAuthenticated ? (
                <Link 
                  to={isAdmin ? "/admin" : "/dashboard"}
                  className="bg-red-600 hover:bg-red-700 text-white font-medium px-6 py-3 rounded-md transition-colors flex items-center justify-center sm:justify-start"
                >
                  {isAdmin ? "Admin Dashboard" : "Artist Dashboard"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              ) : (
                <Link 
                  to="/signup" 
                  className="bg-red-600 hover:bg-red-700 text-white font-medium px-6 py-3 rounded-md transition-colors flex items-center justify-center sm:justify-start"
                >
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              )}
            </div>
          </div>
          
          <div className="hidden lg:flex justify-center">
            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-red-600 to-red-400 rounded-lg blur opacity-30"></div>
              <div className="relative bg-black/80 p-6 rounded-lg border border-white/10">
                <div className="grid gap-4">
                  <div className="p-4 rounded-md border border-white/10">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center mr-3">
                        <span className="text-white font-bold">1</span>
                      </div>
                      <div>
                        <h3 className="font-bold">Upload Your Music</h3>
                        <p className="text-sm text-gray-400">High-quality files accepted</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 rounded-md border border-white/10">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center mr-3">
                        <span className="text-white font-bold">2</span>
                      </div>
                      <div>
                        <h3 className="font-bold">Choose Platforms</h3>
                        <p className="text-sm text-gray-400">All major streaming services</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 rounded-md border border-white/10">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center mr-3">
                        <span className="text-white font-bold">3</span>
                      </div>
                      <div>
                        <h3 className="font-bold">Track Your Success</h3>
                        <p className="text-sm text-gray-400">Monitor streams and earnings</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-24 flex flex-wrap justify-center gap-8 opacity-70">
          <div className="text-2xl font-bold">Spotify</div>
          <div className="text-2xl font-bold">Apple Music</div>
          <div className="text-2xl font-bold">Amazon Music</div>
          <div className="text-2xl font-bold">TikTok</div>
          <div className="text-2xl font-bold">YouTube Music</div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
