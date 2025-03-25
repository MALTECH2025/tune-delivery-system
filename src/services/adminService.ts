
import { supabase } from "@/integrations/supabase/client";

// Get all users with their details
export const getAllUsers = async () => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    
    return data || [];
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
};

// Update user profile
export const updateUserProfile = async (userId: string, updates: Record<string, any>) => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', userId)
      .select()
      .single();
    
    if (error) throw error;
    
    return { success: true, data };
  } catch (error) {
    console.error('Error updating user profile:', error);
    return { success: false, error };
  }
};

// Get all withdrawal requests
export const getAllWithdrawals = async () => {
  try {
    const { data, error } = await supabase
      .from('withdrawals')
      .select(`
        *,
        profiles:user_id (name, email)
      `)
      .order('requested_at', { ascending: false });
    
    if (error) throw error;
    
    return data || [];
  } catch (error) {
    console.error('Error fetching all withdrawals:', error);
    return [];
  }
};

// Update withdrawal status
export const updateWithdrawalStatus = async (withdrawalId: string, status: string, notes?: string) => {
  try {
    const updates: Record<string, any> = {
      status,
      updated_at: new Date().toISOString()
    };
    
    if (status === 'completed' || status === 'rejected') {
      updates.processed_at = new Date().toISOString();
    }
    
    if (notes) {
      updates.notes = notes;
    }
    
    const { data, error } = await supabase
      .from('withdrawals')
      .update(updates)
      .eq('id', withdrawalId)
      .select()
      .single();
    
    if (error) throw error;
    
    return { success: true, data };
  } catch (error) {
    console.error('Error updating withdrawal status:', error);
    return { success: false, error };
  }
};

// Get all distributions (releases)
export const getAllDistributions = async () => {
  try {
    const { data, error } = await supabase
      .from('releases')
      .select(`
        *,
        profiles:user_id (name, email)
      `)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    
    return data || [];
  } catch (error) {
    console.error('Error fetching all distributions:', error);
    return [];
  }
};

// Update distribution status
export const updateDistributionStatus = async (releaseId: string, status: string) => {
  try {
    const { data, error } = await supabase
      .from('releases')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', releaseId)
      .select()
      .single();
    
    if (error) throw error;
    
    return { success: true, data };
  } catch (error) {
    console.error('Error updating distribution status:', error);
    return { success: false, error };
  }
};

// Get all subscriptions
export const getAllSubscriptions = async () => {
  try {
    const { data, error } = await supabase
      .from('subscriptions')
      .select(`
        *,
        profiles:user_id (name, email)
      `)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    
    return data || [];
  } catch (error) {
    console.error('Error fetching all subscriptions:', error);
    return [];
  }
};

// Update subscription
export const updateSubscription = async (subscriptionId: string, updates: Record<string, any>) => {
  try {
    const { data, error } = await supabase
      .from('subscriptions')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', subscriptionId)
      .select()
      .single();
    
    if (error) throw error;
    
    return { success: true, data };
  } catch (error) {
    console.error('Error updating subscription:', error);
    return { success: false, error };
  }
};

// Add earnings for a user
export const addUserEarnings = async (userId: string, amount: number, description?: string, releaseId?: string) => {
  try {
    const { data, error } = await supabase
      .from('earnings')
      .insert({
        user_id: userId,
        amount,
        description,
        release_id: releaseId,
        earned_date: new Date().toISOString()
      })
      .select()
      .single();
    
    if (error) throw error;
    
    try {
      // Create notification
      await supabase
        .from('notifications')
        .insert({
          user_id: userId,
          message: `New earnings of $${amount.toFixed(2)} added to your account`,
          type: 'earnings'
        });
    } catch (notifError) {
      console.error('Failed to create notification:', notifError);
      // Continue even if notification fails
    }
    
    return { success: true, data };
  } catch (error) {
    console.error('Error adding earnings:', error);
    return { success: false, error };
  }
};
