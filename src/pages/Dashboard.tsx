
import React, { useState } from 'react';
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
import { Music, DollarSign, BarChart2, Calendar } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("catalog");
  
  // Mock data
  const catalogData = [
    { id: 1, title: "Summer Vibes", released: "2023-06-15", streams: 145862, platforms: "Spotify, Apple Music, YouTube" },
    { id: 2, title: "Midnight Dreams", released: "2023-08-01", streams: 87231, platforms: "Spotify, Apple Music, Amazon" },
    { id: 3, title: "Urban Flow", released: "2023-10-10", streams: 53982, platforms: "Spotify, SoundCloud, YouTube" },
    { id: 4, title: "Echoes of Yesterday", released: "2024-01-05", streams: 28754, platforms: "All Platforms" },
    { id: 5, title: "Crystal Clear", released: "2024-03-20", streams: 12983, platforms: "Spotify, Apple Music, TikTok" },
  ];
  
  const earningsData = [
    { period: "January 2024", earnings: 345.78, status: "Paid", date: "2024-02-15" },
    { period: "February 2024", earnings: 412.56, status: "Paid", date: "2024-03-15" },
    { period: "March 2024", earnings: 378.92, status: "Processing", date: "Pending" },
    { period: "April 2024", earnings: 401.23, status: "Pending", date: "Scheduled for 2024-05-15" },
  ];
  
  const totalStreams = catalogData.reduce((sum, item) => sum + item.streams, 0);
  const totalEarnings = earningsData.reduce((sum, item) => sum + item.earnings, 0);

  const handleDownloadReport = () => {
    toast({
      title: "Report Download Started",
      description: "Your earnings report will be downloaded shortly.",
    });
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <img src="/lovable-uploads/33be2c38-edf9-42e0-aa88-0b492632243d.png" alt="MalpinohDistro Logo" className="h-10 mr-2" />
            <span className="text-xl font-bold">MalpinohDistro</span>
          </div>
          <nav>
            <a href="/" className="px-4 py-2 text-gray-600 hover:text-red-600 transition-colors">Home</a>
            <a href="/dashboard" className="px-4 py-2 text-red-600 font-medium">Dashboard</a>
            <a href="#submit" className="px-4 py-2 text-gray-600 hover:text-red-600 transition-colors">Submit Music</a>
          </nav>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">Artist Dashboard</h1>
        <p className="text-gray-600 mb-8">Manage your music catalog and track your earnings</p>
        
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-medium text-gray-700">Total Streams</h3>
                <Music className="h-5 w-5 text-red-500" />
              </div>
              <p className="text-3xl font-bold">{totalStreams.toLocaleString()}</p>
              <p className="text-sm text-gray-500 mt-2">Across all platforms</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-medium text-gray-700">Total Earnings</h3>
                <DollarSign className="h-5 w-5 text-green-500" />
              </div>
              <p className="text-3xl font-bold">${totalEarnings.toFixed(2)}</p>
              <p className="text-sm text-gray-500 mt-2">Year to date</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-medium text-gray-700">Next Payment</h3>
                <Calendar className="h-5 w-5 text-blue-500" />
              </div>
              <p className="text-3xl font-bold">${earningsData.find(item => item.status === "Pending")?.earnings.toFixed(2) || "0.00"}</p>
              <p className="text-sm text-gray-500 mt-2">Scheduled for May 15, 2024</p>
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
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Release Date</TableHead>
                      <TableHead>Streams</TableHead>
                      <TableHead>Platforms</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {catalogData.map((release) => (
                      <TableRow key={release.id}>
                        <TableCell className="font-medium">{release.title}</TableCell>
                        <TableCell>{new Date(release.released).toLocaleDateString()}</TableCell>
                        <TableCell>{release.streams.toLocaleString()}</TableCell>
                        <TableCell>{release.platforms}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
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
                <Button size="sm" onClick={handleDownloadReport}>
                  Download Report
                </Button>
              </CardHeader>
              <CardContent>
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
                              ? "bg-green-100 text-green-800" 
                              : earning.status === "Processing" 
                                ? "bg-blue-100 text-blue-800" 
                                : "bg-gray-100 text-gray-800"
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
                      <TableCell colSpan={3} className="text-right">${totalEarnings.toFixed(2)}</TableCell>
                    </TableRow>
                  </TableFooter>
                </Table>
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

export default Dashboard;
