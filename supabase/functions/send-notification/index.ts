
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Simple email template renderer
const renderEmailTemplate = (templateType, data) => {
  const templates = {
    "welcome": {
      subject: "Welcome to Our Platform!",
      body: `Dear ${data.name},\n\nWelcome to our platform! We're excited to have you on board.\n\nBest regards,\nThe Team`
    },
    "reset-password": {
      subject: "Reset Your Password",
      body: `Dear User,\n\nPlease click on the following link to reset your password: ${data.resetLink}\n\nIf you did not request a password reset, please ignore this email.\n\nBest regards,\nThe Team`
    },
    "verification": {
      subject: "Verify Your Email",
      body: `Dear User,\n\nPlease click on the following link to verify your email: ${data.verificationLink}\n\nBest regards,\nThe Team`
    },
    "invoice": {
      subject: "Your Invoice",
      body: `Dear ${data.name},\n\nHere is your invoice for ${data.amount}:\n\nThank you for your business!\n\nBest regards,\nThe Team`
    },
    "withdrawal": {
      subject: "Withdrawal Confirmation",
      body: `Dear ${data.name},\n\nYour withdrawal request of ${data.amount} has been processed on ${data.date} to wallet ${data.wallet}.\n\nBest regards,\nThe Team`
    },
    "distribution-approved": {
      subject: "Distribution Approved",
      body: `Dear ${data.name},\n\nYour distribution request for "${data.releaseName}" has been approved and will be sent to streaming platforms shortly.\n\nBest regards,\nThe Team`
    },
    "distribution-rejected": {
      subject: "Distribution Rejected",
      body: `Dear ${data.name},\n\nWe regret to inform you that your distribution request for "${data.releaseName}" has been rejected due to: ${data.reason}.\n\nPlease make the necessary adjustments and submit again.\n\nBest regards,\nThe Team`
    },
    "payment-received": {
      subject: "Payment Received",
      body: `Dear ${data.name},\n\nWe're pleased to inform you that a payment of ${data.amount} has been added to your account. Your current balance is ${data.currentBalance}.\n\nBest regards,\nThe Team`
    },
    "withdrawal-processed": {
      subject: "Withdrawal Processed",
      body: `Dear ${data.name},\n\nYour withdrawal of ${data.amount} has been processed via ${data.method}. Transaction ID: ${data.transactionId}.\n\nBest regards,\nThe Team`
    },
    "subscription-confirmation": {
      subject: "Subscription Confirmed",
      body: `Dear ${data.name},\n\nThank you for subscribing to our ${data.plan} plan. You have been charged ${data.amount}. Your next billing date is ${data.nextBillingDate}.\n\nBest regards,\nThe Team`
    },
    "subscription-expiring": {
      subject: "Subscription Expiring Soon",
      body: `Dear ${data.name},\n\nYour subscription will expire on ${data.expiryDate}. Please renew your subscription to continue using our services.\n\nBest regards,\nThe Team`
    }
  };

  return templates[templateType] || {
    subject: "Default Email",
    body: "This is a default email template."
  };
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Create a Supabase client with the Auth context of the logged in user
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
      {
        global: { headers: { Authorization: req.headers.get("Authorization")! } },
      }
    );

    // Get the request payload
    const { to, templateType, templateData } = await req.json();

    if (!to || !templateType) {
      return new Response(
        JSON.stringify({ error: "Missing required fields: to and templateType are required" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
      );
    }

    // In a real implementation, you would call your email service provider here
    // For now, let's just log the email details
    console.log("Sending email notification:");
    console.log("To:", to);

    const template = renderEmailTemplate(templateType, templateData);
    console.log("Subject:", template.subject);
    console.log("Body:", template.body);

    // Log this email in a hypothetical notifications table for tracking
    const { data: notification, error: notificationError } = await supabaseClient
      .from("notifications")
      .insert({
        recipient_email: to,
        template_type: templateType,
        subject: template.subject,
        status: "sent",
        metadata: templateData
      })
      .select()
      .single();

    if (notificationError) {
      // Log the error but don't fail the function
      console.error("Error logging notification:", notificationError);
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Notification sent successfully",
        notificationId: notification?.id
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 }
    );
  } catch (error) {
    console.error("Error in send-notification function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
    );
  }
});
