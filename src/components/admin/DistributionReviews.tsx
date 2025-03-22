
import React, { useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Search,
  Music,
  CheckCircle2,
  XCircle,
  Clock,
  Eye,
  PlayCircle
} from 'lucide-react';
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from '@/components/ui/pagination';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

// Mock distribution submissions data
const mockDistributions = [
  { 
    id: '1', 
    userId: '1', 
    userName: 'John Doe', 
    title: 'Summer Vibes', 
    artist: 'John Doe', 
    genre: 'Pop', 
    submissionDate: '2024-03-15', 
    status: 'pending',
    coverArt: '/placeholder.svg',
    audioFile: '/path/to/audio1.mp3'
  },
  { 
    id: '2', 
    userId: '2', 
    userName: 'Jane Smith', 
    title: 'Midnight Moon', 
    artist: 'Night Owls', 
    genre: 'Electronic', 
    submissionDate: '2024-03-17', 
    status: 'approved',
    reviewDate: '2024-03-18',
    coverArt: '/placeholder.svg',
    audioFile: '/path/to/audio2.mp3'
  },
  { 
    id: '3', 
    userId: '4', 
    userName: 'Alice Brown', 
    title: 'Mountain High', 
    artist: 'Alpine', 
    genre: 'Folk', 
    submissionDate: '2024-03-18', 
    status: 'rejected',
    reviewDate: '2024-03-19',
    reason: 'Poor audio quality',
    coverArt: '/placeholder.svg',
    audioFile: '/path/to/audio3.mp3'
  },
  { 
    id: '4', 
    userId: '5', 
    userName: 'Charlie Wilson', 
    title: 'Urban Jungle', 
    artist: 'City Beats', 
    genre: 'Hip Hop', 
    submissionDate: '2024-03-20', 
    status: 'pending',
    coverArt: '/placeholder.svg',
    audioFile: '/path/to/audio4.mp3'
  },
  { 
    id: '5', 
    userId: '1', 
    userName: 'John Doe', 
    title: 'Ocean Waves', 
    artist: 'Coastal', 
    genre: 'Ambient', 
    submissionDate: '2024-03-21', 
    status: 'approved',
    reviewDate: '2024-03-22',
    coverArt: '/placeholder.svg',
    audioFile: '/path/to/audio5.mp3'
  },
];

const DistributionReviews = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedDistribution, setSelectedDistribution] = useState<any>(null);
  
  const filteredDistributions = mockDistributions.filter(dist => {
    const matchesSearch = 
      dist.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      dist.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dist.userName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || dist.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
  const handleAction = (action: 'approve' | 'reject', distributionId: string) => {
    toast({
      title: action === 'approve' ? 'Distribution approved' : 'Distribution rejected',
      description: `Distribution ID: ${distributionId} has been ${action === 'approve' ? 'approved' : 'rejected'}`,
    });
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100">
            <Clock className="mr-1 h-3 w-3" /> Pending
          </Badge>
        );
      case 'approved':
        return (
          <Badge variant="outline" className="bg-green-50 text-green-800 dark:bg-green-900 dark:text-green-100">
            <CheckCircle2 className="mr-1 h-3 w-3" /> Approved
          </Badge>
        );
      case 'rejected':
        return (
          <Badge variant="outline" className="bg-red-50 text-red-800 dark:bg-red-900 dark:text-red-100">
            <XCircle className="mr-1 h-3 w-3" /> Rejected
          </Badge>
        );
      default:
        return null;
    }
  };
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Music className="h-6 w-6" />
          Distribution Reviews
        </h2>
        <div className="flex items-center gap-2">
          <Select
            value={statusFilter}
            onValueChange={setStatusFilter}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
          <div className="relative w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search distributions..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>
      
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Artist</TableHead>
              <TableHead>Genre</TableHead>
              <TableHead>Submitted By</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredDistributions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  No distribution submissions found matching your criteria
                </TableCell>
              </TableRow>
            ) : (
              filteredDistributions.map(distribution => (
                <TableRow key={distribution.id}>
                  <TableCell>
                    <div className="font-medium">{distribution.title}</div>
                  </TableCell>
                  <TableCell>{distribution.artist}</TableCell>
                  <TableCell>{distribution.genre}</TableCell>
                  <TableCell>
                    <div>
                      <div>{distribution.userName}</div>
                      <div className="text-sm text-muted-foreground">{distribution.submissionDate}</div>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(distribution.status)}</TableCell>
                  <TableCell className="text-right">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => setSelectedDistribution(distribution)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          Review
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-3xl">
                        <DialogHeader>
                          <DialogTitle>Distribution Submission Review</DialogTitle>
                        </DialogHeader>
                        <Tabs defaultValue="details" className="w-full">
                          <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="details">Details</TabsTrigger>
                            <TabsTrigger value="audio">Audio Preview</TabsTrigger>
                            <TabsTrigger value="artwork">Artwork</TabsTrigger>
                          </TabsList>
                          <TabsContent value="details" className="space-y-4">
                            <div className="grid grid-cols-2 gap-4 pt-4">
                              <div>
                                <h4 className="text-sm font-medium mb-1">Title</h4>
                                <p>{selectedDistribution?.title}</p>
                              </div>
                              <div>
                                <h4 className="text-sm font-medium mb-1">Artist</h4>
                                <p>{selectedDistribution?.artist}</p>
                              </div>
                              <div>
                                <h4 className="text-sm font-medium mb-1">Genre</h4>
                                <p>{selectedDistribution?.genre}</p>
                              </div>
                              <div>
                                <h4 className="text-sm font-medium mb-1">Submission Date</h4>
                                <p>{selectedDistribution?.submissionDate}</p>
                              </div>
                              <div>
                                <h4 className="text-sm font-medium mb-1">Submitted By</h4>
                                <p>{selectedDistribution?.userName}</p>
                              </div>
                              <div>
                                <h4 className="text-sm font-medium mb-1">Status</h4>
                                <p>{selectedDistribution?.status.charAt(0).toUpperCase() + selectedDistribution?.status.slice(1)}</p>
                              </div>
                              {selectedDistribution?.reviewDate && (
                                <div>
                                  <h4 className="text-sm font-medium mb-1">Review Date</h4>
                                  <p>{selectedDistribution?.reviewDate}</p>
                                </div>
                              )}
                              {selectedDistribution?.reason && (
                                <div className="col-span-2">
                                  <h4 className="text-sm font-medium mb-1">Rejection Reason</h4>
                                  <p>{selectedDistribution?.reason}</p>
                                </div>
                              )}
                            </div>
                          </TabsContent>
                          <TabsContent value="audio" className="flex flex-col items-center justify-center p-4">
                            <div className="w-full max-w-md mx-auto text-center">
                              <div className="bg-muted rounded-lg p-6 mb-4 flex items-center justify-center">
                                <PlayCircle className="h-16 w-16 text-primary" />
                              </div>
                              <p className="font-medium">{selectedDistribution?.title}</p>
                              <p className="text-muted-foreground">{selectedDistribution?.artist}</p>
                              <p className="text-sm text-muted-foreground mt-1">Audio preview would play here</p>
                            </div>
                          </TabsContent>
                          <TabsContent value="artwork" className="flex flex-col items-center justify-center p-4">
                            <div className="w-full max-w-md mx-auto text-center">
                              <img 
                                src={selectedDistribution?.coverArt} 
                                alt="Album Artwork" 
                                className="mx-auto w-64 h-64 object-cover rounded-lg mb-4"
                              />
                              <p className="text-sm text-muted-foreground">Album Artwork</p>
                            </div>
                          </TabsContent>
                        </Tabs>
                        {selectedDistribution?.status === 'pending' && (
                          <div className="flex justify-end space-x-2 mt-4">
                            <Button 
                              variant="destructive" 
                              onClick={() => handleAction('reject', selectedDistribution?.id)}
                            >
                              Reject
                            </Button>
                            <Button 
                              variant="default"
                              onClick={() => handleAction('approve', selectedDistribution?.id)}
                            >
                              Approve
                            </Button>
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive>1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">2</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default DistributionReviews;
