
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import NavigationBar from '@/components/NavigationBar';

const FAQs = () => {
  return (
    <div className="min-h-screen bg-background">
      <NavigationBar />
      
      <div className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Find answers to common questions about MALPINOHDistro's services and policies.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <Card className="mb-8">
              <CardContent className="pt-6">
                <h2 className="text-2xl font-bold mb-4">General Information</h2>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="general-1">
                    <AccordionTrigger>What is MALPINOHDistro?</AccordionTrigger>
                    <AccordionContent>
                      MALPINOHDistro is a digital music distribution service that helps independent artists and labels get their music onto all major streaming platforms including Spotify, Apple Music, Amazon Music, YouTube Music, TikTok, and more. We provide affordable distribution with transparent royalty collection and payments.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="general-2">
                    <AccordionTrigger>How much does it cost to distribute my music?</AccordionTrigger>
                    <AccordionContent>
                      We offer flexible pricing plans starting from a simple pay-per-release model with no annual fees. Our standard distribution fee is competitively priced to make music distribution accessible to all artists. Please check our pricing page for current rates and special offers.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="general-3">
                    <AccordionTrigger>Which platforms do you distribute to?</AccordionTrigger>
                    <AccordionContent>
                      We distribute to all major streaming services and digital stores including Spotify, Apple Music, Amazon Music, YouTube Music, TikTok, Instagram/Facebook, Deezer, Tidal, Pandora, and over 150 other platforms worldwide.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
            
            <Card className="mb-8">
              <CardContent className="pt-6">
                <h2 className="text-2xl font-bold mb-4">Submission & Distribution</h2>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="submission-1">
                    <AccordionTrigger>What are the requirements for my music submission?</AccordionTrigger>
                    <AccordionContent>
                      Your audio files should be WAV, FLAC, or high-quality MP3 (320kbps). Cover artwork must be at least 3000x3000 pixels in JPG or PNG format. All submissions must comply with our content guidelines and you must own or have proper licenses for all content.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="submission-2">
                    <AccordionTrigger>How long does it take for my release to go live?</AccordionTrigger>
                    <AccordionContent>
                      After approval, your music typically appears on major platforms within 5-10 business days. Some platforms like Spotify and Apple Music may be quicker (2-3 days), while others can take up to 2 weeks. Pre-releases can be scheduled up to 6 months in advance.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="submission-3">
                    <AccordionTrigger>Can I use samples or covers in my music?</AccordionTrigger>
                    <AccordionContent>
                      For samples, you must have proper clearance or licenses for any copyrighted material used in your tracks. For cover songs, we can help with mechanical licensing, but you'll need to declare it during submission and additional fees may apply.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="submission-4">
                    <AccordionTrigger>Can I make changes to my release after submission?</AccordionTrigger>
                    <AccordionContent>
                      Minor metadata changes might be possible before your music goes live, but audio files and artwork cannot be modified once submitted. For significant changes, you may need to remove the current release and submit a new one.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
            
            <Card className="mb-8">
              <CardContent className="pt-6">
                <h2 className="text-2xl font-bold mb-4">Royalties & Payments</h2>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="royalties-1">
                    <AccordionTrigger>How do royalty payments work?</AccordionTrigger>
                    <AccordionContent>
                      We collect 100% of your streaming and download royalties from all platforms and pay you according to our revenue share model. Royalties are calculated monthly and paid out within 45 days of the end of each month, provided your balance meets the minimum withdrawal amount.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="royalties-2">
                    <AccordionTrigger>What is the minimum withdrawal amount?</AccordionTrigger>
                    <AccordionContent>
                      The minimum withdrawal amount is $25. Once your balance reaches this threshold, you can request a payout to your linked OPay wallet.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="royalties-3">
                    <AccordionTrigger>How do I link my OPay wallet for payments?</AccordionTrigger>
                    <AccordionContent>
                      You can link your OPay wallet in your account settings. Navigate to Settings > Payment Methods > Add OPay Wallet, and enter your OPay account details. This wallet will be used for all your future royalty payments.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="royalties-4">
                    <AccordionTrigger>Are there any payment processing fees?</AccordionTrigger>
                    <AccordionContent>
                      There are no additional fees for standard payouts to OPay wallets. However, if you request alternative payment methods, additional processing fees may apply.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-2xl font-bold mb-4">Account & Support</h2>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="account-1">
                    <AccordionTrigger>How do I contact customer support?</AccordionTrigger>
                    <AccordionContent>
                      You can reach our support team via WhatsApp at +2347072218477, email at support@malpinohdistro.com, or through the support chat on our website. We aim to respond to all inquiries within 24-48 hours.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="account-2">
                    <AccordionTrigger>Can I delete my account?</AccordionTrigger>
                    <AccordionContent>
                      Yes, you can request account deletion by contacting our support team. Please note that this will affect your active distributions and royalty collection. We recommend withdrawing any available balance before requesting account deletion.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="account-3">
                    <AccordionTrigger>How do I update my artist profile?</AccordionTrigger>
                    <AccordionContent>
                      You can update your artist profile information in your account settings. Note that changes to your artist name or profile may take time to reflect across all platforms.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
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
              <a href="/support" className="text-muted-foreground hover:text-red-600 transition-colors">Support</a>
              <a href="/copyright" className="text-muted-foreground hover:text-red-600 transition-colors">Copyright</a>
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

export default FAQs;
