
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import NavigationBar from '@/components/NavigationBar';

const Terms = () => {
  return (
    <div className="min-h-screen bg-background">
      <NavigationBar />
      
      <div className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Last updated: May 15, 2024
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <Card className="mb-8">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4">1. Agreement to Terms</h2>
                <p className="text-card-foreground mb-4">
                  These Terms of Service constitute a legally binding agreement made between you and MALPINOHDistro ("we," "us," or "our") concerning your use of our website and music distribution services.
                </p>
                <p className="text-card-foreground">
                  By accessing our website or using our services, you agree to be bound by these Terms. If you disagree with any part of these Terms, you may not access our website or use our services.
                </p>
              </CardContent>
            </Card>
            
            <Card className="mb-8">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4">2. Service Description</h2>
                <p className="text-card-foreground mb-4">
                  MALPINOHDistro provides digital music distribution services, enabling artists to distribute their music to various digital platforms and streaming services. Our services may include:
                </p>
                <ul className="list-disc list-inside space-y-2 text-card-foreground">
                  <li>Digital distribution of music to streaming platforms and online stores</li>
                  <li>Royalty collection and payment processing</li>
                  <li>Analytics and reporting on music performance</li>
                  <li>Artist profile management</li>
                  <li>Content storage and management</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="mb-8">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4">3. Account Registration</h2>
                <p className="text-card-foreground mb-4">
                  To access our services, you must create an account. When registering, you agree to provide accurate, current, and complete information. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
                </p>
                <p className="text-card-foreground">
                  We reserve the right to suspend or terminate your account if we have reason to believe that the information you provided is inaccurate, outdated, or incomplete, or if you have violated these Terms.
                </p>
              </CardContent>
            </Card>
            
            <Card className="mb-8">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4">4. Content Submission and Rights</h2>
                <p className="text-card-foreground mb-4">
                  By submitting content to MALPINOHDistro, you represent and warrant that:
                </p>
                <ul className="list-disc list-inside space-y-2 text-card-foreground mb-4">
                  <li>You own or control all rights to the content or have obtained all necessary permissions and licenses.</li>
                  <li>Your content does not infringe upon or violate the rights of any third party.</li>
                  <li>Your content complies with all applicable laws and regulations.</li>
                  <li>Your content does not contain material that is defamatory, obscene, or otherwise offensive.</li>
                </ul>
                <p className="text-card-foreground mb-4">
                  You grant MALPINOHDistro a non-exclusive, worldwide, royalty-free license to use, reproduce, distribute, and display your content for the purpose of providing and promoting our services. This license remains in effect for as long as your content is distributed through our services.
                </p>
                <p className="text-card-foreground">
                  We reserve the right to refuse or remove any content that we believe violates these Terms or is otherwise objectionable, at our sole discretion.
                </p>
              </CardContent>
            </Card>
            
            <Card className="mb-8">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4">5. Payment and Royalties</h2>
                <p className="text-card-foreground mb-4">
                  You will receive royalties for the use of your content according to our payment schedule and the terms of our revenue share model. Royalties are calculated based on reports received from digital platforms and are subject to their accuracy.
                </p>
                <p className="text-card-foreground mb-4">
                  Minimum withdrawal amount is $25. Once your balance reaches this threshold, you can request a payout to your linked OPay wallet.
                </p>
                <p className="text-card-foreground">
                  MALPINOHDistro reserves the right to deduct any applicable fees, taxes, or other charges from your royalties in accordance with our pricing terms and applicable law.
                </p>
              </CardContent>
            </Card>
            
            <Card className="mb-8">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4">6. Termination</h2>
                <p className="text-card-foreground mb-4">
                  We may terminate or suspend your account and access to our services at any time, without prior notice or liability, for any reason, including if you breach these Terms.
                </p>
                <p className="text-card-foreground">
                  You may terminate your account at any time by contacting us. Upon termination, your content will be removed from digital platforms according to their respective removal policies, which may take time.
                </p>
              </CardContent>
            </Card>
            
            <Card className="mb-8">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4">7. Limitation of Liability</h2>
                <p className="text-card-foreground mb-4">
                  To the maximum extent permitted by law, MALPINOHDistro shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly.
                </p>
                <p className="text-card-foreground">
                  Our total liability for any claim arising from or related to these Terms or our services shall not exceed the total amount you paid to us in the six months preceding the claim.
                </p>
              </CardContent>
            </Card>
            
            <Card className="mb-8">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4">8. Indemnification</h2>
                <p className="text-card-foreground">
                  You agree to indemnify, defend, and hold harmless MALPINOHDistro and its officers, directors, employees, agents, and affiliates from and against any and all claims, damages, obligations, losses, liabilities, costs, and expenses arising from or related to your use of our services, your content, or your violation of these Terms.
                </p>
              </CardContent>
            </Card>
            
            <Card className="mb-8">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4">9. Changes to Terms</h2>
                <p className="text-card-foreground">
                  We reserve the right to modify these Terms at any time. We will notify you of significant changes by posting the updated Terms on our website and updating the "Last updated" date. Your continued use of our services after such modifications constitutes your acceptance of the revised Terms.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4">10. Contact Information</h2>
                <p className="text-card-foreground">
                  If you have any questions about these Terms, please contact us at:<br />
                  Email: <a href="mailto:legal@malpinohdistro.com" className="text-red-600 hover:underline">legal@malpinohdistro.com</a><br />
                  WhatsApp: +2347072218477
                </p>
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
              <a href="/privacy" className="text-muted-foreground hover:text-red-600 transition-colors">Privacy</a>
              <a href="/copyright" className="text-muted-foreground hover:text-red-600 transition-colors">Copyright</a>
              <a href="/support" className="text-muted-foreground hover:text-red-600 transition-colors">Support</a>
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

export default Terms;
