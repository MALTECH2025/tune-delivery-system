
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import NavigationBar from '@/components/NavigationBar';

const Privacy = () => {
  return (
    <div className="min-h-screen bg-background">
      <NavigationBar />
      
      <div className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Last updated: May 15, 2024
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <Card className="mb-8">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
                <p className="text-card-foreground mb-4">
                  MALPINOHDistro ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and services.
                </p>
                <p className="text-card-foreground">
                  Please read this Privacy Policy carefully. By accessing or using our services, you acknowledge that you have read, understood, and agree to be bound by all the terms outlined in this policy.
                </p>
              </CardContent>
            </Card>
            
            <Card className="mb-8">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4">2. Information We Collect</h2>
                <p className="text-card-foreground mb-4">
                  We may collect the following categories of information:
                </p>
                
                <h3 className="text-xl font-semibold mb-2">2.1 Personal Information</h3>
                <ul className="list-disc list-inside space-y-2 text-card-foreground mb-4">
                  <li>Contact information (name, email address, phone number)</li>
                  <li>Account information (username, password)</li>
                  <li>Payment information (billing address, payment method details)</li>
                  <li>Artist/creator information (artist name, biography)</li>
                  <li>Government-issued identification (for verification purposes)</li>
                </ul>
                
                <h3 className="text-xl font-semibold mb-2">2.2 Content</h3>
                <ul className="list-disc list-inside space-y-2 text-card-foreground mb-4">
                  <li>Music files and associated metadata</li>
                  <li>Artwork, images, and promotional materials</li>
                  <li>Communications with our support team</li>
                </ul>
                
                <h3 className="text-xl font-semibold mb-2">2.3 Usage Data</h3>
                <ul className="list-disc list-inside space-y-2 text-card-foreground">
                  <li>Log data (IP address, browser type, pages visited)</li>
                  <li>Device information (hardware model, operating system)</li>
                  <li>Analytics data about your interactions with our website</li>
                  <li>Cookies and similar tracking technologies</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="mb-8">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4">3. How We Use Your Information</h2>
                <p className="text-card-foreground mb-4">
                  We use the information we collect for various purposes, including:
                </p>
                <ul className="list-disc list-inside space-y-2 text-card-foreground">
                  <li>Providing, maintaining, and improving our services</li>
                  <li>Processing and fulfilling your music distribution requests</li>
                  <li>Managing your account and providing customer support</li>
                  <li>Processing payments and tracking royalties</li>
                  <li>Communicating with you about our services, updates, and promotions</li>
                  <li>Analyzing usage trends and optimizing our website</li>
                  <li>Preventing fraudulent activity and ensuring compliance with our terms</li>
                  <li>Fulfilling legal obligations and enforcing our rights</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="mb-8">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4">4. Sharing Your Information</h2>
                <p className="text-card-foreground mb-4">
                  We may share your information with:
                </p>
                <ul className="list-disc list-inside space-y-2 text-card-foreground">
                  <li>Digital music platforms and stores (as necessary to distribute your content)</li>
                  <li>Service providers and business partners who assist us in operating our business</li>
                  <li>Legal and regulatory authorities (when required by law)</li>
                  <li>Potential buyers in the event of a merger, acquisition, or sale of assets</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="mb-8">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4">5. Data Security</h2>
                <p className="text-card-foreground">
                  We implement appropriate security measures to protect your information from unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
                </p>
              </CardContent>
            </Card>
            
            <Card className="mb-8">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4">6. Your Rights and Choices</h2>
                <p className="text-card-foreground mb-4">
                  Depending on your location, you may have rights regarding your personal information, including:
                </p>
                <ul className="list-disc list-inside space-y-2 text-card-foreground">
                  <li>Accessing, correcting, or deleting your personal information</li>
                  <li>Objecting to or restricting certain processing activities</li>
                  <li>Requesting portability of your personal information</li>
                  <li>Withdrawing consent (where processing is based on consent)</li>
                  <li>Opting out of marketing communications</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="mb-8">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4">7. Children's Privacy</h2>
                <p className="text-card-foreground">
                  Our services are not intended for individuals under the age of 18. We do not knowingly collect personal information from children. If you are a parent or guardian and believe your child has provided us with personal information, please contact us.
                </p>
              </CardContent>
            </Card>
            
            <Card className="mb-8">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4">8. Changes to This Privacy Policy</h2>
                <p className="text-card-foreground">
                  We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. You are advised to review this Privacy Policy periodically for any changes.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4">9. Contact Us</h2>
                <p className="text-card-foreground mb-4">
                  If you have any questions or concerns about this Privacy Policy or our privacy practices, please contact us at:
                </p>
                <p className="text-card-foreground">
                  Email: <a href="mailto:privacy@malpinohdistro.com" className="text-red-600 hover:underline">privacy@malpinohdistro.com</a><br />
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
              <a href="/terms" className="text-muted-foreground hover:text-red-600 transition-colors">Terms</a>
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

export default Privacy;
