
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
  Calendar, 
  User,
  Badge as BadgeIcon,
  CheckCircle2
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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Mock subscription data
const mockSubscriptions = [
  { 
    id: '1', 
    userId: '3', 
    userName: 'Bob Johnson', 
    plan: 'monthly', 
    startDate: '2024-04-05', 
    expiryDate: '2024-05-05', 
    status: 'active',
    paymentStatus: 'confirmed'
  },
  { 
    id: '2', 
    userId: '5', 
    userName: 'Charlie Wilson', 
    plan: 'quarterly', 
    startDate: '2024-03-10', 
    expiryDate: '2024-07-10', 
    status: 'active',
    paymentStatus: 'confirmed'
  },
  { 
    id: '3', 
    userId: '6', 
    userName: 'David Miller', 
    plan: 'yearly', 
    startDate: '2024-02-15', 
    expiryDate: '2025-02-15', 
    status: 'active',
    paymentStatus: 'confirmed'
  },
  { 
    id: '4', 
    userId: '7', 
    userName: 'Emma Davis', 
    plan: 'monthly', 
    startDate: '2024-04-01', 
    expiryDate: '2024-05-01', 
    status: 'pending',
    paymentStatus: 'awaiting confirmation'
  },
];

const SubscriptionManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubscription, setSelectedSubscription] = useState<any>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserPlan, setNewUserPlan] = useState('monthly');
  
  const filteredSubscriptions = mockSubscriptions.filter(subscription => 
    subscription.userName.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleAssignSubscription = () => {
    toast({
      title: "Subscription assigned",
      description: `Subscription assigned to ${newUserEmail}`,
    });
    setOpenDialog(false);
    setNewUserEmail('');
    setNewUserPlan('monthly');
  };
  
  const handleConfirmPayment = (subscriptionId: string) => {
    toast({
      title: "Payment confirmed",
      description: `Subscription ID: ${subscriptionId} has been activated`,
    });
  };
  
  const handleExtendSubscription = (subscriptionId: string) => {
    toast({
      title: "Subscription extended",
      description: `Subscription ID: ${subscriptionId} has been extended`,
    });
  };
  
  const handleCancelSubscription = (subscriptionId: string) => {
    toast({
      title: "Subscription cancelled",
      description: `Subscription ID: ${subscriptionId} has been cancelled`,
    });
  };
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <BadgeIcon className="h-6 w-6" />
          Subscription Management
        </h2>
        <div className="flex items-center gap-2">
          <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogTrigger asChild>
              <Button>
                Assign Subscription
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Assign Subscription to User</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <label htmlFor="user-email" className="text-sm font-medium">
                    User Email
                  </label>
                  <Input
                    id="user-email"
                    placeholder="user@example.com"
                    value={newUserEmail}
                    onChange={(e) => setNewUserEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Subscription Plan
                  </label>
                  <Select value={newUserPlan} onValueChange={setNewUserPlan}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select plan" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="monthly">Monthly Plan ($12.9)</SelectItem>
                      <SelectItem value="quarterly">4 Month Plan ($15)</SelectItem>
                      <SelectItem value="yearly">Yearly Plan ($22.58)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpenDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAssignSubscription}>
                  Assign Subscription
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
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
      </div>
      
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Plan</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>Expiry Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSubscriptions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  No subscriptions found matching your criteria
                </TableCell>
              </TableRow>
            ) : (
              filteredSubscriptions.map(subscription => (
                <TableRow key={subscription.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{subscription.userName}</div>
                      <div className="text-sm text-muted-foreground">ID: {subscription.userId}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="capitalize">
                      {subscription.plan}
                    </Badge>
                  </TableCell>
                  <TableCell>{subscription.startDate}</TableCell>
                  <TableCell>{subscription.expiryDate}</TableCell>
                  <TableCell>
                    {subscription.status === 'active' ? (
                      <Badge variant="outline" className="bg-green-50 text-green-800 dark:bg-green-900 dark:text-green-100">
                        <CheckCircle2 className="mr-1 h-3 w-3" /> Active
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="bg-yellow-50 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100">
                        Pending
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      {subscription.status === 'pending' && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleConfirmPayment(subscription.id)}
                        >
                          Confirm Payment
                        </Button>
                      )}
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => setSelectedSubscription(subscription)}
                          >
                            Manage
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Manage Subscription</DialogTitle>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                              <div className="font-medium">User:</div>
                              <div className="col-span-3">{selectedSubscription?.userName}</div>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <div className="font-medium">Plan:</div>
                              <div className="col-span-3 capitalize">{selectedSubscription?.plan}</div>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <div className="font-medium">Start Date:</div>
                              <div className="col-span-3">{selectedSubscription?.startDate}</div>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <div className="font-medium">Expiry Date:</div>
                              <div className="col-span-3">{selectedSubscription?.expiryDate}</div>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <div className="font-medium">Status:</div>
                              <div className="col-span-3 capitalize">{selectedSubscription?.status}</div>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <div className="font-medium">Payment:</div>
                              <div className="col-span-3 capitalize">{selectedSubscription?.paymentStatus}</div>
                            </div>
                          </div>
                          <div className="flex justify-between">
                            <Button 
                              variant="destructive"
                              onClick={() => handleCancelSubscription(selectedSubscription?.id)}
                            >
                              Cancel Subscription
                            </Button>
                            <Button 
                              variant="default"
                              onClick={() => handleExtendSubscription(selectedSubscription?.id)}
                            >
                              Extend Subscription
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
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

export default SubscriptionManagement;
