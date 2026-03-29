import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error("Eksik Supabase env değişkenleri (URL veya SERVICE_ROLE_KEY).")
}

// DİKKAT: Bu Admin Client sadece Server Action veya API Rotaları içinde kullanılmalıdır. 
// Asla Frontend (İstemci) dosyalarına (use client) import etmeyin! RLS kurallarını by-pass eder.
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
    detectSessionInUrl: false,
  },
})
