// Dashboard data types matching Supabase schema

// ===== Content (Mini Okuma Parçaları) =====

export type ContentCategory =
  | 'food'
  | 'health'
  | 'travel'
  | 'science'
  | 'business'
  | 'spor'
  | 'technology'

export type Level = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2'

export interface Content {
  id: string
  title: string
  category: ContentCategory
  levels: Level[]
  active_levels: Level[] | null
  cover_image_url: string | null
  created_at: string
  updated_at: string
}

export interface ContentPage {
  id: string
  content_id: string
  level: Level
  order_no: number
  content: string
  image_url: string | null
  created_at: string
}

// ===== Ebook (Dünya Klasikleri) =====

export type EbookCategory =
  | 'adventure'
  | 'fantasy'
  | 'science_fiction'
  | 'drama'
  | 'romance'
  | 'horror'
  | 'detective'

export interface Ebook {
  id: string
  title: string
  author: string
  description: string | null
  category: EbookCategory
  cover_image_url: string
  published_at: string
  source_provider: string
  source_url: string
  license: string
  page_count: number | null
  is_classic: boolean | null
  created_at: string
  updated_at: string
}

export interface EbookPage {
  id: string
  ebook_id: string
  order_no: number
  title: string | null
  content: string
  created_at: string
}

// ===== User =====

export interface User {
  id: string
  full_name: string | null
  email_address: string | null
  created_at: string
  is_premium: boolean
}

// ===== Push Notification (placeholder - API coming later) =====

export interface PushNotification {
  id: string
  title: string
  body: string
  target: 'all' | 'premium' | 'free'
  sent_at: string
  status: 'sent' | 'failed' | 'pending'
}

// ===== UI Helper Maps =====

export const contentCategoryLabels: Record<ContentCategory, string> = {
  food: 'Food',
  health: 'Health',
  travel: 'Travel',
  science: 'Science',
  business: 'Business',
  spor: 'Sports',
  technology: 'Technology',
}

export const ebookCategoryLabels: Record<EbookCategory, string> = {
  adventure: 'Adventure',
  fantasy: 'Fantasy',
  science_fiction: 'Sci-Fi',
  drama: 'Drama',
  romance: 'Romance',
  horror: 'Horror',
  detective: 'Detective',
}

export const levelColors: Record<Level, string> = {
  A1: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  A2: 'bg-teal-50 text-teal-700 border-teal-200',
  B1: 'bg-amber-50 text-amber-700 border-amber-200',
  B2: 'bg-orange-50 text-orange-700 border-orange-200',
  C1: 'bg-red-50 text-red-700 border-red-200',
  C2: 'bg-purple-50 text-purple-700 border-purple-200',
}
