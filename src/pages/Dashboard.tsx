
import React, { useState, useEffect } from 'react';
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableFooter, 
  TableHead, 
  TableRow, 
  TableCell, 
  TableCaption 
} from "@/components/ui/table";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Music, DollarSign, BarChart2, Calendar, Upload, Wallet } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import UserMenu from "@/components/UserMenu";
import { Navigate, Link } from "react-router-dom";
import { useTheme } from "@/contexts/ThemeContext";
import DarkModeToggle from "@/components/DarkModeToggle";
import { useQuery } from "@tanstack/react-query";
import { getUserCatalog, getEarningsHistory, getUserStats } from "@/services/dashboardService";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("catalog");
  const { isAuthenticated, user } = useAuth();
  const { theme } = useTheme();
  
  // Fetch user catalog data
  const { data: catalogData = [], isLoading: catalogLoading } = useQuery({
    queryKey: ['userCatalog', user?.id],
    queryFn: () => getUserCatalog(user?.id || ''),
    enabled: !!user?.id && isAuthenticated,
  });
  
  // Fetch earnings history
  const { data: earningsData = [], isLoading: earningsLoading } = useQuery({
    queryKey: ['earningsHistory', user?.id],
    queryFn: () => getEarningsHistory(user?.id || ''),
    enabled: !!user?.id && isAuthenticated,
  });
  
  // Fetch user stats
  const { data: userStats, isLoading: statsLoading } = useQuery({
    queryKey: ['userStats', user?.id],
    queryFn: () => getUserStats(user?.id || ''),
    enabled: !!user?.id && isAuthenticated,
  });
  
  // Calculate totals
  const totalStreams = userStats?.totalStreams || 0;
  const totalEarnings = userStats?.totalEarnings || 0;
  
  // Format next payout date
  const nextPayoutDate = userStats?.nextPayoutDate 
    ? new Date(userStats.nextPayoutDate).toLocaleDateString('en-US', { 
        month: 'long', 
        day: 'numeric', 
        year: 'numeric' 
      })
    : 'Not scheduled';
  
  // Handle download report
  const handleDownloadReport = () => {
    // Generate CSV content
    const headers = ['Period', 'Earnings', 'Status', 'Payment Date'];
    const csvContent = earningsData.map(earning => 
      [earning.period, earning.earnings.toFixed(2), earning.status, earning.date].join(',')
    );
    
    const csv = [headers.join(','), ...csvContent].join('\n');
    
    // Create a download link
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `earnings_report_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Report Downloaded",
      description: "Your earnings report has been downloaded.",
    });
  };
  
  // Redirect if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <img src="/lovable-uploads/33be2c38-edf9-42e0-aa88-0b492632243d.png" alt="MALPINOHDistro Logo" className="h-10 mr-2" />
            <span className="text-xl font-bold">MALPINOHDistro</span>
          </div>
          <div className="flex items-center">
            <nav className="mr-4 hidden md:block">
              <Link to="/" className="px-4 py-2 text-muted-foreground hover:text-red-600 transition-colors">Home</Link>
              <Link to="/dashboard" className="px-4 py-2 text-red-600 font-medium">Dashboard</Link>
              <Link to="/distribute" className="px-4 py-2 text-muted-foreground hover:text-red-600 transition-colors">Distribute</Link>
              <Link to="/settings" className="px-4 py-2 text-muted-foreground hover:text-red-600 transition-colors">Settings</Link>
            </nav>
            <DarkModeToggle />
            <UserMenu />
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">Artist Dashboard</h1>
        <p className="text-muted-foreground mb-8">Welcome back, {user?.name}. Manage your music catalog and track your earnings</p>
        
        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 mb-8">
          <Link to="/distribute">
            <Button className="bg-red-600 hover:bg-red-700 flex items-center gap-2">
              <Upload size={16} />
              Distribute New Music
            </Button>
          </Link>
          <Link to="/withdraw">
            <Button variant="outline" className="border-red-600 text-red-600 hover:bg-red-50 dark:hover:bg-red-950 flex items-center gap-2">
              <Wallet size={16} />
              Withdraw Earnings
            </Button>
          </Link>
        </div>
        
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-medium text-card-foreground">Total Streams</h3>
                <Music className="h-5 w-5 text-red-500" />
              </div>
              {statsLoading ? (
                <div className="animate-pulse h-8 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
              ) : (
                <p className="text-3xl font-bold">{totalStreams.toLocaleString()}</p>
              )}
              <p className="text-sm text-muted-foreground mt-2">Across all platforms</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-medium text-card-foreground">Total Earnings</h3>
                <DollarSign className="h-5 w-5 text-green-500" />
              </div>
              {statsLoading ? (
                <div className="animate-pulse h-8 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
              ) : (
                <p className="text-3xl font-bold">${totalEarnings.toFixed(2)}</p>
              )}
              <p className="text-sm text-muted-foreground mt-2">Year to date</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-medium text-card-foreground">Next Payment</h3>
                <Calendar className="h-5 w-5 text-blue-500" />
              </div>
              {statsLoading ? (
                <div className="animate-pulse h-8 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
              ) : (
                <p className="text-3xl font-bold">
                  {earningsData.find(item => item.status === "Pending") 
                    ? `$${earningsData.find(item => item.status === "Pending")?.earnings.toFixed(2) || "0.00"}`
                    : "$0.00"
                  }
                </p>
              )}
              <p className="text-sm text-muted-foreground mt-2">
                {statsLoading ? (
                  <div className="animate-pulse h-4 w-48 bg-gray-200 dark:bg-gray-700 rounded mt-1"></div>
                ) : (
                  `Scheduled for ${nextPayoutDate}`
                )}
              </p>
            </CardContent>
          </Card>
        </div>
        
        {/* Main Content Tabs */}
        <Tabs defaultValue="catalog" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="catalog" className="text-base py-3">
              <Music className="mr-2 h-4 w-4" />
              Music Catalog
            </TabsTrigger>
            <TabsTrigger value="earnings" className="text-base py-3">
              <BarChart2 className="mr-2 h-4 w-4" />
              Earnings
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="catalog" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle>Your Music Releases</CardTitle>
                <CardDescription>
                  All your distributed tracks and their performance
                </CardDescription>
              </CardHeader>
              <CardContent>
                {catalogLoading ? (
                  <div className="space-y-4">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="animate-pulse h-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    ))}
                  </div>
                ) : catalogData.length === 0 ? (
                  <div className="text-center py-10 text-muted-foreground">
                    <p>You haven't distributed any music yet.</p>
                    <Link to="/distribute">
                      <Button className="mt-4 bg-red-600 hover:bg-red-700">
                        Distribute Your First Track
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Release Date</TableHead>
                        <TableHead>Streams</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {catalogData.map((release) => (
                        <TableRow key={release.id}>
                          <TableCell className="font-medium">{release.track_title}</TableCell>
                          <TableCell>{new Date(release.release_date).toLocaleDateString()}</TableCell>
                          <TableCell>{release.streams_count?.toLocaleString() || '0'}</TableCell>
                          <TableCell>
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              release.status === "approved" 
                                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100" 
                                : release.status === "pending" 
                                  ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100" 
                                  : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100"
                            }`}>
                              {release.status.charAt(0).toUpperCase() + release.status.slice(1)}
                            </span>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="earnings" className="mt-0">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Earnings History</CardTitle>
                  <CardDescription>
                    Your streaming revenue and payment status
                  </CardDescription>
                </div>
                <Button 
                  size="sm" 
                  onClick={handleDownloadReport}
                  disabled={earningsLoading || earningsData.length === 0}
                >
                  Download Report
                </Button>
              </CardHeader>
              <CardContent>
                {earningsLoading ? (
                  <div className="space-y-4">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="animate-pulse h-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    ))}
                  </div>
                ) : earningsData.length === 0 ? (
                  <div className="text-center py-10 text-muted-foreground">
                    <p>No earnings history available yet.</p>
                    <p className="mt-2">Start distributing your music to earn royalties.</p>
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Period</TableHead>
                        <TableHead>Earnings</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Payment Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {earningsData.map((earning, idx) => (
                        <TableRow key={idx}>
                          <TableCell className="font-medium">{earning.period}</TableCell>
                          <TableCell>${earning.earnings.toFixed(2)}</TableCell>
                          <TableCell>
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              earning.status === "Paid" 
                                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100" 
                                : earning.status === "Processing" 
                                  ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100" 
                                  : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100"
                            }`}>
                              {earning.status}
                            </span>
                          </TableCell>
                          <TableCell>{earning.date}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                    <TableFooter>
                      <TableRow>
                        <TableCell colSpan={1}>Total</TableCell>
                        <TableCell colSpan={3} className="text-right">
                          ${earningsData.reduce((sum, item) => sum + item.earnings, 0).toFixed(2)}
                        </TableCell>
                      </TableRow>
                    </TableFooter>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      
      {/* Footer */}
      <footer className="py-8 bg-card border-t border-border">
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

export default Dashboard;
