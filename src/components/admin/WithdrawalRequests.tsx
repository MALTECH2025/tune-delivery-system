
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
  Upload, 
  Filter, 
  CheckCircle2, 
  XCircle, 
  HelpCircle 
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

// Mock withdrawal requests data
const mockWithdrawals = [
  { id: '1', userId: '1', userName: 'John Doe', amount: 75.00, status: 'pending', requestDate: '2024-03-20', walletAddress: 'opay-john123' },
  { id: '2', userId: '2', userName: 'Jane Smith', amount: 120.50, status: 'approved', requestDate: '2024-03-18', walletAddress: 'opay-jane456', processedDate: '2024-03-19' },
  { id: '3', userId: '4', userName: 'Alice Brown', amount: 45.75, status: 'declined', requestDate: '2024-03-15', walletAddress: 'opay-alice789', processedDate: '2024-03-16', reason: 'Insufficient account verification' },
  { id: '4', userId: '1', userName: 'John Doe', amount: 200.00, status: 'pending', requestDate: '2024-03-22', walletAddress: 'opay-john123' },
  { id: '5', userId: '5', userName: 'Charlie Wilson', amount: 30.25, status: 'approved', requestDate: '2024-03-17', walletAddress: 'opay-charlie101', processedDate: '2024-03-18' },
];

const WithdrawalRequests = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  
  const filteredRequests = mockWithdrawals.filter(request => {
    const matchesSearch = 
      request.userName.toLowerCase().includes(searchTerm.toLowerCase()) || 
      request.walletAddress.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || request.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
  const handleAction = (action: 'approve' | 'decline', requestId: string) => {
    toast({
      title: action === 'approve' ? 'Withdrawal approved' : 'Withdrawal declined',
      description: `Request ID: ${requestId} has been ${action === 'approve' ? 'approved' : 'declined'}`,
    });
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100">
            <HelpCircle className="mr-1 h-3 w-3" /> Pending
          </Badge>
        );
      case 'approved':
        return (
          <Badge variant="outline" className="bg-green-50 text-green-800 dark:bg-green-900 dark:text-green-100">
            <CheckCircle2 className="mr-1 h-3 w-3" /> Approved
          </Badge>
        );
      case 'declined':
        return (
          <Badge variant="outline" className="bg-red-50 text-red-800 dark:bg-red-900 dark:text-red-100">
            <XCircle className="mr-1 h-3 w-3" /> Declined
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
          <Upload className="h-6 w-6" />
          Withdrawal Requests
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
              <SelectItem value="declined">Declined</SelectItem>
            </SelectContent>
          </Select>
          <div className="relative w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search requests..."
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
              <TableHead>User</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Request Date</TableHead>
              <TableHead>Wallet</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRequests.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  No withdrawal requests found matching your criteria
                </TableCell>
              </TableRow>
            ) : (
              filteredRequests.map(request => (
                <TableRow key={request.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{request.userName}</div>
                      <div className="text-sm text-muted-foreground">ID: {request.userId}</div>
                    </div>
                  </TableCell>
                  <TableCell>${request.amount.toFixed(2)}</TableCell>
                  <TableCell>{getStatusBadge(request.status)}</TableCell>
                  <TableCell>{request.requestDate}</TableCell>
                  <TableCell className="font-mono text-sm">{request.walletAddress}</TableCell>
                  <TableCell className="text-right">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => setSelectedRequest(request)}
                        >
                          Manage
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Withdrawal Request Details</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <div className="font-medium">User:</div>
                            <div className="col-span-3">{selectedRequest?.userName}</div>
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <div className="font-medium">Amount:</div>
                            <div className="col-span-3">${selectedRequest?.amount?.toFixed(2)}</div>
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <div className="font-medium">Status:</div>
                            <div className="col-span-3">
                              {selectedRequest?.status.charAt(0).toUpperCase() + selectedRequest?.status.slice(1)}
                            </div>
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <div className="font-medium">Request Date:</div>
                            <div className="col-span-3">{selectedRequest?.requestDate}</div>
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <div className="font-medium">Wallet:</div>
                            <div className="col-span-3 font-mono">{selectedRequest?.walletAddress}</div>
                          </div>
                          {selectedRequest?.processedDate && (
                            <div className="grid grid-cols-4 items-center gap-4">
                              <div className="font-medium">Processed Date:</div>
                              <div className="col-span-3">{selectedRequest?.processedDate}</div>
                            </div>
                          )}
                          {selectedRequest?.reason && (
                            <div className="grid grid-cols-4 items-center gap-4">
                              <div className="font-medium">Reason:</div>
                              <div className="col-span-3">{selectedRequest?.reason}</div>
                            </div>
                          )}
                        </div>
                        {selectedRequest?.status === 'pending' && (
                          <div className="flex justify-end space-x-2">
                            <Button 
                              variant="destructive" 
                              onClick={() => handleAction('decline', selectedRequest?.id)}
                            >
                              Decline
                            </Button>
                            <Button 
                              variant="default"
                              onClick={() => handleAction('approve', selectedRequest?.id)}
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

export default WithdrawalRequests;
