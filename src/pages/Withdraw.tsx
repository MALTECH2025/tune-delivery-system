
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from '@/hooks/use-toast';
import { useQuery } from '@tanstack/react-query';
import { getWithdrawalHistory } from '@/services/dashboardService';
import { getUserBalance, getMinWithdrawalAmount } from '@/utils/withdrawalService';
import { supabase } from '@/integrations/supabase/client';

const Withdraw = () => {
  const { isAuthenticated, user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [availableBalance, setAvailableBalance] = useState(0);
  const [minWithdrawalAmount, setMinWithdrawalAmount] = useState(25);
  
  // Get withdrawal history
  const { data: withdrawalHistory = [], refetch: refetchHistory } = useQuery({
    queryKey: ['withdrawalHistory', user?.id],
    queryFn: () => getWithdrawalHistory(user?.id || ''),
    enabled: !!user?.id && isAuthenticated,
  });
  
  // Fetch available balance and minimum withdrawal amount
  useEffect(() => {
    const fetchBalanceData = async () => {
      if (user?.id) {
        try {
          const balance = await getUserBalance(user.id);
          setAvailableBalance(balance);
          
          const minAmount = await getMinWithdrawalAmount();
          setMinWithdrawalAmount(minAmount);
        } catch (error) {
          console.error('Error fetching balance data:', error);
        }
      }
    };
    
    fetchBalanceData();
  }, [user?.id]);
  
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  // Handle submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate amount
    const withdrawalAmount = parseFloat(amount);
    if (isNaN(withdrawalAmount) || withdrawalAmount <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid amount",
        variant: "destructive",
      });
      return;
    }
    
    // Check minimum amount
    if (withdrawalAmount < minWithdrawalAmount) {
      toast({
        title: "Amount too low",
        description: `Minimum withdrawal amount is $${minWithdrawalAmount}`,
        variant: "destructive",
      });
      return;
    }
    
    // Check if enough balance
    if (withdrawalAmount > availableBalance) {
      toast({
        title: "Insufficient balance",
        description: `Your available balance is $${availableBalance.toFixed(2)}`,
        variant: "destructive",
      });
      return;
    }
    
    // Check wallet address
    if (!walletAddress.trim()) {
      toast({
        title: "Missing wallet address",
        description: "Please enter your wallet address",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);
    
    try {
      // Submit withdrawal request
      const { data, error } = await supabase
        .from('withdrawals')
        .insert({
          user_id: user?.id,
          amount: withdrawalAmount,
          wallet: walletAddress,
          status: 'pending'
        })
        .select()
        .single();
      
      if (error) throw error;
      
      // Update balance
      setAvailableBalance(prev => prev - withdrawalAmount);
      
      // Reset form
      setAmount('');
      setWalletAddress('');
      
      // Refetch history
      refetchHistory();
      
      toast({
        title: "Withdrawal requested",
        description: `Your withdrawal request for $${withdrawalAmount.toFixed(2)} has been submitted`,
      });
    } catch (error: any) {
      console.error('Error submitting withdrawal:', error);
      toast({
        title: "Request failed",
        description: error.message || "An error occurred while submitting your request",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  // Status badge color
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'rejected':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400';
    }
  };
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold">Withdraw Earnings</h1>
          <p className="text-muted-foreground mt-2">Request a withdrawal of your earnings</p>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Withdrawal Form */}
          <div className="md:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Request Withdrawal</CardTitle>
                <CardDescription>Enter the amount you want to withdraw</CardDescription>
              </CardHeader>
              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="balance">Available Balance</Label>
                    <div className="text-2xl font-bold">${availableBalance.toFixed(2)}</div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Minimum withdrawal: ${minWithdrawalAmount}
                    </p>
                  </div>
                  
                  <div>
                    <Label htmlFor="amount">Amount</Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <span className="text-gray-500">$</span>
                      </div>
                      <Input
                        id="amount"
                        type="number"
                        placeholder="0.00"
                        className="pl-8"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        min={minWithdrawalAmount}
                        max={availableBalance}
                        step="0.01"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="wallet">Wallet Address</Label>
                    <Input
                      id="wallet"
                      placeholder="Enter your wallet address"
                      value={walletAddress}
                      onChange={(e) => setWalletAddress(e.target.value)}
                      required
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={loading || availableBalance < minWithdrawalAmount}
                  >
                    {loading ? 'Processing...' : 'Request Withdrawal'}
                  </Button>
                </CardFooter>
              </form>
            </Card>
            
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Withdrawal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h3 className="font-medium">Processing Time</h3>
                  <p className="text-sm text-muted-foreground">
                    Withdrawal requests are typically processed within 3-5 business days after admin approval.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-medium">Payment Methods</h3>
                  <p className="text-sm text-muted-foreground">
                    We currently support payouts to Opay wallets. Make sure to provide your correct Opay wallet ID.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-medium">Fees</h3>
                  <p className="text-sm text-muted-foreground">
                    There is a 1% processing fee for all withdrawals, with a minimum fee of $1.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Withdrawal History */}
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Withdrawal History</CardTitle>
                <CardDescription>Your past withdrawal requests and their status</CardDescription>
              </CardHeader>
              <CardContent>
                {withdrawalHistory.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <p>You haven't made any withdrawal requests yet.</p>
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date Requested</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Wallet</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Processed Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {withdrawalHistory.map((withdrawal: any) => (
                        <TableRow key={withdrawal.id}>
                          <TableCell>{formatDate(withdrawal.requested_at)}</TableCell>
                          <TableCell>${parseFloat(withdrawal.amount).toFixed(2)}</TableCell>
                          <TableCell className="max-w-[150px] truncate">
                            {withdrawal.wallet}
                          </TableCell>
                          <TableCell>
                            <span className={`px-2 py-1 rounded-full text-xs ${getStatusBadgeClass(withdrawal.status)}`}>
                              {withdrawal.status.charAt(0).toUpperCase() + withdrawal.status.slice(1)}
                            </span>
                          </TableCell>
                          <TableCell>
                            {withdrawal.processed_at 
                              ? formatDate(withdrawal.processed_at) 
                              : '-'}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Withdraw;
