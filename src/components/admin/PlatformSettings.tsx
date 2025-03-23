
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Settings, Save, Wallet, Music } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const PlatformSettings = () => {
  const [distributionFee, setDistributionFee] = useState('20.00');
  const [minWithdrawal, setMinWithdrawal] = useState('25.00');
  const [saving, setSaving] = useState(false);
  
  const handleSaveSettings = async () => {
    setSaving(true);
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real application, you would make an API call here
      toast({
        title: "Settings updated",
        description: "Platform settings have been successfully updated",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update settings",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Settings className="h-6 w-6" />
          Platform Settings
        </h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Music className="h-5 w-5" />
              Distribution Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="distribution-fee">Distribution Fee (USD)</Label>
              <div className="flex space-x-2">
                <div className="relative flex-1">
                  <span className="absolute left-3 top-2.5">$</span>
                  <Input
                    id="distribution-fee"
                    type="number"
                    className="pl-7"
                    value={distributionFee}
                    onChange={(e) => setDistributionFee(e.target.value)}
                  />
                </div>
                <Button onClick={() => {
                  setDistributionFee('20.00');
                  toast({
                    title: "Reset to default",
                    description: "Distribution fee reset to $20.00",
                  });
                }}>
                  Reset
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">
                Fee charged per music release distribution
              </p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wallet className="h-5 w-5" />
              Withdrawal Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="min-withdrawal">Minimum Withdrawal Amount (USD)</Label>
              <div className="flex space-x-2">
                <div className="relative flex-1">
                  <span className="absolute left-3 top-2.5">$</span>
                  <Input
                    id="min-withdrawal"
                    type="number"
                    className="pl-7"
                    value={minWithdrawal}
                    onChange={(e) => setMinWithdrawal(e.target.value)}
                  />
                </div>
                <Button onClick={() => {
                  setMinWithdrawal('25.00');
                  toast({
                    title: "Reset to default",
                    description: "Minimum withdrawal amount reset to $25.00",
                  });
                }}>
                  Reset
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">
                Minimum amount required for users to request withdrawals
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Separator />
      
      <div className="flex justify-end">
        <Button 
          onClick={handleSaveSettings} 
          disabled={saving}
          className="flex items-center"
        >
          {saving ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Saving...
            </>
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" />
              Save Settings
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default PlatformSettings;
