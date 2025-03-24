/**
 * Email templates for different types of emails
 */

export type TemplateType = 'welcome' | 'reset-password' | 'verification' | 'invoice' | 'withdrawal';

export interface EmailTemplate {
  subject: string;
  body: string;
}

/**
 * Get the email template based on the template type
 */
export const getEmailTemplate = (templateType: TemplateType, data: Record<string, string | number | boolean | undefined>): EmailTemplate => {
  switch (templateType) {
    case 'welcome':
      return {
        subject: 'Welcome to Our Platform!',
        body: `Dear ${data.name},\n\nWelcome to our platform! We're excited to have you on board.\n\nBest regards,\nThe Team`
      };
    case 'reset-password':
      return {
        subject: 'Reset Your Password',
        body: `Dear User,\n\nPlease click on the following link to reset your password: ${data.resetLink}\n\nIf you did not request a password reset, please ignore this email.\n\nBest regards,\nThe Team`
      };
    case 'verification':
      return {
        subject: 'Verify Your Email',
        body: `Dear User,\n\nPlease click on the following link to verify your email: ${data.verificationLink}\n\nBest regards,\nThe Team`
      };
    case 'invoice':
      return {
        subject: 'Your Invoice',
        body: `Dear ${data.name},\n\nHere is your invoice for ${data.amount}:\n\nThank you for your business!\n\nBest regards,\nThe Team`
      };
    case 'withdrawal':
      return {
        subject: 'Withdrawal Confirmation',
        body: `Dear ${data.name},\n\nYour withdrawal request of ${data.amount} has been processed on ${data.date} to wallet ${data.wallet}.\n\nBest regards,\nThe Team`
      };
    default:
      return {
        subject: 'Default Email',
        body: 'This is a default email template.'
      };
  }
};
