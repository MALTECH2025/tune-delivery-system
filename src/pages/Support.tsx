
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { MessageSquare, Mail, Phone } from 'lucide-react';
import NavigationBar from '@/components/NavigationBar';

const Support = () => {
  const whatsappNumber = "+2347072218477";
  const whatsappUrl = `https://wa.me/${whatsappNumber}`;
  
  return (
    <div className="min-h-screen bg-background">
      <NavigationBar />
      
      <div className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Support Center</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We're here to help! Get in touch with our support team or browse our resources.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <Card className="text-center">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <MessageSquare className="h-10 w-10 text-red-600" />
                </div>
                <CardTitle>WhatsApp Support</CardTitle>
                <CardDescription>
                  Get quick responses via WhatsApp
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Our team is available Monday-Friday, 9am-5pm WAT</p>
                <Button 
                  className="w-full bg-green-600 hover:bg-green-700 flex items-center justify-center gap-2"
                  onClick={() => window.open(whatsappUrl, '_blank')}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.297-.497.1-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Chat on WhatsApp
                </Button>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <Mail className="h-10 w-10 text-red-600" />
                </div>
                <CardTitle>Email Support</CardTitle>
                <CardDescription>
                  Send us an email anytime
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">We respond to all emails within 24-48 hours</p>
                <Button 
                  className="w-full"
                  onClick={() => window.location.href = 'mailto:support@malpinohdistro.com'}
                >
                  Email Us
                </Button>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <Phone className="h-10 w-10 text-red-600" />
                </div>
                <CardTitle>Phone Support</CardTitle>
                <CardDescription>
                  Call us directly for urgent matters
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Available for business-critical issues only</p>
                <Button 
                  variant="outline"
                  className="w-full"
                  onClick={() => window.location.href = 'tel:+2347072218477'}
                >
                  Call Support
                </Button>
              </CardContent>
            </Card>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
            
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>How long does it take for my music to appear on streaming platforms?</AccordionTrigger>
                <AccordionContent>
                  After submission and approval, your music typically appears on major platforms within 5-10 business days. Some platforms like Spotify and Apple Music may take 2-3 days, while others like TikTok may take up to 2 weeks.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2">
                <AccordionTrigger>How and when do I get paid my royalties?</AccordionTrigger>
                <AccordionContent>
                  Royalties are calculated monthly and paid out within 45 days of the end of each month, provided your balance meets the minimum withdrawal amount of $25. Payments are made directly to your linked OPay wallet.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3">
                <AccordionTrigger>What audio formats do you accept?</AccordionTrigger>
                <AccordionContent>
                  We accept WAV, FLAC, and high-quality MP3 files (320kbps). For best results, we recommend uploading WAV or FLAC files with a minimum of 44.1kHz/16-bit quality.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-4">
                <AccordionTrigger>Can I change my release after it's been submitted?</AccordionTrigger>
                <AccordionContent>
                  Minor changes to metadata may be possible before the release goes live on platforms, but audio files and artwork cannot be changed once submitted. For significant changes, you may need to take down the current release and submit a new one.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-5">
                <AccordionTrigger>How do I link my OPay wallet for payments?</AccordionTrigger>
                <AccordionContent>
                  You can link your OPay wallet in your account settings. Navigate to Settings {'>'} Payment Methods {'>'} Add OPay Wallet, and enter your OPay account details. This wallet will be used for all your future royalty payments.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
      
      <footer className="bg-card border-t border-border py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <img src="/lovable-uploads/33be2c38-edf9-42e0-aa88-0b492632243d.png" alt="MALPINOHDistro Logo" className="h-8 mb-2" />
              <p className="text-sm text-muted-foreground">
                Amplifying independent artists worldwide.
              </p>
            </div>
            <div className="flex space-x-6">
              <a href="/terms" className="text-muted-foreground hover:text-red-600 transition-colors">Terms</a>
              <a href="/privacy" className="text-muted-foreground hover:text-red-600 transition-colors">Privacy</a>
              <a href="/copyright" className="text-muted-foreground hover:text-red-600 transition-colors">Copyright</a>
              <a href="/faqs" className="text-muted-foreground hover:text-red-600 transition-colors">FAQs</a>
            </div>
          </div>
          <div className="mt-6 border-t border-border pt-6 text-center text-sm text-muted-foreground">
            © 2024 MALPINOHDistro. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Support;
