
import React, { useState } from 'react';
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { Wallet, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const Withdraw = () => {
  const { isAuthenticated, user } = useAuth();
  const [amount, setAmount] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate(); // Add navigate hook
  
  // Mocked balance data (would come from API in production)
  const balance = 125.42;
  const minWithdrawal = 25;
  
  // Redirect if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
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
    
    // Process withdrawal
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Withdrawal requested",
        description: `$${withdrawAmount.toFixed(2)} will be sent to your OPay wallet within 1-3 business days.`,
      });
      setAmount('');
      setIsSubmitting(false);
      
      // Redirect to dashboard after successful withdrawal
      navigate('/dashboard');
    }, 1500);
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
                  The minimum withdrawal amount is ${minWithdrawal}. Ensure your OPay wallet is correctly linked in your settings.
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
                    <Label htmlFor="wallet">Destination</Label>
                    <Input
                      id="wallet"
                      value="OPay Wallet (linked)"
                      disabled
                    />
                  </div>
                </div>
                
                <Button
                  type="submit"
                  className="w-full mt-6 bg-red-600 hover:bg-red-700"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Processing..." : "Withdraw Funds"}
                </Button>
              </form>
            </CardContent>
          </Card>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Available Balance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold">${balance.toFixed(2)}</span>
                  <Wallet className="h-8 w-8 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Withdrawal History</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="px-6 py-4 border-b border-border">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">$85.50</p>
                      <p className="text-sm text-muted-foreground">April 15, 2024</p>
                    </div>
                    <span className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 px-2 py-1 rounded-full text-xs">Completed</span>
                  </div>
                </div>
                <div className="px-6 py-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">$42.25</p>
                      <p className="text-sm text-muted-foreground">March 02, 2024</p>
                    </div>
                    <span className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 px-2 py-1 rounded-full text-xs">Completed</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t border-border">
                <Button variant="outline" className="w-full" size="sm">
                  View All Transactions
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
