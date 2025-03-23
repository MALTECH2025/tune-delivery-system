
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, AlertTriangle } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';

interface PricingTier {
  id: string;
  name: string;
  duration: 'monthly' | 'quarterly' | 'yearly';
  priceUSD: number;
  localPrice?: number;
  localCurrency?: string;
  features: string[];
}

const Pricing = () => {
  const { user, updateUser, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState<PricingTier | null>(null);
  const [exchangeRate, setExchangeRate] = useState<number | null>(null);
  const [localCurrency, setLocalCurrency] = useState<string>('NGN');
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  
  // Example pricing tiers
  const pricingTiers: PricingTier[] = [
    {
      id: 'monthly',
      name: 'Monthly Plan',
      duration: 'monthly',
      priceUSD: 12.9,
      features: [
        'Distribute unlimited songs',
        'Access to all streaming platforms',
        'Basic analytics',
        'Email support',
      ],
    },
    {
      id: 'quarterly',
      name: '4 Month Plan',
      duration: 'quarterly',
      priceUSD: 15,
      features: [
        'All monthly plan features',
        'Priority distribution processing',
        'Advanced analytics',
        'Priority email support',
      ],
    },
    {
      id: 'yearly',
      name: 'Yearly Plan',
      duration: 'yearly',
      priceUSD: 22.58,
      features: [
        'All quarterly plan features',
        'VIP distribution status',
        'Exclusive promotional opportunities',
        'Phone support',
      ],
    },
  ];
  
  // Fetch exchange rate and user location
  useEffect(() => {
    // In a real app, you would fetch the exchange rate from an API
    // For this example, we'll use a mock rate for NGN
    const mockExchangeRate = 1550; // 1 USD = 1550 NGN
    setExchangeRate(mockExchangeRate);
    
    // Calculate local prices
    if (exchangeRate) {
      pricingTiers.forEach(tier => {
        tier.localPrice = +(tier.priceUSD * mockExchangeRate).toFixed(2);
        tier.localCurrency = localCurrency;
      });
    }
  }, [localCurrency]);
  
  const handleSelectPlan = (plan: PricingTier) => {
    setSelectedPlan(plan);
    setShowPaymentDialog(true);
  };
  
  const handlePaymentSubmit = () => {
    if (selectedPlan) {
      // In a real app, you would process the payment here
      toast({
        title: "Payment Initiated",
        description: "Please complete your payment to activate your subscription.",
      });
      
      setShowPaymentDialog(false);
      
      // For demo purposes, we'll simulate a successful payment and activation
      if (user && isAdmin) {
        // Admin doesn't need a subscription
        navigate('/admin');
      } else {
        // In a real app, you would redirect to a payment processor
        // For now, we'll just show guidance about manual payment
        toast({
          title: "Manual Payment Required",
          description: "Please send payment to OPay wallet: 8168940582 (Abdulkadir Ibrahim Oluwashina)",
        });
      }
    }
  };
  
  const handleDemoActivate = () => {
    if (selectedPlan && user) {
      // Calculate expiry date based on plan
      const today = new Date();
      let expiryDate: Date;
      
      switch (selectedPlan.duration) {
        case 'monthly':
          expiryDate = new Date(today.setMonth(today.getMonth() + 1));
          break;
        case 'quarterly':
          expiryDate = new Date(today.setMonth(today.getMonth() + 4));
          break;
        case 'yearly':
          expiryDate = new Date(today.setFullYear(today.getFullYear() + 1));
          break;
        default:
          expiryDate = new Date(today.setMonth(today.getMonth() + 1));
      }
      
      // Update user with subscription info
      updateUser({
        subscriptionPlan: selectedPlan.duration,
        subscriptionExpiryDate: expiryDate.toISOString(),
      });
      
      toast({
        title: "Subscription Activated",
        description: "Your subscription has been activated successfully!",
      });
      
      // Redirect to dashboard
      navigate('/dashboard');
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Choose Your Distribution Plan</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Select the perfect subscription plan for your music distribution needs
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingTiers.map((tier) => (
            <Card key={tier.id} className={`border-2 ${selectedPlan?.id === tier.id ? 'border-primary' : 'border-border'} relative`}>
              {tier.duration === 'yearly' && (
                <Badge className="absolute top-4 right-4 bg-primary" variant="default">
                  Best Value
                </Badge>
              )}
              <CardHeader>
                <CardTitle className="text-2xl">{tier.name}</CardTitle>
                <CardDescription>
                  {tier.duration === 'monthly' 
                    ? '1 Month' 
                    : tier.duration === 'quarterly' 
                      ? '4 Months' 
                      : '12 Months'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <span className="text-4xl font-bold">${tier.priceUSD}</span>
                  <span className="text-muted-foreground"> / {tier.duration}</span>
                  
                  {exchangeRate && (
                    <div className="text-sm text-muted-foreground mt-1">
                      Approx. {localCurrency} {tier.localPrice?.toLocaleString()}
                    </div>
                  )}
                </div>
                
                <ul className="space-y-2">
                  {tier.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full"
                  onClick={() => handleSelectPlan(tier)}
                >
                  Select Plan
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="mt-16 max-w-3xl mx-auto bg-yellow-50 p-6 rounded-lg border border-yellow-200">
          <div className="flex items-start space-x-4">
            <AlertTriangle className="h-6 w-6 text-yellow-500 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-lg mb-2">Payment Instructions</h3>
              <p className="text-gray-700">
                After selecting your plan, please send the payment to:
              </p>
              <ul className="mt-2 space-y-1">
                <li><strong>Payment Method:</strong> OPay</li>
                <li><strong>Account Number:</strong> 8168940582</li>
                <li><strong>Account Name:</strong> Abdulkadir Ibrahim Oluwashina</li>
              </ul>
              <p className="mt-4 text-gray-700">
                After sending payment, please contact admin for subscription activation.
                For demo purposes, you can use the "Activate Demo" button below.
              </p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={handleDemoActivate}
              >
                Activate Demo (for testing)
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Complete Your Subscription</DialogTitle>
            <DialogDescription>
              Please follow these payment instructions to activate your {selectedPlan?.name}.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <h4 className="font-medium">Payment Details:</h4>
              <ul className="space-y-1 text-sm">
                <li><strong>Plan:</strong> {selectedPlan?.name}</li>
                <li><strong>Amount:</strong> ${selectedPlan?.priceUSD} (approx. {localCurrency} {selectedPlan?.localPrice?.toLocaleString()})</li>
                <li><strong>Payment Method:</strong> OPay</li>
                <li><strong>Account Number:</strong> 8168940582</li>
                <li><strong>Account Name:</strong> Abdulkadir Ibrahim Oluwashina</li>
              </ul>
            </div>
            
            <div className="text-sm text-muted-foreground">
              <p>
                After making the payment, please contact our admin for manual verification
                and activation of your subscription.
              </p>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPaymentDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handlePaymentSubmit}>
              I've Made the Payment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Pricing;
