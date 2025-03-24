
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
    const { userId, amount, description, releaseId } = await req.json();

    if (!userId || !amount) {
      return new Response(
        JSON.stringify({ error: "Missing required fields: userId and amount are required" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
      );
    }

    // Record the payment in the earnings table
    const { data: earning, error: earningError } = await supabaseClient
      .from("earnings")
      .insert({
        user_id: userId,
        amount: amount,
        description: description || "Platform payment",
        release_id: releaseId,
        earned_date: new Date().toISOString()
      })
      .select()
      .single();

    if (earningError) {
      console.error("Error recording payment:", earningError);
      return new Response(
        JSON.stringify({ error: "Failed to record payment" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
      );
    }

    // Get user's new balance
    const { data: balance, error: balanceError } = await supabaseClient.rpc(
      "get_user_available_balance",
      { user_uuid: userId }
    );

    if (balanceError) {
      console.error("Error fetching balance:", balanceError);
    }

    // Get user profile
    const { data: profile, error: profileError } = await supabaseClient
      .from("profiles")
      .select("name, email")
      .eq("id", userId)
      .single();

    if (profileError) {
      console.error("Error fetching profile:", profileError);
    } else {
      // Send payment notification
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
              templateType: "payment-received",
              templateData: {
                name: profile.name,
                amount: `$${amount.toFixed(2)}`,
                currentBalance: `$${parseFloat(balance || 0).toFixed(2)}`
              }
            }),
          }
        );
      } catch (emailError) {
        console.error("Error sending payment notification:", emailError);
        // We continue processing even if email fails
      }
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Payment processed successfully",
        earning,
        currentBalance: balance
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 }
    );
  } catch (error) {
    console.error("Error in process-payment function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
    );
  }
});
