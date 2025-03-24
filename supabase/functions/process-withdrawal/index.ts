
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
    const { userId, amount, walletAddress } = await req.json();

    if (!userId || !amount || !walletAddress) {
      return new Response(
        JSON.stringify({ error: "Missing required fields: userId, amount, and walletAddress are required" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
      );
    }

    // Check if user exists
    const { data: user, error: userError } = await supabaseClient
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    if (userError) {
      console.error("Error fetching user:", userError);
      return new Response(
        JSON.stringify({ error: "User not found" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 404 }
      );
    }

    // Check user's available balance
    const { data: balance, error: balanceError } = await supabaseClient.rpc(
      "get_user_available_balance",
      { user_uuid: userId }
    );

    if (balanceError) {
      console.error("Error fetching balance:", balanceError);
      return new Response(
        JSON.stringify({ error: "Failed to fetch user balance" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
      );
    }

    const availableBalance = parseFloat(balance || 0);
    const withdrawalAmount = parseFloat(amount);

    // Validate withdrawal amount
    if (withdrawalAmount <= 0) {
      return new Response(
        JSON.stringify({ error: "Withdrawal amount must be greater than zero" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
      );
    }

    if (withdrawalAmount > availableBalance) {
      return new Response(
        JSON.stringify({ error: "Insufficient balance for withdrawal" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
      );
    }

    // Create withdrawal record
    const { data: withdrawal, error: withdrawalError } = await supabaseClient
      .from("withdrawals")
      .insert({
        user_id: userId,
        amount: withdrawalAmount,
        wallet: walletAddress,
        status: "pending"
      })
      .select()
      .single();

    if (withdrawalError) {
      console.error("Error creating withdrawal:", withdrawalError);
      return new Response(
        JSON.stringify({ error: "Failed to create withdrawal request" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
      );
    }

    // Send withdrawal notification
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
            to: user.email,
            templateType: "withdrawal",
            templateData: {
              name: user.name,
              amount: withdrawalAmount.toFixed(2),
              date: new Date().toLocaleDateString(),
              wallet: walletAddress
            }
          }),
        }
      );
    } catch (emailError) {
      console.error("Error sending withdrawal notification:", emailError);
      // Continue processing even if email fails
    }

    // Notify admin about withdrawal request
    try {
      // Getting admin users to notify them
      const { data: admins } = await supabaseClient
        .from("profiles")
        .select("email")
        .eq("admin", true);

      if (admins && admins.length > 0) {
        // In a real implementation, you would send emails to all admins
        console.log("Would notify admins:", admins.map(a => a.email).join(", "));
      }
    } catch (adminError) {
      console.error("Error notifying admins:", adminError);
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Withdrawal request submitted successfully",
        withdrawal,
        newBalance: availableBalance - withdrawalAmount
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 }
    );
  } catch (error) {
    console.error("Error in process-withdrawal function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
    );
  }
});
