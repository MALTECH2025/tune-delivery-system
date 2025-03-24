
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";
import { sendEmail } from "https://esm.sh/v135/@supabase/functions-js/utils/send-email.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: corsHeaders,
    });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get the request body
    const { amount, userId, walletAddress } = await req.json();

    if (!amount || !userId || !walletAddress) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Missing required fields: amount, userId, or walletAddress",
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 400,
        }
      );
    }

    // Validate the amount
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Invalid amount. Must be a positive number.",
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 400,
        }
      );
    }

    // Verify the user exists and has sufficient balance
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("email, name")
      .eq("id", userId)
      .single();

    if (profileError || !profile) {
      console.error("Error fetching profile:", profileError);
      return new Response(
        JSON.stringify({
          success: false,
          error: "User not found",
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 404,
        }
      );
    }

    // Get the user's available balance
    const { data: balanceData, error: balanceError } = await supabase.rpc(
      "get_user_available_balance",
      { user_uuid: userId }
    );

    if (balanceError) {
      console.error("Error getting balance:", balanceError);
      return new Response(
        JSON.stringify({
          success: false,
          error: "Failed to retrieve user balance",
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 500,
        }
      );
    }

    const availableBalance = parseFloat(balanceData);
    
    if (numAmount > availableBalance) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Insufficient balance for withdrawal",
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 400,
        }
      );
    }

    // Create the withdrawal record
    const { data: withdrawal, error: withdrawalError } = await supabase
      .from("withdrawals")
      .insert({
        user_id: userId,
        amount: numAmount,
        status: "pending",
        wallet: walletAddress,
        requested_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (withdrawalError) {
      console.error("Error creating withdrawal:", withdrawalError);
      return new Response(
        JSON.stringify({
          success: false,
          error: "Failed to create withdrawal request",
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 500,
        }
      );
    }

    // Send email notification to admin
    try {
      await sendEmail({
        to: 'admin@malpinohdistro.com',
        subject: 'New Withdrawal Request',
        body: `User ${profile.name} (${profile.email}) has requested a withdrawal of $${numAmount} to wallet ${walletAddress}`,
      });
    } catch (emailError) {
      console.error("Error sending email notification:", emailError);
      // Continue processing even if email fails
    }

    // Send confirmation to the client
    return new Response(
      JSON.stringify({
        success: true,
        message: "Withdrawal request submitted successfully",
        data: withdrawal,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error processing withdrawal:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: "Internal server error",
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
