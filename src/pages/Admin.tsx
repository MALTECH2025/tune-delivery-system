
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  LayoutDashboard, 
  Users, 
  Upload, 
  Music, 
  Settings,
  LogOut
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import UsersList from '@/components/admin/UsersList';
import WithdrawalRequests from '@/components/admin/WithdrawalRequests';
import DistributionReviews from '@/components/admin/DistributionReviews';
import AdminDashboard from '@/components/admin/AdminDashboard';

const Admin = () => {
  const { isAdmin, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Redirect if not an admin
  if (!isAdmin) {
    return <Navigate to="/dashboard" />;
  }
  
  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card shadow-md">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-card-foreground flex items-center gap-2">
            <img src="/lovable-uploads/33be2c38-edf9-42e0-aa88-0b492632243d.png" alt="MALPINOHDistro Logo" className="h-8" />
            <span>Admin Panel</span>
          </h1>
          <Button variant="outline" size="sm" onClick={logout}>
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <div className="bg-card p-1 rounded-lg shadow-sm">
            <TabsList className="w-full flex justify-between">
              <TabsTrigger value="dashboard" className="flex-1 py-3">
                <LayoutDashboard className="h-4 w-4 mr-2" />
                Dashboard
              </TabsTrigger>
              <TabsTrigger value="users" className="flex-1 py-3">
                <Users className="h-4 w-4 mr-2" />
                Users
              </TabsTrigger>
              <TabsTrigger value="withdrawals" className="flex-1 py-3">
                <Upload className="h-4 w-4 mr-2" />
                Withdrawals
              </TabsTrigger>
              <TabsTrigger value="distributions" className="flex-1 py-3">
                <Music className="h-4 w-4 mr-2" />
                Distributions
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex-1 py-3">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="dashboard">
            <AdminDashboard />
          </TabsContent>
          
          <TabsContent value="users">
            <UsersList />
          </TabsContent>
          
          <TabsContent value="withdrawals">
            <WithdrawalRequests />
          </TabsContent>
          
          <TabsContent value="distributions">
            <DistributionReviews />
          </TabsContent>
          
          <TabsContent value="settings">
            <div className="bg-card p-6 rounded-lg">
              <h2 className="text-2xl font-bold mb-6">Admin Settings</h2>
              <div className="text-center py-10 text-muted-foreground">
                Admin settings and configurations would be managed here
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
      
      <footer className="bg-card border-t border-border mt-12 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center text-sm text-muted-foreground">
            © 2024 MALPINOHDistro Admin Panel. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Admin;
