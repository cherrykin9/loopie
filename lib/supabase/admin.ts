import { createClient as createSupabaseClient } from "@supabase/supabase-js";

// Service-role client for server-only contexts (the cron digest route).
// Bypasses RLS — never import this into client or shared code paths.
export function createAdminClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );
}
