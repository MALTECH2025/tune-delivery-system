
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavigationBar from '@/components/NavigationBar';
import Hero from '@/components/Hero';
import SubmissionForm from '@/components/SubmissionForm';
import { useAuth } from '@/contexts/AuthContext';
import { ArrowRight, Music, Award, BarChart, Users, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Feature card component
const FeatureCard = ({ icon, title, description, delay }) => {
  return (
    <div 
      className="bg-card p-8 rounded-xl shadow-md border border-border hover:border-primary/20 reveal opacity-0 translate-y-10 transition-all duration-1000" 
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="w-12 h-12 bg-red-600 rounded-lg text-white flex items-center justify-center mb-6">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

// Stats card component
const StatsCard = ({ title, value, icon }) => {
  return (
    <div className="bg-card p-6 rounded-xl shadow-md border border-border text-center hover:shadow-lg transition-all">
      <div className="w-12 h-12 mx-auto bg-red-600/10 rounded-full flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-3xl font-bold mb-2">{value}</h3>
      <p className="text-muted-foreground">{title}</p>
    </div>
  );
};

// Testimonial component
const Testimonial = ({ quote, author, position }) => {
  return (
    <div className="bg-card p-8 rounded-xl shadow-md border border-border">
      <div className="mb-4">
        <svg className="w-8 h-8 text-red-600" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
        </svg>
      </div>
      <p className="text-lg mb-6">{quote}</p>
      <div>
        <p className="font-semibold">{author}</p>
        <p className="text-muted-foreground text-sm">{position}</p>
      </div>
    </div>
  );
};

// Pricing tier component
const PricingTier = ({ name, price, features, recommended = false }) => {
  return (
    <div className={`bg-card rounded-xl shadow-md border ${recommended ? 'border-red-500' : 'border-border'} relative overflow-hidden`}>
      {recommended && (
        <div className="absolute top-0 right-0 bg-red-600 text-white px-4 py-1 text-xs font-medium">
          RECOMMENDED
        </div>
      )}
      <div className="p-8">
        <h3 className="text-xl font-bold mb-2">{name}</h3>
        <div className="mb-4">
          <span className="text-3xl font-bold">${price}</span>
          <span className="text-muted-foreground ml-1">/month</span>
        </div>
        <div className="space-y-3 mb-6">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start">
              <Check className="text-green-500 h-5 w-5 mr-2 mt-0.5" />
              <span>{feature}</span>
            </div>
          ))}
        </div>
        <Button className={`w-full ${recommended ? 'bg-red-600 hover:bg-red-700' : ''}`}>
          Choose Plan
        </Button>
      </div>
    </div>
  );
};

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
    <main className="min-h-screen bg-background overflow-x-hidden">
      <NavigationBar />
      
      <Hero />
      
      {/* Stats Section */}
      <section className="py-20 bg-muted/30">
        <div className="container px-4 mx-auto max-w-screen-xl">
          <div className="max-w-3xl mx-auto text-center mb-16 reveal opacity-0 translate-y-10 transition-all duration-1000">
            <span className="px-3 py-1 text-xs font-medium tracking-wider text-primary uppercase bg-primary/10 rounded-full inline-block mb-6">
              Our Impact
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Growing Artist Community</h2>
            <p className="text-xl text-muted-foreground">
              Join thousands of independent artists who trust MALPINOHDistro to share their music with the world.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <StatsCard 
              title="Artists" 
              value="5,000+" 
              icon={<Users className="text-red-600 w-6 h-6" />}
            />
            <StatsCard 
              title="Tracks Distributed" 
              value="25,000+" 
              icon={<Music className="text-red-600 w-6 h-6" />}
            />
            <StatsCard 
              title="Platforms" 
              value="150+" 
              icon={<Award className="text-red-600 w-6 h-6" />}
            />
            <StatsCard 
              title="Monthly Streams" 
              value="10M+" 
              icon={<BarChart className="text-red-600 w-6 h-6" />}
            />
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section id="features" className="py-24 bg-background">
        <div className="container px-4 mx-auto max-w-screen-xl">
          <div className="max-w-3xl mx-auto text-center mb-16 reveal opacity-0 translate-y-10 transition-all duration-1000">
            <span className="px-3 py-1 text-xs font-medium tracking-wider text-primary uppercase bg-primary/10 rounded-full inline-block mb-6">
              Our Process
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Simple. Transparent. Artist-Friendly.</h2>
            <p className="text-xl text-muted-foreground">
              We make music distribution easy and straightforward, so you can focus on creating great music.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Music className="w-6 h-6" />}
              title="Global Distribution" 
              description="Get your music on all major streaming platforms worldwide with just a few clicks."
              delay={100}
            />
            
            <FeatureCard 
              icon={<Award className="w-6 h-6" />}
              title="Keep 100% Rights" 
              description="Maintain full ownership of your music and creative control over your artistic vision."
              delay={200}
            />
            
            <FeatureCard 
              icon={<BarChart className="w-6 h-6" />}
              title="Detailed Analytics" 
              description="Track your performance with comprehensive analytics and royalty reporting."
              delay={300}
            />
          </div>
        </div>
      </section>
      
      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-muted/30">
        <div className="container px-4 mx-auto max-w-screen-xl">
          <div className="max-w-3xl mx-auto text-center mb-16 reveal opacity-0 translate-y-10 transition-all duration-1000">
            <span className="px-3 py-1 text-xs font-medium tracking-wider text-primary uppercase bg-primary/10 rounded-full inline-block mb-6">
              Pricing Plans
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Choose Your Plan</h2>
            <p className="text-xl text-muted-foreground">
              Affordable subscription options designed for independent artists at every stage of their career.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 reveal opacity-0 translate-y-10 transition-all duration-1000">
            <PricingTier 
              name="Monthly" 
              price="12.99" 
              features={[
                "Unlimited releases",
                "Access to all platforms",
                "Basic analytics",
                "24/7 support",
                "Keep 100% of your rights"
              ]} 
            />
            
            <PricingTier 
              name="Quarterly" 
              price="15.00" 
              features={[
                "Everything in Monthly",
                "Advanced analytics",
                "Faster release turnaround",
                "Professional mixing tips",
                "Priority support"
              ]} 
              recommended={true}
            />
            
            <PricingTier 
              name="Yearly" 
              price="22.58" 
              features={[
                "Everything in Quarterly",
                "Premium analytics dashboard",
                "Marketing consultation",
                "Playlist pitching assistance",
                "Dedicated account manager"
              ]} 
            />
          </div>
          
          <div className="max-w-3xl mx-auto text-center mt-10 text-sm text-muted-foreground">
            <p>*All prices are in USD. Local currency conversion rates are applied at checkout.</p>
            <p className="mt-1">*Payment is made to OpayWallet: Account #8168940582, Account Name: Abdulkadir Ibrahim Oluwashina</p>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-24 bg-background">
        <div className="container px-4 mx-auto max-w-screen-xl">
          <div className="max-w-3xl mx-auto text-center mb-16 reveal opacity-0 translate-y-10 transition-all duration-1000">
            <span className="px-3 py-1 text-xs font-medium tracking-wider text-primary uppercase bg-primary/10 rounded-full inline-block mb-6">
              Testimonials
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">What Our Artists Say</h2>
            <p className="text-xl text-muted-foreground">
              Hear from independent artists who have found success with MALPINOHDistro.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Testimonial 
              quote="MALPINOHDistro helped me get my music on all major platforms with no hassle. Their team is responsive and really cares about independent artists."
              author="James Wilson"
              position="Independent Artist"
            />
            <Testimonial 
              quote="The transparency in royalty payments and the straightforward process makes MALPINOHDistro my go-to distributor for all my releases."
              author="Sarah Johnson"
              position="Singer-Songwriter"
            />
            <Testimonial 
              quote="I was skeptical at first, but the results speak for themselves. My music is reaching new listeners every day thanks to MALPINOHDistro."
              author="Michael Brown"
              position="Producer"
            />
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-24 bg-muted/30">
        <div className="container px-4 mx-auto max-w-screen-xl">
          <div className="max-w-3xl mx-auto text-center reveal opacity-0 translate-y-10 transition-all duration-1000">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Share Your Music?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of artists who trust MALPINOHDistro for their music distribution needs.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button 
                size="lg" 
                className="bg-red-600 hover:bg-red-700 text-white"
                onClick={() => navigate('/signup')}
              >
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => navigate('/login')}
              >
                Login
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-12 bg-gray-900 text-white">
        <div className="container px-4 mx-auto max-w-screen-xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <img 
                  src="/lovable-uploads/33be2c38-edf9-42e0-aa88-0b492632243d.png" 
                  alt="MALPINOHDistro Logo" 
                  className="h-10 w-10"
                />
                <span className="text-xl font-bold">MALPINOHDistro</span>
              </div>
              <p className="text-gray-400 text-sm max-w-xs mb-6">
                Amplifying independent artists worldwide through simple, transparent music distribution.
              </p>
              <div className="flex space-x-4">
                <a href="https://twitter.com/malpinoh__" className="text-gray-400 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">
                  <span className="sr-only">Twitter</span>
                  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="https://instagram.com/malpinohdistro" className="text-gray-400 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">
                  <span className="sr-only">Instagram</span>
                  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858-.182-.466-.398-.8-.748-1.15-.35-.35-.683-.566-1.15-.748-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider mb-4">Company</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Our Team</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider mb-4">Resources</h3>
              <ul className="space-y-3">
                <li><a href="/faqs" className="text-gray-400 hover:text-white transition-colors text-sm">FAQs</a></li>
                <li><a href="/support" className="text-gray-400 hover:text-white transition-colors text-sm">Support</a></li>
                <li><a href="/pricing" className="text-gray-400 hover:text-white transition-colors text-sm">Pricing</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Blog</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider mb-4">Legal</h3>
              <ul className="space-y-3">
                <li><a href="/privacy" className="text-gray-400 hover:text-white transition-colors text-sm">Privacy Policy</a></li>
                <li><a href="/terms" className="text-gray-400 hover:text-white transition-colors text-sm">Terms of Service</a></li>
                <li><a href="/copyright" className="text-gray-400 hover:text-white transition-colors text-sm">Copyright Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">© 2024 MALPINOHDistro. All rights reserved.</p>
            <p className="text-gray-400 text-sm">
              Made with ❤️ for independent artists worldwide
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default Index;
