
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import NavigationBar from '@/components/NavigationBar';

const Copyright = () => {
  return (
    <div className="min-h-screen bg-background">
      <NavigationBar />
      
      <div className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Copyright Policy</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Information about copyright protection, infringement, and our policies.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <Card className="mb-8">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4">Copyright Ownership</h2>
                <p className="text-card-foreground mb-4">
                  By submitting content to MALPINOHDistro for distribution, you represent and warrant that:
                </p>
                <ul className="list-disc list-inside space-y-2 text-card-foreground mb-6">
                  <li>You own or control all rights to the content you submit, including the sound recordings and musical compositions.</li>
                  <li>You have obtained proper licenses for any samples, covers, or third-party content used in your music.</li>
                  <li>Your content does not infringe upon the copyright, trademark, or other intellectual property rights of any third party.</li>
                  <li>You have the full legal authority to grant MALPINOHDistro the rights necessary to distribute your content as outlined in our Terms of Service.</li>
                </ul>
                <p className="text-card-foreground">
                  MALPINOHDistro does not claim ownership of your content. You retain all ownership rights to your music.
                </p>
              </CardContent>
            </Card>
            
            <Card className="mb-8">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4">DMCA Compliance</h2>
                <p className="text-card-foreground mb-4">
                  MALPINOHDistro respects the intellectual property rights of others and complies with the Digital Millennium Copyright Act (DMCA). If you believe that your work has been used in a way that constitutes copyright infringement, please provide us with a written notice containing the following information:
                </p>
                <ol className="list-decimal list-inside space-y-2 text-card-foreground mb-6">
                  <li>An electronic or physical signature of the person authorized to act on behalf of the copyright owner.</li>
                  <li>A description of the copyrighted work that you claim has been infringed.</li>
                  <li>The URL or other specific location where the alleged infringing material is located.</li>
                  <li>Your contact information, including address, telephone number, and email address.</li>
                  <li>A statement by you that you have a good faith belief that the disputed use is not authorized by the copyright owner, its agent, or the law.</li>
                  <li>A statement by you, made under penalty of perjury, that the information in your notice is accurate and that you are the copyright owner or authorized to act on the copyright owner's behalf.</li>
                </ol>
                <p className="text-card-foreground">
                  Submit copyright infringement notices to: <a href="mailto:copyright@malpinohdistro.com" className="text-red-600 hover:underline">copyright@malpinohdistro.com</a>
                </p>
              </CardContent>
            </Card>
            
            <Card className="mb-8">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4">Content Monitoring</h2>
                <p className="text-card-foreground mb-6">
                  MALPINOHDistro employs content recognition systems to help identify potentially infringing content. However, these systems are not infallible. We review all submissions to the best of our ability but rely on our users to ensure they have the necessary rights for all content they submit.
                </p>
                <p className="text-card-foreground">
                  We reserve the right to reject or remove any content that we determine, in our sole discretion, may infringe upon the rights of third parties, violate our Terms of Service, or otherwise expose MALPINOHDistro to potential legal liability.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4">Repeat Infringer Policy</h2>
                <p className="text-card-foreground mb-6">
                  MALPINOHDistro maintains a strict policy against copyright infringement and will terminate user accounts that repeatedly infringe or are believed to be repeatedly infringing the rights of copyright holders.
                </p>
                <p className="text-card-foreground mb-6">
                  If your content is removed due to a copyright complaint, and you believe the removal was in error, you may submit a counter-notification containing:
                </p>
                <ol className="list-decimal list-inside space-y-2 text-card-foreground mb-6">
                  <li>Your physical or electronic signature.</li>
                  <li>Identification of the content that has been removed or to which access has been disabled, including the location where the content appeared before it was removed or disabled.</li>
                  <li>A statement under penalty of perjury that you have a good faith belief that the content was removed or disabled as a result of mistake or misidentification.</li>
                  <li>Your name, address, telephone number, and email address.</li>
                  <li>A statement that you consent to the jurisdiction of the Federal District Court for the judicial district in which your address is located, or if your address is outside of the United States, for any judicial district in which MALPINOHDistro may be found.</li>
                  <li>A statement that you will accept service of process from the person who provided notification of the alleged infringement.</li>
                </ol>
                <p className="text-card-foreground">
                  MALPINOHDistro will forward counter-notifications to the original complainant. Please be aware that you may be liable for damages (including costs and attorneys' fees) if you materially misrepresent that a product or activity is not infringing the copyrights of others.
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
              <a href="/privacy" className="text-muted-foreground hover:text-red-600 transition-colors">Privacy</a>
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

export default Copyright;
