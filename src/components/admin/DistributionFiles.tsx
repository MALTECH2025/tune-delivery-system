
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
  Download, 
  Music, 
  Image, 
  FileText,
  Filter
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
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';

// Mock distribution files data
const mockFiles = [
  { 
    id: '1', 
    userId: '3', 
    userName: 'Bob Johnson', 
    releaseTitle: 'Summer Vibes', 
    fileType: 'audio', 
    fileName: 'summer_vibes.mp3', 
    uploadDate: '2024-03-15',
    status: 'pending'
  },
  { 
    id: '2', 
    userId: '3', 
    userName: 'Bob Johnson', 
    releaseTitle: 'Summer Vibes', 
    fileType: 'image', 
    fileName: 'summer_vibes_cover.jpg', 
    uploadDate: '2024-03-15',
    status: 'pending'
  },
  { 
    id: '3', 
    userId: '4', 
    userName: 'Alice Brown', 
    releaseTitle: 'Midnight Dreams', 
    fileType: 'audio', 
    fileName: 'midnight_dreams.wav', 
    uploadDate: '2024-03-10',
    status: 'approved'
  },
  { 
    id: '4', 
    userId: '4', 
    userName: 'Alice Brown', 
    releaseTitle: 'Midnight Dreams', 
    fileType: 'image', 
    fileName: 'midnight_dreams_cover.png', 
    uploadDate: '2024-03-10',
    status: 'approved'
  },
  { 
    id: '5', 
    userId: '5', 
    userName: 'Charlie Wilson', 
    releaseTitle: 'Urban Journey', 
    fileType: 'audio', 
    fileName: 'urban_journey.mp3', 
    uploadDate: '2024-03-05',
    status: 'approved'
  },
  { 
    id: '6', 
    userId: '5', 
    userName: 'Charlie Wilson', 
    releaseTitle: 'Urban Journey', 
    fileType: 'image', 
    fileName: 'urban_journey_cover.jpg', 
    uploadDate: '2024-03-05',
    status: 'approved'
  },
];

const DistributionFiles = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  
  const filteredFiles = mockFiles.filter(file => {
    const matchesSearch = 
      file.userName.toLowerCase().includes(searchTerm.toLowerCase()) || 
      file.releaseTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      file.fileName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = filterType === 'all' || file.fileType === filterType;
    const matchesStatus = filterStatus === 'all' || file.status === filterStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });
  
  const handleDownload = (fileId: string, fileName: string) => {
    // In a real application, this would be a call to download the file
    toast({
      title: "Download started",
      description: `Downloading ${fileName}`,
    });
  };
  
  const handleApproveRelease = (releaseTitle: string, userId: string) => {
    // Find all files for this release
    const releaseFiles = mockFiles.filter(file => 
      file.releaseTitle === releaseTitle && file.userId === userId
    );
    
    toast({
      title: "Release approved",
      description: `"${releaseTitle}" has been approved and assigned to ${releaseFiles[0].userName}`,
    });
  };
  
  const getFileIcon = (fileType: string) => {
    switch (fileType) {
      case 'audio':
        return <Music className="h-4 w-4 text-blue-500" />;
      case 'image':
        return <Image className="h-4 w-4 text-purple-500" />;
      default:
        return <FileText className="h-4 w-4 text-gray-500" />;
    }
  };
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <FileText className="h-6 w-6" />
          Distribution Files
        </h2>
        <div className="flex items-center gap-2">
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-36">
              <SelectValue placeholder="File type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="audio">Audio</SelectItem>
              <SelectItem value="image">Image</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-36">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
            </SelectContent>
          </Select>
          
          <div className="relative w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search files..."
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
              <TableHead>File</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Release</TableHead>
              <TableHead>Upload Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredFiles.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  No files found matching your criteria
                </TableCell>
              </TableRow>
            ) : (
              filteredFiles.map(file => (
                <TableRow key={file.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getFileIcon(file.fileType)}
                      <div>
                        <div className="font-medium">{file.fileName}</div>
                        <div className="text-xs text-muted-foreground capitalize">
                          {file.fileType} file
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{file.userName}</TableCell>
                  <TableCell>{file.releaseTitle}</TableCell>
                  <TableCell>{file.uploadDate}</TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline" 
                      className={`capitalize ${
                        file.status === 'approved' 
                          ? 'bg-green-50 text-green-800 dark:bg-green-900 dark:text-green-100' 
                          : 'bg-yellow-50 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100'
                      }`}
                    >
                      {file.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDownload(file.id, file.fileName)}
                      >
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </Button>
                      
                      {file.status === 'pending' && file.fileType === 'audio' && (
                        <Button 
                          variant="default" 
                          size="sm"
                          onClick={() => handleApproveRelease(file.releaseTitle, file.userId)}
                        >
                          Approve Release
                        </Button>
                      )}
                    </div>
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

export default DistributionFiles;
