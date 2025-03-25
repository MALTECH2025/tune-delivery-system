
import { supabase } from "@/integrations/supabase/client";

// Admin dashboard data
export const getDashboardStats = async () => {
  try {
    // Get user count
    const { count: userCount, error: userError } = await supabase
      .from('profiles')
      .select('*', { count: 'exact', head: true });
    
    if (userError) throw userError;
    
    // Get total earnings
    const { data: earningsData, error: earningsError } = await supabase.rpc(
      'get_total_platform_earnings'
    );
    
    if (earningsError) throw earningsError;
    
    // Get total distributions
    const { count: distributionsCount, error: distributionsError } = await supabase
      .from('releases')
      .select('*', { count: 'exact', head: true });
    
    if (distributionsError) throw distributionsError;
    
    // Get total withdrawals
    const { data: withdrawalsData, error: withdrawalsError } = await supabase.rpc(
      'get_total_withdrawals'
    );
    
    if (withdrawalsError) throw withdrawalsError;
    
    return {
      userCount: userCount || 0,
      totalEarnings: earningsData || 0,
      distributionsCount: distributionsCount || 0,
      totalWithdrawals: withdrawalsData || 0
    };
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return {
      userCount: 0,
      totalEarnings: 0,
      distributionsCount: 0,
      totalWithdrawals: 0
    };
  }
};

// Get user catalog (releases)
export const getUserCatalog = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('releases')
      .select('*')
      .eq('user_id', userId)
      .order('release_date', { ascending: false });
    
    if (error) throw error;
    
    return data || [];
  } catch (error) {
    console.error('Error fetching user catalog:', error);
    return [];
  }
};

// Get earnings history
export const getEarningsHistory = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('earnings')
      .select('*')
      .eq('user_id', userId)
      .order('earned_date', { ascending: false });
    
    if (error) throw error;
    
    // Group earnings by month
    const groupedEarnings = data?.reduce((acc, earning) => {
      const date = new Date(earning.earned_date);
      const monthYear = `${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`;
      
      if (!acc[monthYear]) {
        acc[monthYear] = {
          period: monthYear,
          earnings: 0,
          status: 'Paid', // Default status
          date: date.toISOString().split('T')[0]
        };
      }
      
      acc[monthYear].earnings += Number(earning.amount);
      
      return acc;
    }, {} as Record<string, { period: string, earnings: number, status: string, date: string }>);
    
    return Object.values(groupedEarnings || {});
  } catch (error) {
    console.error('Error fetching earnings history:', error);
    return [];
  }
};

// Get withdrawal history
export const getWithdrawalHistory = async (userId: string, limit = 10) => {
  try {
    const { data, error } = await supabase
      .from('withdrawals')
      .select('*')
      .eq('user_id', userId)
      .order('requested_at', { ascending: false })
      .limit(limit);
      
    if (error) throw error;
    
    return data || [];
  } catch (error) {
    console.error('Error in getWithdrawalHistory:', error);
    return [];
  }
};

// Get settings
export const getSetting = async (key: string) => {
  try {
    const { data, error } = await supabase
      .from('settings')
      .select('value')
      .eq('key', key)
      .single();
      
    if (error) throw error;
    
    return data?.value;
  } catch (error) {
    console.error(`Error fetching setting ${key}:`, error);
    return null;
  }
};

// Get user stats (total streams, earnings, etc.)
export const getUserStats = async (userId: string) => {
  try {
    // Get total streams
    const { data: releasesData, error: releasesError } = await supabase
      .from('releases')
      .select('streams_count')
      .eq('user_id', userId);
    
    if (releasesError) throw releasesError;
    
    // Calculate total streams
    const totalStreams = releasesData?.reduce((sum, release) => sum + (release.streams_count || 0), 0) || 0;
    
    // Get total earnings
    const { data: earningsData, error: earningsError } = await supabase.rpc(
      'get_user_total_earnings',
      { user_uuid: userId }
    );
    
    if (earningsError) throw earningsError;
    
    // Get next payout date
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('next_payout_date')
      .eq('id', userId)
      .single();
    
    if (profileError) throw profileError;
    
    return {
      totalStreams,
      totalEarnings: earningsData || 0,
      nextPayoutDate: profile?.next_payout_date || null
    };
  } catch (error) {
    console.error('Error fetching user stats:', error);
    return {
      totalStreams: 0,
      totalEarnings: 0,
      nextPayoutDate: null
    };
  }
};
