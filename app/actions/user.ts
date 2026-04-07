"use server"

import { supabaseAdmin } from "@/lib/supabase-server"
import { revalidatePath } from "next/cache"
import type { User } from "@/lib/types"

export async function updateUserPremiumStatusAction(id: string, isPremium: boolean) {
  try {
    const { data: result, error } = await supabaseAdmin
      .from("user")
      .update({ is_premium: isPremium })
      .eq("id", id)
      .select()
      .single()

    if (error) return { success: false, error: error.message }
    
    revalidatePath("/dashboard/users")
    revalidatePath("/dashboard")
    
    return { success: true, data: result }
  } catch (err: any) {
    return { success: false, error: err.message }
  }
}

export async function fetchUsersAction() {
  try {
    const { data, error } = await supabaseAdmin
      .from("user")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) return { success: false, error: error.message }
    return { success: true, data }
  } catch (err: any) {
    return { success: false, error: err.message }
  }
}
