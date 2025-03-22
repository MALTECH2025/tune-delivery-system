
import React, { useEffect } from 'react';
import NavigationBar from '@/components/NavigationBar';
import Hero from '@/components/Hero';
import SubmissionForm from '@/components/SubmissionForm';

const Index = () => {
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
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"></path>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">YouTube</span>
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
      
      {/* Custom CSS for scroll reveal - Fixed by removing the jsx property */}
      <style>
        {`
        .reveal {
          opacity: 0;
          transform: translateY(30px);
          transition: all 1s ease;
        }
        
        .reveal.active {
          opacity: 1;
          transform: translateY(0);
        }
        `}
      </style>
    </main>
  );
};

// Feature Card Component
interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, delay }) => {
  return (
    <div 
      className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow reveal opacity-0 translate-y-10"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-6">
        <div className="text-gray-900">
          {icon}
        </div>
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

// Step Card Component
interface StepCardProps {
  number: string;
  title: string;
  description: string;
  isLeft: boolean;
  delay: number;
}

const StepCard: React.FC<StepCardProps> = ({ number, title, description, isLeft, delay }) => {
  return (
    <div className="mb-12 md:mb-24 relative">
      <div 
        className={`flex flex-col ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'} items-center`}
      >
        <div 
          className={`w-full md:w-1/2 ${isLeft ? 'md:pr-12 md:text-right' : 'md:pl-12'} reveal opacity-0 ${isLeft ? '-translate-x-10' : 'translate-x-10'}`}
          style={{ transitionDelay: `${delay}ms` }}
        >
          <span className="text-5xl font-bold text-gray-200">{number}</span>
          <h3 className="text-2xl font-bold mb-3 mt-1">{title}</h3>
          <p className="text-gray-600">{description}</p>
        </div>
        
        <div className="hidden md:flex items-center justify-center w-16 h-16 bg-white rounded-full shadow-md z-10 my-8 md:my-0">
          <div className="w-4 h-4 bg-black rounded-full"></div>
        </div>
        
        <div className="w-full md:w-1/2"></div>
      </div>
    </div>
  );
};

export default Index;
