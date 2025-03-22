import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavigationBar from '@/components/NavigationBar';
import Hero from '@/components/Hero';
import SubmissionForm from '@/components/SubmissionForm';
import { useAuth } from '@/contexts/AuthContext';

const Index = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  // Add scroll reveal effect
  useEffect(() => {
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealOnScroll = () => {
      const windowHeight = window.innerHeight;
      const revealPoint = 150;
      
      revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        
        if (elementTop < windowHeight - revealPoint) {
          element.classList.add('active');
        }
      });
    };
    
    window.addEventListener('scroll', revealOnScroll);
    
    // Initial check
    revealOnScroll();
    
    return () => window.removeEventListener('scroll', revealOnScroll);
  }, []);
  
  return (
    <main className="min-h-screen bg-white overflow-x-hidden">
      <NavigationBar />
      
      <Hero />
      
      {/* Features Section */}
      <section id="features" className="py-24 bg-gray-50">
        <div className="container px-4 mx-auto max-w-screen-xl">
          <div className="max-w-3xl mx-auto text-center mb-16 reveal opacity-0 translate-y-10 transition-all duration-1000">
            <span className="px-3 py-1 text-xs font-medium tracking-wider text-gray-900 uppercase bg-gray-200 rounded-full inline-block mb-6">
              Our Process
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Simple. Transparent. Artist-Friendly.</h2>
            <p className="text-xl text-gray-600">
              We make music distribution easy and straightforward, so you can focus on creating great music.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M8 19l3 3 3-3"></path>
                  <path d="M8 5l3-3 3 3"></path>
                  <path d="M11 2v20"></path>
                </svg>
              }
              title="Simple Uploads" 
              description="Just upload your track, artwork, and metadata. We handle all the technical details."
              delay={100}
            />
            
            <FeatureCard 
              icon={
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
              }
              title="Quality First" 
              description="We manually review each submission to ensure the highest quality standards."
              delay={200}
            />
            
            <FeatureCard 
              icon={
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <circle cx="12" cy="12" r="4"></circle>
                </svg>
              }
              title="Wide Distribution" 
              description="Your music will be delivered to all major streaming platforms worldwide."
              delay={300}
            />
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 bg-white">
        <div className="container px-4 mx-auto max-w-screen-xl">
          <div className="max-w-3xl mx-auto text-center mb-16 reveal opacity-0 translate-y-10 transition-all duration-1000">
            <span className="px-3 py-1 text-xs font-medium tracking-wider text-gray-900 uppercase bg-gray-200 rounded-full inline-block mb-6">
              The Process
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">How It Works</h2>
            <p className="text-xl text-gray-600">
              We've streamlined the distribution process to make it as simple as possible.
            </p>
          </div>
          
          <div className="relative max-w-4xl mx-auto">
            <div className="absolute left-[calc(50%-1px)] top-0 bottom-0 w-0.5 bg-gray-200 md:block hidden"></div>
            
            <StepCard 
              number="01" 
              title="Submit Your Music" 
              description="Fill out our submission form with your track information and upload your music file and artwork."
              isLeft={true}
              delay={100}
            />
            
            <StepCard 
              number="02" 
              title="Expert Review" 
              description="Our team reviews your submission to ensure everything is ready for distribution."
              isLeft={false}
              delay={300}
            />
            
            <StepCard 
              number="03" 
              title="Distribution" 
              description="Once approved, we prepare your music for distribution to all major streaming platforms."
              isLeft={true}
              delay={500}
            />
            
            <StepCard 
              number="04" 
              title="Go Live" 
              description="Your music goes live on all platforms and starts reaching listeners worldwide."
              isLeft={false}
              delay={700}
            />
          </div>
        </div>
      </section>
      
      {/* Submission Section */}
      <section id="submit" className="py-24 bg-gray-50">
        <div className="container px-4 mx-auto max-w-screen-xl">
          <div className="max-w-3xl mx-auto text-center mb-16 reveal opacity-0 translate-y-10 transition-all duration-1000">
            <span className="px-3 py-1 text-xs font-medium tracking-wider text-gray-900 uppercase bg-gray-200 rounded-full inline-block mb-6">
              Submit Now
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Share Your Music?</h2>
            <p className="text-xl text-gray-600">
              Fill out the form below to submit your music for distribution.
            </p>
          </div>
          
          <div className="reveal opacity-0 translate-y-10 transition-all duration-1000">
            <SubmissionForm />
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-12 bg-black text-white">
        <div className="container px-4 mx-auto max-w-screen-xl">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-8 md:mb-0">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <circle cx="12" cy="12" r="4"></circle>
                  </svg>
                </div>
                <span className="text-xl font-bold">SoundFlow</span>
              </div>
              <p className="text-gray-400 text-sm max-w-xs">
                Amplifying independent artists worldwide through simple, transparent music distribution.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider mb-4">Company</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">About</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Team</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Careers</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider mb-4">Resources</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Blog</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">FAQs</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Support</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider mb-4">Legal</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Privacy</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Terms</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Copyright</a></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">© 2023 SoundFlow. All rights reserved.</p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">Twitter</span>
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">Instagram</span>
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.045-1.064.218-1.504.344-1.857-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.048 1.023-.058 1.351-.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058v

