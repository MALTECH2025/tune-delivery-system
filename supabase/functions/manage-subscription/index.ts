
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
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
    const { action, userId, plan, amount, duration } = await req.json();

    if (!action || !userId) {
      return new Response(
        JSON.stringify({ error: "Missing required fields: action and userId" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
      );
    }

    // Get user profile
    const { data: profile, error: profileError } = await supabaseClient
      .from("profiles")
      .select("name, email")
      .eq("id", userId)
      .single();

    if (profileError) {
      console.error("Error fetching profile:", profileError);
      return new Response(
        JSON.stringify({ error: "Failed to fetch user profile" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
      );
    }

    let result;
    let notificationData = {};

    switch (action) {
      case "create":
        if (!plan || !amount || !duration) {
          return new Response(
            JSON.stringify({ error: "Plan, amount, and duration are required for creating a subscription" }),
            { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
          );
        }

        // Calculate end date (duration in months)
        const endDate = new Date();
        endDate.setMonth(endDate.getMonth() + duration);

        // Create subscription
        const { data: subscription, error: subscriptionError } = await supabaseClient
          .from("subscriptions")
          .insert({
            user_id: userId,
            plan: plan,
            amount: amount,
            status: "active",
            start_date: new Date().toISOString(),
            end_date: endDate.toISOString()
          })
          .select()
          .single();

        if (subscriptionError) {
          console.error("Error creating subscription:", subscriptionError);
          return new Response(
            JSON.stringify({ error: "Failed to create subscription" }),
            { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
          );
        }

        // Format date for display
        const nextBillingDate = endDate.toLocaleDateString("en-US", { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        });

        notificationData = {
          name: profile.name,
          plan: plan,
          amount: `$${amount.toFixed(2)}`,
          nextBillingDate: nextBillingDate
        };

        // Send confirmation email
        try {
          await fetch(
            `${Deno.env.get("SUPABASE_URL")}/functions/v1/send-notification`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "Authorization": req.headers.get("Authorization")!,
              },
              body: JSON.stringify({
                to: profile.email,
                templateType: "subscription-confirmation",
                templateData: notificationData
              }),
            }
          );
        } catch (emailError) {
          console.error("Error sending subscription confirmation:", emailError);
          // We continue processing even if email fails
        }

        result = { 
          success: true, 
          message: "Subscription created successfully", 
          subscription 
        };
        break;

      case "cancel":
        // Update subscription to canceled
        const { data: canceledSub, error: cancelError } = await supabaseClient
          .from("subscriptions")
          .update({ 
            status: "canceled",
            updated_at: new Date().toISOString()
          })
          .eq("user_id", userId)
          .eq("status", "active")
          .select()
          .single();

        if (cancelError) {
          console.error("Error canceling subscription:", cancelError);
          return new Response(
            JSON.stringify({ error: "Failed to cancel subscription" }),
            { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
          );
        }

        result = { 
          success: true, 
          message: "Subscription canceled successfully", 
          subscription: canceledSub 
        };
        break;

      case "renew":
        if (!plan || !amount || !duration) {
          return new Response(
            JSON.stringify({ error: "Plan, amount, and duration are required for renewing a subscription" }),
            { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
          );
        }

        // Get current subscription
        const { data: currentSub, error: currentSubError } = await supabaseClient
          .from("subscriptions")
          .select("*")
          .eq("user_id", userId)
          .order("end_date", { ascending: false })
          .limit(1)
          .single();

        if (currentSubError) {
          console.error("Error fetching current subscription:", currentSubError);
          return new Response(
            JSON.stringify({ error: "Failed to fetch current subscription" }),
            { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
          );
        }

        // Calculate new end date based on current end date
        const renewEndDate = new Date(currentSub.end_date);
        renewEndDate.setMonth(renewEndDate.getMonth() + duration);

        // Update or create new subscription
        const { data: renewedSub, error: renewError } = await supabaseClient
          .from("subscriptions")
          .upsert({
            id: currentSub.id,
            user_id: userId,
            plan: plan,
            amount: amount,
            status: "active",
            end_date: renewEndDate.toISOString(),
            updated_at: new Date().toISOString()
          })
          .select()
          .single();

        if (renewError) {
          console.error("Error renewing subscription:", renewError);
          return new Response(
            JSON.stringify({ error: "Failed to renew subscription" }),
            { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
          );
        }

        result = { 
          success: true, 
          message: "Subscription renewed successfully", 
          subscription: renewedSub 
        };
        break;

      default:
        return new Response(
          JSON.stringify({ error: "Invalid action specified" }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
        );
    }

    return new Response(
      JSON.stringify(result),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 }
    );
  } catch (error) {
    console.error("Error in manage-subscription function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
    );
  }
});
