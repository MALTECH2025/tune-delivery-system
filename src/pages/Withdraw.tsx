
import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { Wallet, AlertCircle, RefreshCw } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getUserBalance, getWithdrawalHistory, submitWithdrawalRequest } from "@/utils/withdrawalService";
import { supabase } from "@/integrations/supabase/client";

const Withdraw = () => {
  const { isAuthenticated, user } = useAuth();
  const [amount, setAmount] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  
  // Fetch user profile to get wallet info
  const { data: profile, isLoading: profileLoading } = useQuery({
    queryKey: ['profile', user?.id],
    queryFn: async () => {
      if (!user?.id) return null;
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: !!user?.id,
  });
  
  // Fetch user balance and withdrawal history
  const { data: balanceData, isLoading: balanceLoading, refetch: refetchBalance } = useQuery({
    queryKey: ['balance', user?.id],
    queryFn: async () => {
      if (!user?.id) return { balance: 0, withdrawals: [] };
      
      // Get available balance
      const balance = await getUserBalance(user.id);
      
      // Get withdrawal history
      const withdrawals = await getWithdrawalHistory(user.id, 5);
      
      return { balance, withdrawals };
    },
    enabled: !!user?.id,
  });
  
  // Handle withdrawal submission
  const withdrawalMutation = useMutation({
    mutationFn: async (withdrawAmount: number) => {
      setIsSubmitting(true);
      
      if (!user?.id) {
        throw new Error('User not authenticated');
      }
      
      const success = await submitWithdrawalRequest({
        amount: withdrawAmount,
        userId: user.id,
        walletAddress: profile?.opay_wallet || 'Wallet not specified'
      });
      
      if (!success) {
        throw new Error('Failed to process withdrawal');
      }
      
      return { success };
    },
    onSuccess: () => {
      toast({
        title: "Withdrawal requested",
        description: `$${parseFloat(amount).toFixed(2)} will be sent to your OPay wallet within 1-3 business days.`,
      });
      setAmount('');
      refetchBalance();
      setIsSubmitting(false);
    },
    onError: (error: Error) => {
      toast({
        title: "Withdrawal failed",
        description: error.message,
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  });
  
  // Redirect if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  // Calculate minimum withdrawal amount
  const minWithdrawal = 25;
  const balance = balanceData?.balance || 0;
  
  const handleWithdraw = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    const withdrawAmount = parseFloat(amount);
    if (isNaN(withdrawAmount)) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid number",
        variant: "destructive",
      });
      return;
    }
    
    if (withdrawAmount < minWithdrawal) {
      toast({
        title: "Minimum withdrawal not met",
        description: `The minimum withdrawal amount is $${minWithdrawal}`,
        variant: "destructive",
      });
      return;
    }
    
    if (withdrawAmount > balance) {
      toast({
        title: "Insufficient funds",
        description: "You do not have enough balance for this withdrawal",
        variant: "destructive",
      });
      return;
    }
    
    // Check if wallet is set up
    if (!profile?.opay_wallet) {
      toast({
        title: "Wallet not set up",
        description: "Please set up your OPay wallet in settings before withdrawing",
        variant: "destructive",
      });
      return;
    }
    
    // Process withdrawal
    withdrawalMutation.mutate(withdrawAmount);
  };
  
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };
  
  // Get status badge class
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100';
      case 'rejected':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100';
      default:
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100';
    }
  };
  
  return (
    <div className="min-h-screen bg-background pt-20">
      <header className="bg-card shadow-md">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-card-foreground">Withdraw Earnings</h1>
          <p className="text-muted-foreground mt-2">Transfer your earnings to your OPay wallet</p>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Request Withdrawal</CardTitle>
              <CardDescription>
                Withdrawals are processed within 1-3 business days
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Alert className="mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Important</AlertTitle>
                <AlertDescription>
                  The minimum withdrawal amount is ${minWithdrawal}. 
                  {!profile?.opay_wallet && " Please set up your OPay wallet in your settings first."}
                </AlertDescription>
              </Alert>
              
              <form onSubmit={handleWithdraw}>
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="amount">Amount (USD)</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">$</span>
                      <Input
                        id="amount"
                        placeholder="0.00"
                        className="pl-8"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        type="number"
                        step="0.01"
                        min={minWithdrawal}
                        max={balance}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="wallet">Destination Wallet</Label>
                    <Input
                      id="wallet"
                      value={profile?.opay_wallet || "No wallet connected (Set up in Settings)"}
                      disabled
                    />
                  </div>
                </div>
                
                <Button
                  type="submit"
                  className="w-full mt-6 bg-red-600 hover:bg-red-700"
                  disabled={isSubmitting || !profile?.opay_wallet || balanceLoading}
                >
                  {isSubmitting ? "Processing..." : "Withdraw Funds"}
                </Button>
              </form>
            </CardContent>
          </Card>
          
          <div className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle>Available Balance</CardTitle>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => refetchBalance()} 
                  title="Refresh balance"
                >
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  {balanceLoading ? (
                    <div className="animate-pulse h-9 w-28 bg-muted rounded"></div>
                  ) : (
                    <span className="text-3xl font-bold">${balance.toFixed(2)}</span>
                  )}
                  <Wallet className="h-8 w-8 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Withdrawal History</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                {balanceLoading ? (
                  <div className="space-y-4 p-6">
                    <div className="animate-pulse h-12 bg-muted rounded"></div>
                    <div className="animate-pulse h-12 bg-muted rounded"></div>
                  </div>
                ) : balanceData?.withdrawals.length === 0 ? (
                  <div className="px-6 py-8 text-center text-muted-foreground">
                    No withdrawal history found
                  </div>
                ) : (
                  balanceData?.withdrawals.map((withdrawal, index) => (
                    <div key={withdrawal.id} className={`px-6 py-4 ${index !== balanceData.withdrawals.length - 1 ? 'border-b border-border' : ''}`}>
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">${withdrawal.amount.toFixed(2)}</p>
                          <p className="text-sm text-muted-foreground">{formatDate(withdrawal.requested_at)}</p>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs ${getStatusBadge(withdrawal.status)}`}>
                          {withdrawal.status.charAt(0).toUpperCase() + withdrawal.status.slice(1)}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
              <CardFooter className="border-t border-border">
                <Button variant="outline" className="w-full" size="sm" onClick={() => navigate('/dashboard')}>
                  Back to Dashboard
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
      
      <footer className="bg-card border-t border-border mt-12 py-8">
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

export default Withdraw;
