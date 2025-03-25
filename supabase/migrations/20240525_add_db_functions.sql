
-- Function to get total platform earnings
CREATE OR REPLACE FUNCTION public.get_total_platform_earnings()
RETURNS numeric
LANGUAGE sql
STABLE
AS $$
  SELECT COALESCE(SUM(amount), 0)
  FROM public.earnings;
$$;

-- Function to get total withdrawals
CREATE OR REPLACE FUNCTION public.get_total_withdrawals()
RETURNS numeric
LANGUAGE sql
STABLE
AS $$
  SELECT COALESCE(SUM(amount), 0)
  FROM public.withdrawals
  WHERE status = 'completed';
$$;

-- Add more utility functions if needed
