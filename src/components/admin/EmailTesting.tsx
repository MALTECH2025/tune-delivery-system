
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { Mail, SendHorizontal } from 'lucide-react';
import { TemplateType, getEmailTemplate } from '@/utils/emailTemplates';
import { sendEmail } from '@/utils/emailService';

const EmailTesting = () => {
  const [email, setEmail] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateType>('welcome');
  const [previewHtml, setPreviewHtml] = useState('');
  const [loading, setLoading] = useState(false);
  
  const templateTypes: TemplateType[] = [
    'welcome',
    'reset-password',
    'distribution-approved',
    'distribution-rejected',
    'payment-received',
    'withdrawal-processed',
    'subscription-confirmation',
    'subscription-expiring',
  ];
  
  // Sample data for templates
  const sampleData: Record<string, Record<string, string | number>> = {
    'welcome': { name: 'John Doe' },
    'reset-password': { resetLink: 'https://example.com/reset-password?token=123456' },
    'distribution-approved': { name: 'John Doe', releaseName: 'Summer Vibes' },
    'distribution-rejected': { name: 'John Doe', releaseName: 'Summer Vibes', reason: 'Low quality artwork' },
    'payment-received': { name: 'John Doe', amount: 125.50, currentBalance: 325.75 },
    'withdrawal-processed': { name: 'John Doe', amount: 200, method: 'Bank Transfer', transactionId: 'TX123456789' },
    'subscription-confirmation': { name: 'John Doe', plan: 'Yearly', amount: 99.99, nextBillingDate: '2025-04-01' },
    'subscription-expiring': { name: 'John Doe', expiryDate: '2024-04-30' },
  };
  
  const previewTemplate = () => {
    try {
      const template = getEmailTemplate(selectedTemplate, sampleData[selectedTemplate]);
      setPreviewHtml(template.body);
    } catch (error) {
      console.error('Error previewing template:', error);
      toast({
        title: 'Error',
        description: 'Could not preview the email template',
        variant: 'destructive',
      });
    }
  };
  
  const handleSendTestEmail = async () => {
    if (!email) {
      toast({
        title: 'Error',
        description: 'Please enter an email address',
        variant: 'destructive',
      });
      return;
    }
    
    setLoading(true);
    try {
      const success = await sendEmail({
        to: email,
        templateType: selectedTemplate,
        templateData: sampleData[selectedTemplate],
      });
      
      if (success) {
        toast({
          title: 'Success',
          description: `Test email sent to ${email}`,
        });
      } else {
        toast({
          title: 'Error',
          description: 'Failed to send test email',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Error sending test email:', error);
      toast({
        title: 'Error',
        description: 'An error occurred while sending the test email',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Mail className="h-6 w-6" />
          Email Templates
        </h2>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Email Template Testing</CardTitle>
            <CardDescription>
              Preview and send test emails using the available templates
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Select Template</label>
              <Select
                value={selectedTemplate}
                onValueChange={(value: TemplateType) => setSelectedTemplate(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a template" />
                </SelectTrigger>
                <SelectContent>
                  {templateTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Button onClick={previewTemplate} variant="outline" className="w-full">
                Preview Template
              </Button>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Send Test Email</label>
              <div className="flex space-x-2">
                <Input
                  placeholder="recipient@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Button onClick={handleSendTestEmail} disabled={loading}>
                  {loading ? (
                    "Sending..."
                  ) : (
                    <>
                      <SendHorizontal className="mr-2 h-4 w-4" />
                      Send
                    </>
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Template Preview</CardTitle>
            <CardDescription>
              See how your email will look to recipients
            </CardDescription>
          </CardHeader>
          <CardContent>
            {previewHtml ? (
              <div className="border rounded-md p-4 max-h-[500px] overflow-auto bg-white">
                <div dangerouslySetInnerHTML={{ __html: previewHtml }} />
              </div>
            ) : (
              <div className="flex items-center justify-center h-64 border rounded-md bg-muted/20">
                <p className="text-muted-foreground">Select a template and click "Preview Template"</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EmailTesting;
