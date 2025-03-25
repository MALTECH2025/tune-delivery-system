
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

/**
 * Interface for withdrawal requests
 */
export interface WithdrawalRequest {
  id?: string;
  userId: string;
  amount: number;
  walletAddress: string;
}

/**
 * Submit a withdrawal request to Supabase
 */
export const submitWithdrawalRequest = async (request: WithdrawalRequest): Promise<boolean> => {
  try {
    // Insert withdrawal request to database
    const { data, error } = await supabase
      .from('withdrawals')
      .insert({
        user_id: request.userId,
        amount: request.amount,
        wallet: request.walletAddress,
        status: 'pending'
      })
      .select()
      .single();
    
    if (error) {
      console.error('Withdrawal request failed:', error);
      return false;
    }
    
    // Create a notification for the user
    await supabase
      .from('notifications')
      .insert({
        user_id: request.userId,
        message: `Your withdrawal request for $${request.amount.toFixed(2)} has been submitted`,
        type: 'withdrawal'
      });
    
    // Also create a notification for admin users
    const { data: profileData } = await supabase
      .from('profiles')
      .select('name')
      .eq('id', request.userId)
      .single();
      
    if (profileData) {
      // Get all admin user IDs
      const { data: adminData } = await supabase
        .from('profiles')
        .select('id')
        .eq('admin', true);
      
      // Create notifications for each admin
      if (adminData && adminData.length > 0) {
        const adminNotifications = adminData.map(admin => ({
          user_id: admin.id,
          message: `New withdrawal request: $${request.amount.toFixed(2)} from ${profileData.name}`,
          type: 'admin'
        }));
        
        await supabase
          .from('notifications')
          .insert(adminNotifications);
      }
    }
    
    return true;
  } catch (error) {
    console.error('Error submitting withdrawal request:', error);
    return false;
  }
};

/**
 * Get a user's available balance
 */
export const getUserBalance = async (userId: string): Promise<number> => {
  try {
    const { data, error } = await supabase.rpc(
      'get_user_available_balance',
      { user_uuid: userId }
    );
    
    if (error) {
      console.error('Error fetching balance:', error);
      return 0;
    }
    
    return parseFloat(data.toString()) || 0;
  } catch (error) {
    console.error('Error in getUserBalance:', error);
    return 0;
  }
};

/**
 * Get the minimum withdrawal amount from settings
 */
export const getMinWithdrawalAmount = async (): Promise<number> => {
  try {
    const { data, error } = await supabase
      .from('settings')
      .select('value')
      .eq('key', 'min_withdrawal')
      .single();
      
    if (error) {
      console.error('Error fetching minimum withdrawal amount:', error);
      return 25; // Default minimum withdrawal amount
    }
    
    return data && data.value ? parseFloat(data.value.toString()) : 25;
  } catch (error) {
    console.error('Error in getMinWithdrawalAmount:', error);
    return 25; // Default minimum withdrawal amount
  }
};

/**
 * Get a user's withdrawal history
 */
export const getWithdrawalHistory = async (userId: string, limit = 10): Promise<any[]> => {
  try {
    const { data, error } = await supabase
      .from('withdrawals')
      .select('*')
      .eq('user_id', userId)
      .order('requested_at', { ascending: false })
      .limit(limit);
      
    if (error) {
      console.error('Error fetching withdrawal history:', error);
      return [];
    }
    
    return data || [];
  } catch (error) {
    console.error('Error in getWithdrawalHistory:', error);
    return [];
  }
};
