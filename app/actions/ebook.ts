"use server"

import { supabaseAdmin } from "@/lib/supabase-server"
import { revalidatePath } from "next/cache"
import type { Ebook, EbookPage } from "@/lib/types"

export async function createEbookAction(data: Omit<Ebook, "id" | "created_at" | "updated_at">) {
  try {
    const { data: result, error } = await supabaseAdmin
      .from("ebook")
      .insert([data])
      .select()
      .single()

    if (error) return { success: false, error: error.message }
    revalidatePath("/dashboard/world-classics")
    return { success: true, data: result }
  } catch (err: any) {
    return { success: false, error: err.message }
  }
}

export async function updateEbookAction(id: string, data: Partial<Ebook>) {
  try {
    const { data: result, error } = await supabaseAdmin
      .from("ebook")
      .update(data)
      .eq("id", id)
      .select()
      .single()

    if (error) return { success: false, error: error.message }
    revalidatePath("/dashboard/world-classics")
    return { success: true, data: result }
  } catch (err: any) {
    return { success: false, error: err.message }
  }
}

export async function deleteEbookAction(id: string) {
  try {
    const { error } = await supabaseAdmin.from("ebook").delete().eq("id", id)
    if (error) return { success: false, error: error.message }
    revalidatePath("/dashboard/world-classics")
    return { success: true }
  } catch (err: any) {
    return { success: false, error: err.message }
  }
}

export async function createEbookPageAction(data: Omit<EbookPage, "id" | "created_at" | "updated_at">) {
  try {
    const { data: result, error } = await supabaseAdmin
      .from("ebook_page")
      .insert([data])
      .select()
      .single()

    if (error) return { success: false, error: error.message }
    revalidatePath("/dashboard/world-classics")
    return { success: true, data: result }
  } catch (err: any) {
    return { success: false, error: err.message }
  }
}

export async function updateEbookPageAction(id: string, data: Partial<EbookPage>) {
  try {
    const { data: result, error } = await supabaseAdmin
      .from("ebook_page")
      .update(data)
      .eq("id", id)
      .select()
      .single()

    if (error) return { success: false, error: error.message }
    revalidatePath("/dashboard/world-classics")
    return { success: true, data: result }
  } catch (err: any) {
    return { success: false, error: err.message }
  }
}

export async function deleteEbookPageAction(id: string) {
  try {
    const { error } = await supabaseAdmin
      .from("ebook_page")
      .delete()
      .eq("id", id)

    if (error) return { success: false, error: error.message }
    revalidatePath("/dashboard/world-classics")
    return { success: true }
  } catch (err: any) {
    return { success: false, error: err.message }
  }
}
