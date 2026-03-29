"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { BookOpen, Globe, Users, Crown, Bell, BookMarked } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { fetchDashboardStatsAction } from "@/app/actions/dashboard"

interface DashboardStats {
  contentCount: number | null
  ebookCount: number | null
  userCount: number | null
  premiumCount: number | null
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    contentCount: null,
    ebookCount: null,
    userCount: null,
    premiumCount: null,
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchStats() {
      setIsLoading(true)
      const result = await fetchDashboardStatsAction()
      
      if (result.success && result.data) {
        setStats(result.data)
      } else {
        console.error(result.error)
      }
      setIsLoading(false)
    }
    fetchStats()
  }, [])

  const statCards = [
    {
      label: "Mini Readings",
      value: stats.contentCount,
      icon: BookOpen,
      href: "/dashboard/mini-readings",
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
    },
    {
      label: "World Classics",
      value: stats.ebookCount,
      icon: Globe,
      href: "/dashboard/world-classics",
      bgColor: "bg-emerald-50",
      textColor: "text-emerald-600",
    },
    {
      label: "Total Users",
      value: stats.userCount,
      icon: Users,
      href: "/dashboard/users",
      bgColor: "bg-amber-50",
      textColor: "text-amber-600",
    },
    {
      label: "Premium Users",
      value: stats.premiumCount,
      icon: Crown,
      href: "/dashboard/users",
      bgColor: "bg-purple-50",
      textColor: "text-purple-600",
    },
  ]

  const quickActions = [
    {
      label: "Add Mini Reading",
      description: "Create short reading content",
      icon: BookOpen,
      href: "/dashboard/mini-readings",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      label: "Add World Classic",
      description: "Create classic e-book",
      icon: Globe,
      href: "/dashboard/world-classics",
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
    },
    {
      label: "Manage Users",
      description: "View and manage user base",
      icon: Users,
      href: "/dashboard/users",
      color: "text-amber-600",
      bgColor: "bg-amber-50",
    },
    {
      label: "Send Notification",
      description: "Broadcast to all users",
      icon: Bell,
      href: "/dashboard/notifications",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Welcome 👋</h1>
        <p className="text-muted-foreground mt-1">
          Overview of the Lingzy management panel
        </p>
      </div>

      {/* Stats Grid */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4"
      >
        {statCards.map((stat) => (
          <motion.div key={stat.label} variants={item}>
            <Link href={stat.href}>
              <Card className="hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 cursor-pointer border-border/50 group hover:border-primary/20">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground font-medium">
                        {stat.label}
                      </p>
                      <p className="text-3xl font-bold text-foreground mt-1.5">
                        {isLoading ? (
                          <span className="inline-block w-10 h-8 bg-muted animate-pulse rounded" />
                        ) : (
                          stat.value ?? "—"
                        )}
                      </p>
                    </div>
                    <div
                      className={`w-12 h-12 rounded-xl ${stat.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                    >
                      <stat.icon className={`w-6 h-6 ${stat.textColor}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-4">
          Quick Actions
        </h2>
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4"
        >
          {quickActions.map((action) => (
            <motion.div key={action.label} variants={item}>
              <Link href={action.href}>
                <Card className="hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 cursor-pointer border-border/50 group hover:border-primary/20 h-full">
                  <CardContent className="pt-6 flex flex-col items-center text-center gap-3">
                    <div
                      className={`w-14 h-14 rounded-2xl ${action.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                    >
                      <action.icon className={`w-7 h-7 ${action.color}`} />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground text-sm">
                        {action.label}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {action.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Supabase Connected Info */}
      <Card className="border-emerald-200/50 bg-gradient-to-r from-emerald-50/50 to-transparent">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center shrink-0">
              <BookMarked className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">
                ✅ Supabase Connected
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                Dashboard is successfully connected to the Supabase database. Real data is being managed for mini readings and world classics.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
