
import { EmailTemplate, TemplateType, getEmailTemplate } from './emailTemplates';

/**
 * Interface for email sending options
 */
export interface EmailOptions {
  to: string;
  from?: string;
  templateType: TemplateType;
  templateData: Record<string, string | number | boolean | undefined>;
  attachments?: Array<{
    filename: string;
    content: string | Buffer;
    contentType?: string;
  }>;
}

/**
 * Mock email sending function for frontend demonstration
 * In a real application, this would call a backend API endpoint
 */
export const sendEmail = async (options: EmailOptions): Promise<boolean> => {
  try {
    // In a real implementation, this would make an API call to your backend
    console.log('Sending email with options:', options);
    
    // Get the email template
    const template = getEmailTemplate(options.templateType, options.templateData);
    
    // Mock API call (in real app, you'd call your backend)
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Log the email (for development purposes)
    console.log('Email sent successfully:');
    console.log('To:', options.to);
    console.log('Subject:', template.subject);
    console.log('Body:', template.body.substring(0, 100) + '...');
    
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
};

/**
 * Send a test email
 */
export const sendTestEmail = async (email: string): Promise<boolean> => {
  return sendEmail({
    to: email,
    templateType: 'welcome',
    templateData: {
      name: 'Test User'
    }
  });
};
