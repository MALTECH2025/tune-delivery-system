
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
    const { releaseId, action, reason } = await req.json();

    if (!releaseId) {
      return new Response(
        JSON.stringify({ error: "Missing required field: releaseId" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
      );
    }

    // Get release details
    const { data: release, error: releaseError } = await supabaseClient
      .from("releases")
      .select("*, profiles:user_id(name, email)")
      .eq("id", releaseId)
      .single();

    if (releaseError) {
      console.error("Error fetching release:", releaseError);
      return new Response(
        JSON.stringify({ error: "Failed to fetch release details" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
      );
    }

    let newStatus;
    let emailTemplate;
    let responseMessage;

    // Process action
    if (action === "approve") {
      newStatus = "approved";
      emailTemplate = "distribution-approved";
      responseMessage = "Distribution approved successfully";
    } else if (action === "reject") {
      if (!reason) {
        return new Response(
          JSON.stringify({ error: "Reason is required for rejection" }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
        );
      }
      newStatus = "rejected";
      emailTemplate = "distribution-rejected";
      responseMessage = "Distribution rejected successfully";
    } else {
      return new Response(
        JSON.stringify({ error: "Invalid action specified" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
      );
    }

    // Update release status
    const { error: updateError } = await supabaseClient
      .from("releases")
      .update({ status: newStatus, updated_at: new Date().toISOString() })
      .eq("id", releaseId);

    if (updateError) {
      console.error("Error updating release:", updateError);
      return new Response(
        JSON.stringify({ error: "Failed to update release status" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
      );
    }

    // Send email notification (we'll use a hypothetical email service)
    try {
      // Call notification edge function instead of direct implementation
      const notificationResponse = await fetch(
        `${Deno.env.get("SUPABASE_URL")}/functions/v1/send-notification`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": req.headers.get("Authorization")!,
          },
          body: JSON.stringify({
            to: release.profiles.email,
            templateType: emailTemplate,
            templateData: {
              name: release.profiles.name,
              releaseName: release.track_title,
              reason: reason || "",
            },
          }),
        }
      );
      
      if (!notificationResponse.ok) {
        console.error("Error sending notification:", await notificationResponse.text());
      }
    } catch (emailError) {
      console.error("Error sending email notification:", emailError);
      // We continue processing even if email fails
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: responseMessage,
        release: { id: releaseId, status: newStatus }
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 }
    );
  } catch (error) {
    console.error("Error in process-distribution function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
    );
  }
});
