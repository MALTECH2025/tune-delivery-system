
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Wallet, User, Shield } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/hooks/use-toast';
import { Navigate } from 'react-router-dom';

const profileFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
});

const walletFormSchema = z.object({
  opayWallet: z.string().min(6, { message: "OPay wallet ID must be at least 6 characters" }),
});

const passwordFormSchema = z.object({
  currentPassword: z.string().min(6, { message: "Password must be at least 6 characters" }),
  newPassword: z.string().min(6, { message: "Password must be at least 6 characters" }),
  confirmPassword: z.string().min(6, { message: "Password must be at least 6 characters" }),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

const Settings = () => {
  const { user, updateUser, isAuthenticated } = useAuth();
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [loadingWallet, setLoadingWallet] = useState(false);
  const [loadingPassword, setLoadingPassword] = useState(false);
  
  // Redirect if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  const profileForm = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
    },
  });

  const walletForm = useForm<z.infer<typeof walletFormSchema>>({
    resolver: zodResolver(walletFormSchema),
    defaultValues: {
      opayWallet: user?.opayWallet || "",
    },
  });

  const passwordForm = useForm<z.infer<typeof passwordFormSchema>>({
    resolver: zodResolver(passwordFormSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onProfileSubmit = async (values: z.infer<typeof profileFormSchema>) => {
    setLoadingProfile(true);
    try {
      // In a real app, you would make an API call here
      await new Promise(resolve => setTimeout(resolve, 1000));
      updateUser({ name: values.name });
    } finally {
      setLoadingProfile(false);
    }
  };

  const onWalletSubmit = async (values: z.infer<typeof walletFormSchema>) => {
    setLoadingWallet(true);
    try {
      // In a real app, you would make an API call here
      await new Promise(resolve => setTimeout(resolve, 1000));
      updateUser({ opayWallet: values.opayWallet });
    } finally {
      setLoadingWallet(false);
    }
  };

  const onPasswordSubmit = async (values: z.infer<typeof passwordFormSchema>) => {
    setLoadingPassword(true);
    try {
      // In a real app, you would make an API call here
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Reset form after successful submission
      passwordForm.reset();
      toast({
        title: "Password updated",
        description: "Your password has been successfully updated",
      });
    } finally {
      setLoadingPassword(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header - Similar to Dashboard */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <img src="/lovable-uploads/33be2c38-edf9-42e0-aa88-0b492632243d.png" alt="MalpinohDistro Logo" className="h-10 mr-2" />
            <span className="text-xl font-bold">MalpinohDistro</span>
          </div>
          <nav>
            <a href="/" className="px-4 py-2 text-gray-600 hover:text-red-600 transition-colors">Home</a>
            <a href="/dashboard" className="px-4 py-2 text-gray-600 hover:text-red-600 transition-colors">Dashboard</a>
            <a href="/settings" className="px-4 py-2 text-red-600 font-medium">Settings</a>
          </nav>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">Account Settings</h1>
        <p className="text-gray-600 mb-8">Manage your profile, payment settings, and security</p>
        
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="profile" className="text-base py-3">
              <User className="mr-2 h-4 w-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="payment" className="text-base py-3">
              <Wallet className="mr-2 h-4 w-4" />
              Payment Method
            </TabsTrigger>
            <TabsTrigger value="security" className="text-base py-3">
              <Shield className="mr-2 h-4 w-4" />
              Security
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                  Update your personal information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...profileForm}>
                  <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-6">
                    <FormField
                      control={profileForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={profileForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input placeholder="your@email.com" {...field} disabled />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" disabled={loadingProfile}>
                      {loadingProfile ? "Saving..." : "Save Changes"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="payment">
            <Card>
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
                <CardDescription>
                  Connect your OPay wallet for payouts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...walletForm}>
                  <form onSubmit={walletForm.handleSubmit(onWalletSubmit)} className="space-y-6">
                    <FormField
                      control={walletForm.control}
                      name="opayWallet"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>OPay Wallet ID</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your OPay Wallet ID" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                      <h4 className="font-medium text-gray-900 mb-2">Why link your OPay wallet?</h4>
                      <p className="text-gray-600 text-sm">
                        Linking your OPay wallet allows us to send your earnings directly to your account.
                        All payouts are processed securely and typically arrive within 1-2 business days.
                      </p>
                    </div>
                    <Button type="submit" disabled={loadingWallet}>
                      {loadingWallet ? "Saving..." : "Save Payment Method"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>
                  Update your password
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...passwordForm}>
                  <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-6">
                    <FormField
                      control={passwordForm.control}
                      name="currentPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Current Password</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="••••••••" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={passwordForm.control}
                      name="newPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>New Password</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="••••••••" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={passwordForm.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirm New Password</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="••••••••" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" disabled={loadingPassword}>
                      {loadingPassword ? "Updating..." : "Update Password"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      
      {/* Footer */}
      <footer className="py-8 bg-gray-100 border-t border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <img src="/lovable-uploads/33be2c38-edf9-42e0-aa88-0b492632243d.png" alt="MalpinohDistro Logo" className="h-8 mb-2" />
              <p className="text-sm text-gray-600">
                Amplifying independent artists worldwide.
              </p>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-600 hover:text-red-600 transition-colors">Terms</a>
              <a href="#" className="text-gray-600 hover:text-red-600 transition-colors">Privacy</a>
              <a href="#" className="text-gray-600 hover:text-red-600 transition-colors">Support</a>
            </div>
          </div>
          <div className="mt-6 border-t border-gray-200 pt-6 text-center text-sm text-gray-600">
            © 2024 MalpinohDistro. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Settings;
