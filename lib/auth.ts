"use server"

import { SignJWT, jwtVerify } from "jose"
import { cookies } from "next/headers"
import { AUTH, MESSAGES, APP_ROUTES } from "./constants"

const secretKey = process.env.JWT_SECRET || `secure_fallback_${Math.random()}`
const key = new TextEncoder().encode(secretKey)

// GitHub Public Repo güvenliği: Asla gerçek şifrenizi yedeğe (fallback) yazmayın!
// Eğer ortam değişkenleri girilmezse ulaşılamaz, rastgele bir karakter zinciri (kilit) ata.
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || `admin_${Math.random()}`
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || `lock_${Math.random()}`

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(key)
}

export async function decrypt(input: string): Promise<any> {
  try {
    const { payload } = await jwtVerify(input, key, {
      algorithms: ["HS256"],
    })
    return payload
  } catch (error) {
    return null
  }
}

export async function login(formData: FormData) {
  const username = formData.get("username") as string
  const password = formData.get("password") as string

  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    const expires = new Date(Date.now() + AUTH.SESSION_DURATION)
    const session = await encrypt({ user: "admin", expires })

    // Save the session in an HttpOnly cookie
    const cookieStore = await cookies()
    cookieStore.set(AUTH.COOKIE_NAME, session, {
      expires,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    })

    return { success: true }
  } else {
    return { success: false, error: MESSAGES.ERRORS.INVALID_CREDENTIALS }
  }
}

export async function logout() {
  const cookieStore = await cookies()
  cookieStore.set(AUTH.COOKIE_NAME, "", { expires: new Date(0) })
}

export async function getSession() {
  const cookieStore = await cookies()
  const session = cookieStore.get(AUTH.COOKIE_NAME)?.value
  if (!session) return null
  return await decrypt(session)
}
