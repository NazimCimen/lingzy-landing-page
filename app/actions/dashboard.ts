"use server"

import { supabaseAdmin } from "@/lib/supabase-server"

export async function fetchDashboardStatsAction() {
  try {
    const [contentRes, ebookRes, userRes, premiumRes] = await Promise.all([
      supabaseAdmin.from("content").select("*", { count: "exact", head: true }),
      supabaseAdmin.from("ebook").select("*", { count: "exact", head: true }),
      supabaseAdmin.from("user").select("*", { count: "exact", head: true }),
      supabaseAdmin.from("user").select("*", { count: "exact", head: true }).eq("is_premium", true),
    ])

    return {
      success: true,
      data: {
        contentCount: contentRes.count ?? 0,
        ebookCount: ebookRes.count ?? 0,
        userCount: userRes.count ?? 0,
        premiumCount: premiumRes.count ?? 0,
      }
    }
  } catch (err: any) {
    return { success: false, error: err.message }
  }
}
