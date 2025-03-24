
export interface EmailTemplate {
  subject: string;
  body: string;
}

export type TemplateType = 
  | 'welcome'
  | 'resetPassword'
  | 'distributionApproved'
  | 'distributionRejected'
  | 'paymentReceived'
  | 'withdrawalProcessed'
  | 'subscriptionConfirmation'
  | 'subscriptionExpiring';

interface TemplateData {
  [key: string]: string | number | boolean | undefined;
}

// Template definitions
const templates: Record<TemplateType, (data: TemplateData) => EmailTemplate> = {
  welcome: (data) => ({
    subject: 'Welcome to MalpinohDistro!',
    body: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
        <div style="text-align: center; margin-bottom: 20px;">
          <img src="https://yourdomain.com/logo.png" alt="MalpinohDistro Logo" style="height: 60px;" />
        </div>
        <h1 style="color: #e11d48; text-align: center;">Welcome to MalpinohDistro!</h1>
        <p>Hello ${data.name},</p>
        <p>Thank you for joining MalpinohDistro! We're excited to help you distribute your music globally.</p>
        <p>With your account, you can:</p>
        <ul>
          <li>Upload and distribute your music to major streaming platforms</li>
          <li>Track your streams and earnings</li>
          <li>Manage your artist profile</li>
        </ul>
        <div style="text-align: center; margin: 30px 0;">
          <a href="https://yourdomain.com/dashboard" style="background-color: #e11d48; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold;">Go to My Dashboard</a>
        </div>
        <p>If you have any questions, feel free to contact our support team.</p>
        <p>Best regards,<br />The MalpinohDistro Team</p>
        <div style="border-top: 1px solid #eee; margin-top: 30px; padding-top: 15px; font-size: 12px; color: #777; text-align: center;">
          <p>&copy; ${new Date().getFullYear()} MalpinohDistro. All rights reserved.</p>
        </div>
      </div>
    `
  }),
  
  resetPassword: (data) => ({
    subject: 'Reset Your MalpinohDistro Password',
    body: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
        <div style="text-align: center; margin-bottom: 20px;">
          <img src="https://yourdomain.com/logo.png" alt="MalpinohDistro Logo" style="height: 60px;" />
        </div>
        <h1 style="color: #e11d48; text-align: center;">Password Reset Request</h1>
        <p>Hello,</p>
        <p>We received a request to reset your password. Please click the button below to set a new password:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${data.resetLink}" style="background-color: #e11d48; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold;">Reset Password</a>
        </div>
        <p>If you didn't request a password reset, you can safely ignore this email.</p>
        <p>This link will expire in 24 hours.</p>
        <p>Best regards,<br />The MalpinohDistro Team</p>
        <div style="border-top: 1px solid #eee; margin-top: 30px; padding-top: 15px; font-size: 12px; color: #777; text-align: center;">
          <p>&copy; ${new Date().getFullYear()} MalpinohDistro. All rights reserved.</p>
        </div>
      </div>
    `
  }),
  
  distributionApproved: (data) => ({
    subject: 'Your Distribution Has Been Approved!',
    body: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
        <div style="text-align: center; margin-bottom: 20px;">
          <img src="https://yourdomain.com/logo.png" alt="MalpinohDistro Logo" style="height: 60px;" />
        </div>
        <h1 style="color: #e11d48; text-align: center;">Distribution Approved!</h1>
        <p>Hello ${data.name},</p>
        <p>Great news! Your release "${data.releaseName}" has been approved for distribution.</p>
        <p>Your music will be delivered to the following platforms within the next few days:</p>
        <ul>
          <li>Spotify</li>
          <li>Apple Music</li>
          <li>Amazon Music</li>
          <li>YouTube Music</li>
          <li>And more...</li>
        </ul>
        <div style="text-align: center; margin: 30px 0;">
          <a href="https://yourdomain.com/dashboard" style="background-color: #e11d48; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold;">View Release Details</a>
        </div>
        <p>Best regards,<br />The MalpinohDistro Team</p>
        <div style="border-top: 1px solid #eee; margin-top: 30px; padding-top: 15px; font-size: 12px; color: #777; text-align: center;">
          <p>&copy; ${new Date().getFullYear()} MalpinohDistro. All rights reserved.</p>
        </div>
      </div>
    `
  }),
  
  distributionRejected: (data) => ({
    subject: 'Action Required: Your Distribution Needs Attention',
    body: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
        <div style="text-align: center; margin-bottom: 20px;">
          <img src="https://yourdomain.com/logo.png" alt="MalpinohDistro Logo" style="height: 60px;" />
        </div>
        <h1 style="color: #e11d48; text-align: center;">Distribution Requires Updates</h1>
        <p>Hello ${data.name},</p>
        <p>We've reviewed your release "${data.releaseName}" and it requires some updates before we can proceed with distribution.</p>
        <p><strong>Reason:</strong> ${data.reason}</p>
        <p>Please log in to your dashboard to make the necessary changes and resubmit your release.</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="https://yourdomain.com/dashboard" style="background-color: #e11d48; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold;">Update Release</a>
        </div>
        <p>If you have any questions, please contact our support team.</p>
        <p>Best regards,<br />The MalpinohDistro Team</p>
        <div style="border-top: 1px solid #eee; margin-top: 30px; padding-top: 15px; font-size: 12px; color: #777; text-align: center;">
          <p>&copy; ${new Date().getFullYear()} MalpinohDistro. All rights reserved.</p>
        </div>
      </div>
    `
  }),
  
  paymentReceived: (data) => ({
    subject: 'Payment Received: Streaming Royalties',
    body: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
        <div style="text-align: center; margin-bottom: 20px;">
          <img src="https://yourdomain.com/logo.png" alt="MalpinohDistro Logo" style="height: 60px;" />
        </div>
        <h1 style="color: #e11d48; text-align: center;">Royalty Payment Update</h1>
        <p>Hello ${data.name},</p>
        <p>We're pleased to inform you that we've received streaming royalties for your music.</p>
        <p><strong>Amount Added to Your Balance:</strong> $${data.amount}</p>
        <p><strong>Current Balance:</strong> $${data.currentBalance}</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="https://yourdomain.com/dashboard/earnings" style="background-color: #e11d48; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold;">View Earnings</a>
        </div>
        <p>Keep up the great work!</p>
        <p>Best regards,<br />The MalpinohDistro Team</p>
        <div style="border-top: 1px solid #eee; margin-top: 30px; padding-top: 15px; font-size: 12px; color: #777; text-align: center;">
          <p>&copy; ${new Date().getFullYear()} MalpinohDistro. All rights reserved.</p>
        </div>
      </div>
    `
  }),
  
  withdrawalProcessed: (data) => ({
    subject: 'Your Withdrawal Has Been Processed',
    body: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
        <div style="text-align: center; margin-bottom: 20px;">
          <img src="https://yourdomain.com/logo.png" alt="MalpinohDistro Logo" style="height: 60px;" />
        </div>
        <h1 style="color: #e11d48; text-align: center;">Withdrawal Processed</h1>
        <p>Hello ${data.name},</p>
        <p>We've processed your withdrawal request.</p>
        <p><strong>Amount:</strong> $${data.amount}</p>
        <p><strong>Payment Method:</strong> ${data.method}</p>
        <p><strong>Transaction ID:</strong> ${data.transactionId}</p>
        <p>The funds should arrive in your account within 1-3 business days, depending on your payment method.</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="https://yourdomain.com/dashboard/withdrawals" style="background-color: #e11d48; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold;">View Withdrawal History</a>
        </div>
        <p>Best regards,<br />The MalpinohDistro Team</p>
        <div style="border-top: 1px solid #eee; margin-top: 30px; padding-top: 15px; font-size: 12px; color: #777; text-align: center;">
          <p>&copy; ${new Date().getFullYear()} MalpinohDistro. All rights reserved.</p>
        </div>
      </div>
    `
  }),
  
  subscriptionConfirmation: (data) => ({
    subject: 'Subscription Confirmation - MalpinohDistro',
    body: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
        <div style="text-align: center; margin-bottom: 20px;">
          <img src="https://yourdomain.com/logo.png" alt="MalpinohDistro Logo" style="height: 60px;" />
        </div>
        <h1 style="color: #e11d48; text-align: center;">Subscription Confirmed</h1>
        <p>Hello ${data.name},</p>
        <p>Thank you for subscribing to MalpinohDistro ${data.plan} Plan!</p>
        <p><strong>Plan:</strong> ${data.plan}</p>
        <p><strong>Amount:</strong> $${data.amount}</p>
        <p><strong>Next Billing Date:</strong> ${data.nextBillingDate}</p>
        <p>You now have full access to all our distribution services and features.</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="https://yourdomain.com/dashboard" style="background-color: #e11d48; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold;">Go to Dashboard</a>
        </div>
        <p>Best regards,<br />The MalpinohDistro Team</p>
        <div style="border-top: 1px solid #eee; margin-top: 30px; padding-top: 15px; font-size: 12px; color: #777; text-align: center;">
          <p>&copy; ${new Date().getFullYear()} MalpinohDistro. All rights reserved.</p>
        </div>
      </div>
    `
  }),
  
  subscriptionExpiring: (data) => ({
    subject: 'Your MalpinohDistro Subscription is Expiring Soon',
    body: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
        <div style="text-align: center; margin-bottom: 20px;">
          <img src="https://yourdomain.com/logo.png" alt="MalpinohDistro Logo" style="height: 60px;" />
        </div>
        <h1 style="color: #e11d48; text-align: center;">Subscription Expiring Soon</h1>
        <p>Hello ${data.name},</p>
        <p>This is a friendly reminder that your MalpinohDistro subscription will expire on <strong>${data.expiryDate}</strong>.</p>
        <p>To ensure uninterrupted access to our distribution services and to maintain your music on streaming platforms, please renew your subscription before the expiration date.</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="https://yourdomain.com/pricing" style="background-color: #e11d48; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold;">Renew Subscription</a>
        </div>
        <p>Thank you for choosing MalpinohDistro for your music distribution!</p>
        <p>Best regards,<br />The MalpinohDistro Team</p>
        <div style="border-top: 1px solid #eee; margin-top: 30px; padding-top: 15px; font-size: 12px; color: #777; text-align: center;">
          <p>&copy; ${new Date().getFullYear()} MalpinohDistro. All rights reserved.</p>
        </div>
      </div>
    `
  })
};

/**
 * Get an email template with populated data
 * @param type The type of template to get
 * @param data The data to populate the template with
 * @returns The populated email template with subject and body
 */
export const getEmailTemplate = (type: TemplateType, data: TemplateData): EmailTemplate => {
  if (!templates[type]) {
    throw new Error(`Email template "${type}" not found`);
  }
  return templates[type](data);
};
