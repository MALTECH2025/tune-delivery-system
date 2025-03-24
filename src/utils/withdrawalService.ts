
import { supabase } from "@/integrations/supabase/client";
import { sendEmail } from "./emailService";

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
    // Call the withdrawal edge function
    const { data, error } = await supabase.functions.invoke('process-withdrawal', {
      body: {
        amount: request.amount,
        userId: request.userId,
        walletAddress: request.walletAddress
      }
    });
    
    if (error) {
      console.error('Withdrawal request failed:', error);
      return false;
    }
    
    // Send a confirmation email to the user
    const { data: profile } = await supabase
      .from('profiles')
      .select('email, name')
      .eq('id', request.userId)
      .single();
      
    if (profile) {
      await sendEmail({
        to: profile.email,
        templateType: 'withdrawal',
        templateData: {
          name: profile.name,
          amount: request.amount.toFixed(2),
          date: new Date().toLocaleDateString(),
          wallet: request.walletAddress
        }
      });
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
