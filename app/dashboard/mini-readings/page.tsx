"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Plus,
  Pencil,
  Trash2,
  Search,
  BookOpen,
  AlertCircle,
  FileText,
  Loader2,
  Eye,
  ChevronDown,
  ChevronUp,
  X,
} from "lucide-react"
import { supabase } from "@/lib/supabase"
import type {
  Content,
  ContentPage,
  ContentCategory,
  Level,
} from "@/lib/types"
import {
  contentCategoryLabels,
  levelColors,
} from "@/lib/types"
import {
  createContentAction,
  updateContentAction,
  deleteContentAction,
  createContentPageAction,
  updateContentPageAction,
  deleteContentPageAction,
} from "@/app/actions/content"

const ALL_LEVELS: Level[] = ["A1", "A2", "B1", "B2", "C1", "C2"]

const ALL_CATEGORIES: ContentCategory[] = [
  "food",
  "health",
  "travel",
  "science",
  "business",
  "spor",
  "technology",
]

export default function MiniReadingsPage() {
  const [contents, setContents] = useState<Content[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [isPagesOpen, setIsPagesOpen] = useState(false)
  const [editingContent, setEditingContent] = useState<Content | null>(null)
  const [deletingContent, setDeletingContent] = useState<Content | null>(null)
  const [viewingContent, setViewingContent] = useState<Content | null>(null)
  const [contentPages, setContentPages] = useState<ContentPage[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [expandedPageId, setExpandedPageId] = useState<string | null>(null)

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    category: "food" as ContentCategory,
    levels: ["A1", "B1"] as Level[],
    active_levels: [] as Level[],
    cover_image_url: "",
  })

  // Page form state (for adding/editing pages)
  const [isPageFormOpen, setIsPageFormOpen] = useState(false)
  const [editingPage, setEditingPage] = useState<ContentPage | null>(null)
  const [pageFormData, setPageFormData] = useState({
    level: "A1" as Level,
    order_no: 1,
    content: "",
    image_url: "",
  })

  const fetchContents = useCallback(async () => {
    setIsLoading(true)
    const { data, error } = await supabase
      .from("content")
      .select("*")
      .order("created_at", { ascending: false })

    if (!error && data) {
      setContents(data)
    }
    setIsLoading(false)
  }, [])

  useEffect(() => {
    fetchContents()
  }, [fetchContents])

  const filteredContents = contents.filter(
    (c) =>
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const openCreateForm = () => {
    setEditingContent(null)
    setFormData({
      title: "",
      category: "food",
      levels: ["A1", "B1"],
      active_levels: [],
      cover_image_url: "",
    })
    setIsFormOpen(true)
  }

  const openEditForm = (content: Content) => {
    setEditingContent(content)
    setFormData({
      title: content.title,
      category: content.category,
      levels: content.levels,
      active_levels: content.active_levels || [],
      cover_image_url: content.cover_image_url || "",
    })
    setIsFormOpen(true)
  }

  const openDeleteConfirm = (content: Content) => {
    setDeletingContent(content)
    setIsDeleteOpen(true)
  }

  const openPages = async (content: Content) => {
    setViewingContent(content)
    setIsPagesOpen(true)
    setExpandedPageId(null)

    const { data, error } = await supabase
      .from("content_page")
      .select("*")
      .eq("content_id", content.id)
      .order("level")
      .order("order_no")

    if (!error && data) {
      setContentPages(data)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)

    const payload = {
      title: formData.title,
      category: formData.category,
      levels: formData.levels,
      active_levels: formData.active_levels.length > 0 ? formData.active_levels : null,
      cover_image_url: formData.cover_image_url || null,
    }

    if (editingContent) {
      const result = await updateContentAction(editingContent.id, {
        ...payload,
        updated_at: new Date().toISOString(),
      })

      if (result.success) {
        await fetchContents()
        setIsFormOpen(false)
      }
    } else {
      const result = await createContentAction(payload)

      if (result.success) {
        await fetchContents()
        setIsFormOpen(false)
      }
    }
    setIsSaving(false)
  }

  const handleDelete = async () => {
    if (!deletingContent) return
    setIsSaving(true)

    // The server action now safely deletes it
    // Note: If you want cascading deletes on pages, they will happen automatically
    // if you have ON DELETE CASCADE in Supabase, or we assume deleteContentAction does it.
    // For safety, let's just rely on the server action.
    const result = await deleteContentAction(deletingContent.id)

    if (result.success) {
      await fetchContents()
      setIsDeleteOpen(false)
      setDeletingContent(null)
    }
    setIsSaving(false)
  }

  // Page CRUD
  const openPageCreateForm = () => {
    setEditingPage(null)
    setPageFormData({
      level: "A1",
      order_no: contentPages.length + 1,
      content: "",
      image_url: "",
    })
    setIsPageFormOpen(true)
  }

  const openPageEditForm = (page: ContentPage) => {
    setEditingPage(page)
    setPageFormData({
      level: page.level,
      order_no: page.order_no,
      content: page.content,
      image_url: page.image_url || "",
    })
    setIsPageFormOpen(true)
  }

  const handlePageSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!viewingContent) return
    setIsSaving(true)

    const payload = {
      content_id: viewingContent.id,
      level: pageFormData.level,
      order_no: pageFormData.order_no,
      content: pageFormData.content,
      image_url: pageFormData.image_url || null,
    }

    if (editingPage) {
      const result = await updateContentPageAction(editingPage.id, payload)

      if (result.success) {
        await openPages(viewingContent)
        setIsPageFormOpen(false)
      }
    } else {
      const result = await createContentPageAction(payload)

      if (result.success) {
        await openPages(viewingContent)
        setIsPageFormOpen(false)
      }
    }
    setIsSaving(false)
  }

  const handlePageDelete = async (pageId: string) => {
    if (!viewingContent) return
    const result = await deleteContentPageAction(pageId)

    if (result.success) {
      await openPages(viewingContent)
    }
  }

  const toggleLevel = (level: Level, field: "levels" | "active_levels") => {
    setFormData((prev) => {
      const current = prev[field]
      const updated = current.includes(level)
        ? current.filter((l) => l !== level)
        : [...current, level]
      return { ...prev, [field]: updated }
    })
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Mini Readings
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage short reading contents
          </p>
        </div>
        <Button
          onClick={openCreateForm}
          className="bg-gradient-to-r from-primary to-[oklch(0.55_0.18_270)] hover:opacity-90 shadow-md shadow-primary/20"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Readings
        </Button>
      </div>

      {/* Search & Filters */}
      <Card className="border-border/50">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by title or category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Badge variant="outline" className="self-start py-2 px-4">
              <FileText className="w-3.5 h-3.5 mr-1.5" />
              {filteredContents.length} items
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card className="border-border/50">
        <CardContent className="p-0">
          {isLoading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="w-6 h-6 animate-spin text-primary" />
            </div>
          ) : filteredContents.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mb-4">
                <BookOpen className="w-8 h-8 text-muted-foreground" />
              </div>
              <p className="font-medium text-foreground">
                No items found
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Start by adding your first reading item
              </p>
              <Button onClick={openCreateForm} className="mt-4" size="sm">
                <Plus className="w-4 h-4 mr-1" />
                Add First Item
              </Button>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Levels</TableHead>
                  <TableHead>Active Levels</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <AnimatePresence mode="popLayout">
                  {filteredContents.map((content) => (
                    <motion.tr
                      key={content.id}
                      layout
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="border-b transition-colors hover:bg-muted/50"
                    >
                      <TableCell className="font-medium max-w-[200px]">
                        <div className="flex items-center gap-2">
                          {content.cover_image_url && (
                            <img
                              src={content.cover_image_url}
                              alt=""
                              className="w-8 h-8 rounded object-cover shrink-0"
                            />
                          )}
                          <span className="truncate">{content.title}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">
                          {contentCategoryLabels[content.category] || content.category}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {content.levels.map((level) => (
                            <span
                              key={level}
                              className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium border ${levelColors[level]}`}
                            >
                              {level}
                            </span>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {content.active_levels && content.active_levels.length > 0 ? (
                            content.active_levels.map((level) => (
                              <span
                                key={level}
                                className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold border ${levelColors[level]}`}
                              >
                                {level}
                              </span>
                            ))
                          ) : (
                            <span className="text-xs text-muted-foreground">—</span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground text-xs">
                        {new Date(content.created_at).toLocaleDateString("tr-TR")}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            onClick={() => openPages(content)}
                            className="text-muted-foreground hover:text-blue-600"
                            title="Sayfaları Gör"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            onClick={() => openEditForm(content)}
                            className="text-muted-foreground hover:text-primary"
                          >
                            <Pencil className="w-3.5 h-3.5" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            onClick={() => openDeleteConfirm(content)}
                            className="text-muted-foreground hover:text-destructive"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </Button>
                        </div>
                      </TableCell>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Create/Edit Content Dialog */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingContent ? "Edit Reading Item" : "Add New Reading Idea"}
            </DialogTitle>
            <DialogDescription>
              {editingContent
                ? "Update specific details of this item"
                : "Create a short new piece of context"}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="mr-title">Title</Label>
              <Input
                id="mr-title"
                placeholder="Reading Title"
                value={formData.title}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, title: e.target.value }))
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Kategori</Label>
              <Select
                value={formData.category}
                onValueChange={(value) =>
                  setFormData((prev) => ({
                    ...prev,
                    category: value as ContentCategory,
                  }))
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {ALL_CATEGORIES.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {contentCategoryLabels[cat]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Seviyeler (levels)</Label>
              <div className="flex flex-wrap gap-2">
                {ALL_LEVELS.map((level) => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => toggleLevel(level, "levels")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                      formData.levels.includes(level)
                        ? levelColors[level] + " ring-2 ring-offset-1 ring-current"
                        : "bg-muted text-muted-foreground border-border"
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Aktif Seviyeler (active_levels)</Label>
              <p className="text-xs text-muted-foreground">
                Uygulamada gösterilecek seviyeler
              </p>
              <div className="flex flex-wrap gap-2">
                {formData.levels.map((level) => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => toggleLevel(level, "active_levels")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                      formData.active_levels.includes(level)
                        ? levelColors[level] + " ring-2 ring-offset-1 ring-current"
                        : "bg-muted text-muted-foreground border-border"
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="mr-image">Kapak Resmi URL (Opsiyonel)</Label>
              <Input
                id="mr-image"
                type="url"
                placeholder="https://..."
                value={formData.cover_image_url}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    cover_image_url: e.target.value,
                  }))
                }
              />
              {formData.cover_image_url && (
                <img
                  src={formData.cover_image_url}
                  alt="Preview"
                  className="w-20 h-20 rounded-lg object-cover mt-2"
                />
              )}
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsFormOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSaving}
                className="bg-gradient-to-r from-primary to-[oklch(0.55_0.18_270)]"
              >
                {isSaving ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : editingContent ? (
                  "Update"
                ) : (
                  "Save"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-destructive" />
              Delete Confirmation
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to delete <strong>&quot;{deletingContent?.title}&quot;</strong> and
              all of its pages? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={isSaving}
            >
              {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View/Manage Pages Dialog */}
      <Dialog open={isPagesOpen} onOpenChange={setIsPagesOpen}>
        <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary" />
              {viewingContent?.title} — Sayfalar
            </DialogTitle>
            <DialogDescription>
              Bu parçaya ait seviye bazlı sayfaları yönetin
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Badge variant="outline" className="py-1.5 px-3">
                {contentPages.length} sayfa
              </Badge>
              <Button size="sm" onClick={openPageCreateForm}>
                <Plus className="w-3.5 h-3.5 mr-1" />
                Sayfa Ekle
              </Button>
            </div>

            {contentPages.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground text-sm">
                Henüz sayfa eklenmemiş
              </div>
            ) : (
              <div className="space-y-2">
                {contentPages.map((page) => (
                  <div
                    key={page.id}
                    className="border rounded-lg overflow-hidden"
                  >
                    <div
                      className="flex items-center justify-between p-3 cursor-pointer hover:bg-muted/50 transition-colors"
                      onClick={() =>
                        setExpandedPageId(
                          expandedPageId === page.id ? null : page.id
                        )
                      }
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${levelColors[page.level]}`}
                        >
                          {page.level}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          Sayfa #{page.order_no}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            openPageEditForm(page)
                          }}
                          className="text-muted-foreground hover:text-primary"
                        >
                          <Pencil className="w-3 h-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            handlePageDelete(page.id)
                          }}
                          className="text-muted-foreground hover:text-destructive"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                        {expandedPageId === page.id ? (
                          <ChevronUp className="w-4 h-4 text-muted-foreground" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-muted-foreground" />
                        )}
                      </div>
                    </div>
                    <AnimatePresence>
                      {expandedPageId === page.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="px-3 pb-3 border-t">
                            <p className="text-sm text-foreground whitespace-pre-wrap mt-3 max-h-[300px] overflow-y-auto leading-relaxed">
                              {page.content}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Create/Edit Page Dialog */}
      <Dialog open={isPageFormOpen} onOpenChange={setIsPageFormOpen}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingPage ? "Sayfayı Düzenle" : "Yeni Sayfa Ekle"}
            </DialogTitle>
            <DialogDescription>
              {viewingContent?.title} için{" "}
              {editingPage ? "sayfayı güncelleyin" : "yeni bir sayfa ekleyin"}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handlePageSubmit} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Seviye</Label>
                <Select
                  value={pageFormData.level}
                  onValueChange={(value) =>
                    setPageFormData((prev) => ({
                      ...prev,
                      level: value as Level,
                    }))
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {ALL_LEVELS.map((level) => (
                      <SelectItem key={level} value={level}>
                        {level}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="page-order">Sıra No</Label>
                <Input
                  id="page-order"
                  type="number"
                  min={1}
                  value={pageFormData.order_no}
                  onChange={(e) =>
                    setPageFormData((prev) => ({
                      ...prev,
                      order_no: parseInt(e.target.value) || 1,
                    }))
                  }
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="page-content">İçerik</Label>
              <Textarea
                id="page-content"
                placeholder="Sayfa içeriği..."
                value={pageFormData.content}
                onChange={(e) =>
                  setPageFormData((prev) => ({
                    ...prev,
                    content: e.target.value,
                  }))
                }
                className="min-h-[250px]"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="page-image">Resim URL (Opsiyonel)</Label>
              <Input
                id="page-image"
                type="url"
                placeholder="https://..."
                value={pageFormData.image_url}
                onChange={(e) =>
                  setPageFormData((prev) => ({
                    ...prev,
                    image_url: e.target.value,
                  }))
                }
              />
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsPageFormOpen(false)}
              >
                İptal
              </Button>
              <Button type="submit" disabled={isSaving}>
                {isSaving ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : editingPage ? (
                  "Güncelle"
                ) : (
                  "Kaydet"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
