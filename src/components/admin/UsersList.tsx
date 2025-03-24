
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
  UserCog, 
  Search, 
  User, 
  CircleCheck, 
  CircleX, 
  Wallet, 
  DollarSign
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

// Mock user data
const mockUsers = [
  { id: '1', name: 'John Doe', email: 'john@example.com', earnings: 245.50, isActive: true, isVerified: true, registeredAt: '2024-01-15' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', earnings: 125.80, isActive: true, isVerified: true, registeredAt: '2024-01-20' },
  { id: '3', name: 'Bob Johnson', email: 'bob@example.com', earnings: 0, isActive: false, isVerified: false, registeredAt: '2024-02-05' },
  { id: '4', name: 'Alice Brown', email: 'alice@example.com', earnings: 78.25, isActive: true, isVerified: true, registeredAt: '2024-02-10' },
  { id: '5', name: 'Charlie Wilson', email: 'charlie@example.com', earnings: 12.40, isActive: true, isVerified: false, registeredAt: '2024-03-01' },
];

const UsersList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [userEarnings, setUserEarnings] = useState<number>(0);
  
  const filteredUsers = mockUsers.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleUserAction = (action: string, userId: string) => {
    toast({
      title: "User action",
      description: `${action} action performed on user ID: ${userId}`,
    });
  };

  const handleUpdateEarnings = (userId: string) => {
    toast({
      title: "Earnings updated",
      description: `Earnings updated to $${userEarnings.toFixed(2)} for user ID: ${userId}`,
    });
  };
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <User className="h-6 w-6" />
          Users Management
        </h2>
        <div className="relative w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search users..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Earnings</TableHead>
              <TableHead>Registered</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                  No users found matching your search criteria
                </TableCell>
              </TableRow>
            ) : (
              filteredUsers.map(user => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{user.name}</div>
                      <div className="text-sm text-muted-foreground">{user.email}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      {user.isActive ? (
                        <Badge variant="outline" className="bg-green-50 text-green-800 dark:bg-green-900 dark:text-green-100">
                          <CircleCheck className="mr-1 h-3 w-3" /> Active
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="bg-red-50 text-red-800 dark:bg-red-900 dark:text-red-100">
                          <CircleX className="mr-1 h-3 w-3" /> Inactive
                        </Badge>
                      )}
                      {user.isVerified ? (
                        <Badge variant="outline" className="bg-blue-50 text-blue-800 dark:bg-blue-900 dark:text-blue-100">
                          Verified
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="bg-yellow-50 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100">
                          Unverified
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Wallet className="mr-1 h-4 w-4 text-muted-foreground" />
                      ${user.earnings.toFixed(2)}
                    </div>
                  </TableCell>
                  <TableCell>{user.registeredAt}</TableCell>
                  <TableCell className="text-right">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => {
                            setSelectedUser(user);
                            setUserEarnings(user.earnings);
                          }}
                        >
                          <UserCog className="h-4 w-4 mr-1" />
                          Manage
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Manage User: {selectedUser?.name}</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <div className="font-medium">Name:</div>
                            <div className="col-span-3">{selectedUser?.name}</div>
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <div className="font-medium">Email:</div>
                            <div className="col-span-3">{selectedUser?.email}</div>
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <div className="font-medium">Earnings:</div>
                            <div className="col-span-3 flex items-center">
                              <Input 
                                type="number"
                                value={userEarnings}
                                onChange={(e) => setUserEarnings(parseFloat(e.target.value) || 0)}
                                className="max-w-[150px] mr-2"
                                step="0.01"
                                min="0"
                              />
                              <Button 
                                size="sm"
                                onClick={() => handleUpdateEarnings(selectedUser?.id)}
                                className="flex items-center gap-1"
                              >
                                <DollarSign className="h-3 w-3" />
                                Update
                              </Button>
                            </div>
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <div className="font-medium">Status:</div>
                            <div className="col-span-3">
                              {selectedUser?.isActive ? "Active" : "Inactive"}
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-between">
                          <Button 
                            variant="outline" 
                            onClick={() => handleUserAction("View details", selectedUser?.id)}
                          >
                            View Details
                          </Button>
                          <div className="space-x-2">
                            <Button 
                              variant={selectedUser?.isActive ? "destructive" : "default"}
                              onClick={() => handleUserAction(selectedUser?.isActive ? "Deactivate" : "Activate", selectedUser?.id)}
                            >
                              {selectedUser?.isActive ? "Deactivate" : "Activate"}
                            </Button>
                            <Button 
                              variant="default"
                              onClick={() => handleUserAction("Edit", selectedUser?.id)}
                            >
                              Edit
                            </Button>
                          </div>
                        </div>
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
            <PaginationLink href="#">3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default UsersList;
