
import React from 'react';
import { useAuth } from "@/contexts/auth";
import { Navigate } from "react-router-dom";
import SubmissionForm from '@/components/SubmissionForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Distribute = () => {
  const { isAuthenticated } = useAuth();
  
  // Redirect if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return (
    <div className="min-h-screen bg-background pt-20">
      <header className="bg-card shadow-md">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-card-foreground">Music Distribution</h1>
          <p className="text-muted-foreground mt-2">Submit your music for distribution to all major platforms</p>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Distribution Guidelines</CardTitle>
            <CardDescription>
              Please read these guidelines before submitting your music
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Audio Requirements</h3>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>High quality WAV or FLAC files (44.1kHz/16-bit minimum)</li>
                  <li>Maximum file size: 100MB</li>
                  <li>No unauthorized samples or copyrighted material</li>
                  <li>No excessive silence at beginning or end</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Artwork Requirements</h3>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>3000x3000 pixels minimum</li>
                  <li>JPG or PNG format</li>
                  <li>Square format (1:1 ratio)</li>
                  <li>No explicit images or third-party logos</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <SubmissionForm />
      </main>
      
      <footer className="bg-card border-t border-border mt-12 py-8">
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

export default Distribute;
