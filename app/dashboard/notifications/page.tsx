"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Bell, Sparkles } from "lucide-react"

export default function NotificationsPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Notifications</h1>
        <p className="text-muted-foreground mt-1">
          Manage system alerts and user communications
        </p>
      </div>

      <Card className="border-border/50 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent pointer-events-none" />
        <CardContent className="flex flex-col items-center justify-center py-20 text-center relative z-10">
          <div className="relative mb-6">
            <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center">
              <Bell className="w-10 h-10 text-primary" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center animate-bounce">
              <Sparkles className="w-4 h-4 text-amber-600" />
            </div>
          </div>
          
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Coming Soon!
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            We are working hard to bring you a powerful notification center. 
            Soon, you{"'"}ll be able to send custom push notifications and updates directly to your users.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
