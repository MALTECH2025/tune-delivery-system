
import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  LayoutDashboard, 
  Users, 
  Upload, 
  Music, 
  Settings,
  LogOut,
  ChevronRight,
  AlertTriangle,
  CheckCircle,
  Bell,
  FileText,
  BadgePercent,
  Mail
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import UsersList from '@/components/admin/UsersList';
import WithdrawalRequests from '@/components/admin/WithdrawalRequests';
import DistributionReviews from '@/components/admin/DistributionReviews';
import AdminDashboard from '@/components/admin/AdminDashboard';
import SubscriptionManagement from '@/components/admin/SubscriptionManagement';
import PlatformSettings from '@/components/admin/PlatformSettings';
import DistributionFiles from '@/components/admin/DistributionFiles';
import EmailTesting from '@/components/admin/EmailTesting';

const Admin = () => {
  const { isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Redirect if not an admin
  if (!isAdmin) {
    return <Navigate to="/dashboard" />;
  }
  
  const notifications = [
    { id: 1, message: "New distribution request from John Doe", time: "5 minutes ago", type: "distribution" },
    { id: 2, message: "New withdrawal request for $150", time: "1 hour ago", type: "withdrawal" },
    { id: 3, message: "New user registration: sarah@example.com", time: "3 hours ago", type: "user" },
    { id: 4, message: "New subscription payment received", time: "2 hours ago", type: "subscription" },
  ];
  
  const pendingTasks = [
    { id: 1, title: "Review withdrawal requests", count: 12, type: "withdrawals" },
    { id: 2, title: "Approve distribution submissions", count: 8, type: "distributions" },
    { id: 3, title: "User account verifications", count: 5, type: "users" },
    { id: 4, title: "Pending subscription payments", count: 3, type: "subscriptions" },
  ];
  
  const handleTaskClick = (type) => {
    setActiveTab(type);
  };
  
  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card shadow-md border-b border-border">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <img src="/lovable-uploads/33be2c38-edf9-42e0-aa88-0b492632243d.png" alt="MALPINOHDistro Logo" className="h-10" />
            <div>
              <h1 className="text-xl font-bold text-foreground">Admin Panel</h1>
              <p className="text-sm text-muted-foreground">Manage your music distribution platform</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" onClick={() => navigate('/')}>
              View Site
            </Button>
            <Button variant="destructive" size="sm" onClick={logout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-20">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Quick Navigation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 pt-0">
                <Button 
                  variant={activeTab === 'dashboard' ? "default" : "ghost"} 
                  className="w-full justify-start" 
                  onClick={() => setActiveTab('dashboard')}
                >
                  <LayoutDashboard className="h-4 w-4 mr-2" />
                  Dashboard
                </Button>
                <Button 
                  variant={activeTab === 'users' ? "default" : "ghost"} 
                  className="w-full justify-start" 
                  onClick={() => setActiveTab('users')}
                >
                  <Users className="h-4 w-4 mr-2" />
                  Users
                </Button>
                <Button 
                  variant={activeTab === 'withdrawals' ? "default" : "ghost"} 
                  className="w-full justify-start" 
                  onClick={() => setActiveTab('withdrawals')}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Withdrawals
                </Button>
                <Button 
                  variant={activeTab === 'distributions' ? "default" : "ghost"} 
                  className="w-full justify-start" 
                  onClick={() => setActiveTab('distributions')}
                >
                  <Music className="h-4 w-4 mr-2" />
                  Distributions
                </Button>
                <Button 
                  variant={activeTab === 'files' ? "default" : "ghost"} 
                  className="w-full justify-start" 
                  onClick={() => setActiveTab('files')}
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Files
                </Button>
                <Button 
                  variant={activeTab === 'subscriptions' ? "default" : "ghost"} 
                  className="w-full justify-start" 
                  onClick={() => setActiveTab('subscriptions')}
                >
                  <BadgePercent className="h-4 w-4 mr-2" />
                  Subscriptions
                </Button>
                <Button 
                  variant={activeTab === 'emails' ? "default" : "ghost"} 
                  className="w-full justify-start" 
                  onClick={() => setActiveTab('emails')}
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Emails
                </Button>
                <Button 
                  variant={activeTab === 'settings' ? "default" : "ghost"} 
                  className="w-full justify-start" 
                  onClick={() => setActiveTab('settings')}
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Button>
              </CardContent>
            </Card>
            
            {/* Notifications Card */}
            <Card className="mt-4">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Bell className="h-4 w-4 mr-2" />
                  Recent Notifications
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 pt-0">
                {notifications.map(notification => (
                  <div key={notification.id} className="border-b border-border pb-2 last:border-0 last:pb-0 pt-2">
                    <div className="flex items-start gap-2">
                      {notification.type === 'distribution' && (
                        <Music className="h-4 w-4 text-blue-500 mt-1 flex-shrink-0" />
                      )}
                      {notification.type === 'withdrawal' && (
                        <Upload className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                      )}
                      {notification.type === 'user' && (
                        <Users className="h-4 w-4 text-orange-500 mt-1 flex-shrink-0" />
                      )}
                      {notification.type === 'subscription' && (
                        <BadgePercent className="h-4 w-4 text-purple-500 mt-1 flex-shrink-0" />
                      )}
                      <div>
                        <p className="text-sm">{notification.message}</p>
                        <p className="text-xs text-muted-foreground">{notification.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
            
            {/* Tasks Card */}
            <Card className="mt-4">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Pending Tasks
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 pt-0">
                {pendingTasks.map(task => (
                  <Button 
                    key={task.id} 
                    variant="ghost" 
                    className="w-full justify-between" 
                    onClick={() => handleTaskClick(task.type)}
                  >
                    <span className="flex items-center">
                      {task.title}
                    </span>
                    <Badge variant="secondary">{task.count}</Badge>
                  </Button>
                ))}
              </CardContent>
            </Card>
          </div>
          
          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
              {/* Desktop TabsList - hidden on mobile */}
              <div className="bg-card p-1 rounded-lg shadow-sm border border-border hidden md:block">
                <TabsList className="w-full grid grid-cols-8">
                  <TabsTrigger value="dashboard" className="py-3">
                    <LayoutDashboard className="h-4 w-4 mr-2" />
                    Dashboard
                  </TabsTrigger>
                  <TabsTrigger value="users" className="py-3">
                    <Users className="h-4 w-4 mr-2" />
                    Users
                  </TabsTrigger>
                  <TabsTrigger value="withdrawals" className="py-3">
                    <Upload className="h-4 w-4 mr-2" />
                    Withdrawals
                  </TabsTrigger>
                  <TabsTrigger value="distributions" className="py-3">
                    <Music className="h-4 w-4 mr-2" />
                    Distributions
                  </TabsTrigger>
                  <TabsTrigger value="files" className="py-3">
                    <FileText className="h-4 w-4 mr-2" />
                    Files
                  </TabsTrigger>
                  <TabsTrigger value="subscriptions" className="py-3">
                    <BadgePercent className="h-4 w-4 mr-2" />
                    Subscriptions
                  </TabsTrigger>
                  <TabsTrigger value="emails" className="py-3">
                    <Mail className="h-4 w-4 mr-2" />
                    Emails
                  </TabsTrigger>
                  <TabsTrigger value="settings" className="py-3">
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
              
              <TabsContent value="files">
                <DistributionFiles />
              </TabsContent>
              
              <TabsContent value="subscriptions">
                <SubscriptionManagement />
              </TabsContent>
              
              <TabsContent value="emails">
                <EmailTesting />
              </TabsContent>
              
              <TabsContent value="settings">
                <PlatformSettings />
              </TabsContent>
            </Tabs>
          </div>
        </div>
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
