"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Crown,
  Gift,
  Search,
  Mail,
  User,
  Sparkles,
  Loader2,
  Users,
  AlertCircle,
  ShieldCheck,
  ShieldX,
  Calendar,
} from "lucide-react"
import type { User as AppUser } from "@/lib/types"
import {
  updateUserPremiumStatusAction,
  fetchUsersAction,
} from "@/app/actions/user"

export default function UsersPage() {
  const [users, setUsers] = useState<AppUser[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [filterMode, setFilterMode] = useState<"all" | "premium" | "free">(
    "all"
  )
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  // Grant premium state
  const [grantDialogOpen, setGrantDialogOpen] = useState(false)
  const [grantingUser, setGrantingUser] = useState<AppUser | null>(null)
  const [grantSuccess, setGrantSuccess] = useState(false)

  // Revoke premium state
  const [revokeDialogOpen, setRevokeDialogOpen] = useState(false)
  const [revokingUser, setRevokingUser] = useState<AppUser | null>(null)

  const fetchUsers = useCallback(async () => {
    setIsLoading(true)
    const result = await fetchUsersAction()

    if (result.success && result.data) {
      setUsers(result.data)
    } else {
      console.error(result.error)
    }
    setIsLoading(false)
  }, [])

  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])

  const totalUsers = users.length
  const premiumUsers = users.filter((u) => u.is_premium).length
  const freeUsers = totalUsers - premiumUsers

  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      (u.email_address || "")
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      (u.full_name || "").toLowerCase().includes(searchQuery.toLowerCase())

    if (filterMode === "premium") return matchesSearch && u.is_premium
    if (filterMode === "free") return matchesSearch && !u.is_premium
    return matchesSearch
  })

  // Grant premium
  const openGrantDialog = (user: AppUser) => {
    setGrantingUser(user)
    setGrantSuccess(false)
    setGrantDialogOpen(true)
  }

  const handleGrant = async () => {
    if (!grantingUser) return
    setIsSaving(true)

    const result = await updateUserPremiumStatusAction(grantingUser.id, true)

    if (result.success) {
      await fetchUsers()
      setGrantSuccess(true)
      setTimeout(() => {
        setGrantDialogOpen(false)
        setGrantingUser(null)
        setGrantSuccess(false)
      }, 1500)
    }
    setIsSaving(false)
  }

  // Revoke premium
  const openRevokeDialog = (user: AppUser) => {
    setRevokingUser(user)
    setRevokeDialogOpen(true)
  }

  const handleRevoke = async () => {
    if (!revokingUser) return
    setIsSaving(true)

    const result = await updateUserPremiumStatusAction(revokingUser.id, false)

    if (result.success) {
      await fetchUsers()
      setRevokeDialogOpen(false)
      setRevokingUser(null)
    }
    setIsSaving(false)
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Users</h1>
        <p className="text-muted-foreground mt-1">
          View all registered users and manage premium subscriptions
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card
          className={`border-border/50 cursor-pointer transition-all duration-200 ${
            filterMode === "all"
              ? "ring-2 ring-primary/30 border-primary/40"
              : "hover:border-primary/20"
          }`}
          onClick={() => setFilterMode("all")}
        >
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {isLoading ? (
                    <span className="inline-block w-8 h-7 bg-muted animate-pulse rounded" />
                  ) : (
                    totalUsers
                  )}
                </p>
                <p className="text-xs text-muted-foreground">
                  Total Users
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card
          className={`border-border/50 cursor-pointer transition-all duration-200 ${
            filterMode === "premium"
              ? "ring-2 ring-amber-400/40 border-amber-400/50"
              : "hover:border-amber-300/30"
          }`}
          onClick={() =>
            setFilterMode(filterMode === "premium" ? "all" : "premium")
          }
        >
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
                <Crown className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {isLoading ? (
                    <span className="inline-block w-8 h-7 bg-muted animate-pulse rounded" />
                  ) : (
                    premiumUsers
                  )}
                </p>
                <p className="text-xs text-muted-foreground">
                  Premium Users
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card
          className={`border-border/50 cursor-pointer transition-all duration-200 ${
            filterMode === "free"
              ? "ring-2 ring-slate-400/40 border-slate-400/50"
              : "hover:border-slate-300/30"
          }`}
          onClick={() =>
            setFilterMode(filterMode === "free" ? "all" : "free")
          }
        >
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
                <User className="w-5 h-5 text-slate-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {isLoading ? (
                    <span className="inline-block w-8 h-7 bg-muted animate-pulse rounded" />
                  ) : (
                    freeUsers
                  )}
                </p>
                <p className="text-xs text-muted-foreground">
                  Free Users
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search & Filter Bar */}
      <Card className="border-border/50">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by email or name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="flex items-center gap-2">
              {filterMode !== "all" && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setFilterMode("all")}
                  className="text-xs"
                >
                  Clear Filter
                </Button>
              )}
              <Badge variant="outline" className="py-2 px-4">
                <Users className="w-3.5 h-3.5 mr-1.5" />
                {filteredUsers.length} users
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card className="border-border/50">
        <CardContent className="p-0">
          {isLoading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="w-6 h-6 animate-spin text-primary" />
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mb-4">
                <Users className="w-8 h-8 text-muted-foreground" />
              </div>
              <p className="font-medium text-foreground">
                {searchQuery || filterMode !== "all"
                  ? "No users found"
                  : "No users yet"}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                {searchQuery
                  ? "Try a different search"
                  : filterMode !== "all"
                  ? "No users match this filter"
                  : "App users will be listed here"}
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Registered Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Premium Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <AnimatePresence mode="popLayout">
                  {filteredUsers.map((user) => (
                    <motion.tr
                      key={user.id}
                      layout
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="border-b transition-colors hover:bg-muted/50"
                    >
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2.5">
                          <div
                            className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${
                              user.is_premium
                                ? "bg-gradient-to-br from-amber-100 to-amber-200"
                                : "bg-primary/10"
                            }`}
                          >
                            <span
                              className={`text-xs font-bold ${
                                user.is_premium
                                  ? "text-amber-700"
                                  : "text-primary"
                              }`}
                            >
                              {(
                                user.full_name ||
                                user.email_address ||
                                "?"
                              )
                                .charAt(0)
                                .toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium text-sm text-foreground">
                              {user.full_name || "Unnamed"}
                            </p>
                            <p className="text-[11px] text-muted-foreground font-mono">
                              {user.id.slice(0, 8)}...
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1.5 text-muted-foreground text-sm">
                          <Mail className="w-3.5 h-3.5 shrink-0" />
                          <span className="truncate max-w-[200px]">
                            {user.email_address || "—"}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1.5 text-muted-foreground text-xs">
                          <Calendar className="w-3.5 h-3.5 shrink-0" />
                          {user.created_at
                            ? new Date(user.created_at).toLocaleDateString(
                                "tr-TR",
                                {
                                  day: "2-digit",
                                  month: "short",
                                  year: "numeric",
                                }
                              )
                            : "—"}
                        </div>
                      </TableCell>
                      <TableCell>
                        {user.is_premium ? (
                          <Badge className="bg-gradient-to-r from-amber-100 to-amber-200 text-amber-800 border-amber-300 hover:from-amber-100 hover:to-amber-200 shadow-sm">
                            <Crown className="w-3 h-3 mr-1" />
                            Premium
                          </Badge>
                        ) : (
                          <Badge
                            variant="outline"
                            className="text-muted-foreground"
                          >
                            Free
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        {user.is_premium ? (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => openRevokeDialog(user)}
                            className="text-destructive hover:text-destructive hover:bg-destructive/10 text-xs gap-1.5"
                          >
                            <ShieldX className="w-3.5 h-3.5" />
                            Revoke
                          </Button>
                        ) : (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => openGrantDialog(user)}
                            className="text-amber-600 hover:text-amber-700 hover:bg-amber-50 text-xs gap-1.5"
                          >
                            <Gift className="w-3.5 h-3.5" />
                            Grant Premium
                          </Button>
                        )}
                      </TableCell>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Note about RLS */}
      <Card className="border-amber-200/50 bg-gradient-to-r from-amber-50/50 to-transparent">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground text-sm">
                Supabase RLS Policy
              </h3>
              <p className="text-xs text-muted-foreground mt-1">
                The user list is fetched entirely securely through Server Actions using Service Role Key. If it appears empty in other areas, ensure you have set proper Row Level Security (RLS) policies.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Grant Premium Dialog */}
      <Dialog open={grantDialogOpen} onOpenChange={setGrantDialogOpen}>
        <DialogContent className="sm:max-w-md">
          {grantSuccess ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center py-8 gap-4"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="w-20 h-20 rounded-full bg-emerald-50 flex items-center justify-center"
              >
                <Sparkles className="w-10 h-10 text-emerald-500" />
              </motion.div>
              <div className="text-center">
                <h3 className="font-bold text-lg text-foreground">
                  Premium Granted! 🎉
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {grantingUser?.full_name || grantingUser?.email_address}{" "}
                  is now a premium member
                </p>
              </div>
            </motion.div>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Gift className="w-5 h-5 text-amber-500" />
                  Grant Premium Subscription
                </DialogTitle>
                <DialogDescription>
                  Are you sure you want to upgrade this user to premium status?
                </DialogDescription>
              </DialogHeader>

              <div className="bg-muted/50 rounded-xl p-4 space-y-2">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-sm font-bold text-primary">
                      {(
                        grantingUser?.full_name ||
                        grantingUser?.email_address ||
                        "?"
                      )
                        .charAt(0)
                        .toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">
                      {grantingUser?.full_name || "Unnamed"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {grantingUser?.email_address || "—"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                <p className="text-xs text-amber-800">
                  <strong>Note:</strong> This action sets the{" "}
                  <code className="font-mono">is_premium</code> flag to{" "}
                  <code className="font-mono">true</code>. Depending on structure, RevenueCat entitlements might still handle core app-logic.
                </p>
              </div>

              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setGrantDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleGrant}
                  disabled={isSaving}
                  className="bg-gradient-to-r from-amber-500 to-amber-600 text-white"
                >
                  {isSaving ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <Crown className="w-4 h-4 mr-1" />
                      Grant Premium
                    </>
                  )}
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Revoke Premium Dialog */}
      <Dialog open={revokeDialogOpen} onOpenChange={setRevokeDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-destructive" />
              Revoke Premium Confrimation
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to revoke this user{"'"}s premium status?
            </DialogDescription>
          </DialogHeader>

          <div className="bg-muted/50 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center">
                <span className="text-sm font-bold text-amber-700">
                  {(
                    revokingUser?.full_name ||
                    revokingUser?.email_address ||
                    "?"
                  )
                    .charAt(0)
                    .toUpperCase()}
                </span>
              </div>
              <div>
                <p className="font-semibold text-foreground">
                  {revokingUser?.full_name || "İsimsiz"}
                </p>
                <p className="text-sm text-muted-foreground">
                  {revokingUser?.email_address || "—"}
                </p>
              </div>
              <Badge className="ml-auto bg-amber-100 text-amber-800 border-amber-200">
                <Crown className="w-3 h-3 mr-1" />
                Premium
              </Badge>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setRevokeDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleRevoke}
              disabled={isSaving}
            >
              {isSaving ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <ShieldX className="w-4 h-4 mr-1" />
                  Revoke Premium
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
