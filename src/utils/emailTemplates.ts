
/**
 * Email templates for different types of emails
 */

export type TemplateType = 
  | 'welcome' 
  | 'reset-password' 
  | 'verification' 
  | 'invoice' 
  | 'withdrawal' 
  | 'distribution-approved'
  | 'distribution-rejected'
  | 'payment-received'
  | 'withdrawal-processed'
  | 'subscription-confirmation'
  | 'subscription-expiring';

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
    case 'distribution-approved':
      return {
        subject: 'Distribution Approved',
        body: `Dear ${data.name},\n\nYour distribution request for "${data.releaseName}" has been approved and will be sent to streaming platforms shortly.\n\nBest regards,\nThe Team`
      };
    case 'distribution-rejected':
      return {
        subject: 'Distribution Rejected',
        body: `Dear ${data.name},\n\nWe regret to inform you that your distribution request for "${data.releaseName}" has been rejected due to: ${data.reason}.\n\nPlease make the necessary adjustments and submit again.\n\nBest regards,\nThe Team`
      };
    case 'payment-received':
      return {
        subject: 'Payment Received',
        body: `Dear ${data.name},\n\nWe're pleased to inform you that a payment of ${data.amount} has been added to your account. Your current balance is ${data.currentBalance}.\n\nBest regards,\nThe Team`
      };
    case 'withdrawal-processed':
      return {
        subject: 'Withdrawal Processed',
        body: `Dear ${data.name},\n\nYour withdrawal of ${data.amount} has been processed via ${data.method}. Transaction ID: ${data.transactionId}.\n\nBest regards,\nThe Team`
      };
    case 'subscription-confirmation':
      return {
        subject: 'Subscription Confirmed',
        body: `Dear ${data.name},\n\nThank you for subscribing to our ${data.plan} plan. You have been charged ${data.amount}. Your next billing date is ${data.nextBillingDate}.\n\nBest regards,\nThe Team`
      };
    case 'subscription-expiring':
      return {
        subject: 'Subscription Expiring Soon',
        body: `Dear ${data.name},\n\nYour subscription will expire on ${data.expiryDate}. Please renew your subscription to continue using our services.\n\nBest regards,\nThe Team`
      };
    default:
      return {
        subject: 'Default Email',
        body: 'This is a default email template.'
      };
  }
};
