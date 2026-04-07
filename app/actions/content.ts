"use server"

import { supabaseAdmin } from "@/lib/supabase-server"
import { revalidatePath } from "next/cache"
import type { Content, ContentPage } from "@/lib/types"

export async function createContentAction(data: Omit<Content, "id" | "created_at" | "updated_at">) {
  try {
    const { data: result, error } = await supabaseAdmin
      .from("content")
      .insert([data])
      .select()
      .single()

    if (error) return { success: false, error: error.message }
    revalidatePath("/dashboard/mini-readings")
    return { success: true, data: result }
  } catch (err: any) {
    return { success: false, error: err.message }
  }
}

export async function updateContentAction(id: string, data: Partial<Content>) {
  try {
    const { data: result, error } = await supabaseAdmin
      .from("content")
      .update(data)
      .eq("id", id)
      .select()
      .single()

    if (error) return { success: false, error: error.message }
    revalidatePath("/dashboard/mini-readings")
    return { success: true, data: result }
  } catch (err: any) {
    return { success: false, error: err.message }
  }
}

export async function deleteContentAction(id: string) {
  try {
    const { error } = await supabaseAdmin.from("content").delete().eq("id", id)
    if (error) return { success: false, error: error.message }
    revalidatePath("/dashboard/mini-readings")
    return { success: true }
  } catch (err: any) {
    return { success: false, error: err.message }
  }
}

export async function createContentPageAction(data: Omit<ContentPage, "id" | "created_at" | "updated_at">) {
  try {
    const { data: result, error } = await supabaseAdmin
      .from("content_page")
      .insert([data])
      .select()
      .single()

    if (error) return { success: false, error: error.message }
    revalidatePath("/dashboard/mini-readings")
    return { success: true, data: result }
  } catch (err: any) {
    return { success: false, error: err.message }
  }
}

export async function updateContentPageAction(id: string, data: Partial<ContentPage>) {
  try {
    const { data: result, error } = await supabaseAdmin
      .from("content_page")
      .update(data)
      .eq("id", id)
      .select()
      .single()

    if (error) return { success: false, error: error.message }
    revalidatePath("/dashboard/mini-readings")
    return { success: true, data: result }
  } catch (err: any) {
    return { success: false, error: err.message }
  }
}

export async function deleteContentPageAction(id: string) {
  try {
    const { error } = await supabaseAdmin
      .from("content_page")
      .delete()
      .eq("id", id)

    if (error) return { success: false, error: error.message }
    revalidatePath("/dashboard/mini-readings")
    return { success: true }
  } catch (err: any) {
    return { success: false, error: err.message }
  }
}
