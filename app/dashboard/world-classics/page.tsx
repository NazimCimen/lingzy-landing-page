"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
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
  Globe,
  AlertCircle,
  BookOpen,
  Loader2,
  Eye,
  ChevronDown,
  ChevronUp,
  ExternalLink,
} from "lucide-react"
import { supabase } from "@/lib/supabase"
import type { Ebook, EbookPage, EbookCategory } from "@/lib/types"
import { ebookCategoryLabels } from "@/lib/types"
import {
  createEbookAction,
  updateEbookAction,
  deleteEbookAction,
  createEbookPageAction,
  updateEbookPageAction,
  deleteEbookPageAction,
} from "@/app/actions/ebook"

const ALL_CATEGORIES: EbookCategory[] = [
  "adventure",
  "fantasy",
  "science_fiction",
  "drama",
  "romance",
  "horror",
  "detective",
]

export default function WorldClassicsPage() {
  const [ebooks, setEbooks] = useState<Ebook[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [isPagesOpen, setIsPagesOpen] = useState(false)
  const [editingEbook, setEditingEbook] = useState<Ebook | null>(null)
  const [deletingEbook, setDeletingEbook] = useState<Ebook | null>(null)
  const [viewingEbook, setViewingEbook] = useState<Ebook | null>(null)
  const [ebookPages, setEbookPages] = useState<EbookPage[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [expandedPageId, setExpandedPageId] = useState<string | null>(null)

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    description: "",
    category: "adventure" as EbookCategory,
    cover_image_url: "",
    published_at: new Date().toISOString().split("T")[0],
    source_provider: "project_gutenberg",
    source_url: "",
    license: "Public Domain",
    page_count: "",
    is_classic: true,
  })

  // Page form state
  const [isPageFormOpen, setIsPageFormOpen] = useState(false)
  const [editingPage, setEditingPage] = useState<EbookPage | null>(null)
  const [pageFormData, setPageFormData] = useState({
    order_no: 1,
    title: "",
    content: "",
  })

  const fetchEbooks = useCallback(async () => {
    setIsLoading(true)
    const { data, error } = await supabase
      .from("ebook")
      .select("*")
      .order("created_at", { ascending: false })

    if (!error && data) {
      setEbooks(data)
    }
    setIsLoading(false)
  }, [])

  useEffect(() => {
    fetchEbooks()
  }, [fetchEbooks])

  const filteredEbooks = ebooks.filter(
    (e) =>
      e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const openCreateForm = () => {
    setEditingEbook(null)
    setFormData({
      title: "",
      author: "",
      description: "",
      category: "adventure",
      cover_image_url: "",
      published_at: new Date().toISOString().split("T")[0],
      source_provider: "project_gutenberg",
      source_url: "",
      license: "Public Domain",
      page_count: "",
      is_classic: true,
    })
    setIsFormOpen(true)
  }

  const openEditForm = (ebook: Ebook) => {
    setEditingEbook(ebook)
    setFormData({
      title: ebook.title,
      author: ebook.author,
      description: ebook.description || "",
      category: ebook.category,
      cover_image_url: ebook.cover_image_url,
      published_at: ebook.published_at
        ? new Date(ebook.published_at).toISOString().split("T")[0]
        : "",
      source_provider: ebook.source_provider,
      source_url: ebook.source_url,
      license: ebook.license,
      page_count: ebook.page_count?.toString() || "",
      is_classic: ebook.is_classic ?? true,
    })
    setIsFormOpen(true)
  }

  const openDeleteConfirm = (ebook: Ebook) => {
    setDeletingEbook(ebook)
    setIsDeleteOpen(true)
  }

  const openPages = async (ebook: Ebook) => {
    setViewingEbook(ebook)
    setIsPagesOpen(true)
    setExpandedPageId(null)

    const { data, error } = await supabase
      .from("ebook_page")
      .select("*")
      .eq("ebook_id", ebook.id)
      .order("order_no")

    if (!error && data) {
      setEbookPages(data)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)

    const payload = {
      title: formData.title,
      author: formData.author,
      description: formData.description || null,
      category: formData.category,
      cover_image_url: formData.cover_image_url,
      published_at: formData.published_at
        ? new Date(formData.published_at).toISOString()
        : new Date().toISOString(),
      source_provider: formData.source_provider,
      source_url: formData.source_url,
      license: formData.license,
      page_count: formData.page_count ? parseInt(formData.page_count) : null,
      is_classic: formData.is_classic,
    }

    if (editingEbook) {
      const result = await updateEbookAction(editingEbook.id, {
        ...payload,
        updated_at: new Date().toISOString(),
      })

      if (result.success) {
        await fetchEbooks()
        setIsFormOpen(false)
      }
    } else {
      const result = await createEbookAction(payload)

      if (result.success) {
        await fetchEbooks()
        setIsFormOpen(false)
      }
    }
    setIsSaving(false)
  }

  const handleDelete = async () => {
    if (!deletingEbook) return
    setIsSaving(true)

    const result = await deleteEbookAction(deletingEbook.id)

    if (result.success) {
      await fetchEbooks()
      setIsDeleteOpen(false)
      setDeletingEbook(null)
    }
    setIsSaving(false)
  }

  // Page CRUD
  const openPageCreateForm = () => {
    setEditingPage(null)
    setPageFormData({
      order_no: ebookPages.length + 1,
      title: "",
      content: "",
    })
    setIsPageFormOpen(true)
  }

  const openPageEditForm = (page: EbookPage) => {
    setEditingPage(page)
    setPageFormData({
      order_no: page.order_no,
      title: page.title || "",
      content: page.content,
    })
    setIsPageFormOpen(true)
  }

  const handlePageSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!viewingEbook) return
    setIsSaving(true)

    const payload = {
      ebook_id: viewingEbook.id,
      order_no: pageFormData.order_no,
      title: pageFormData.title || null,
      content: pageFormData.content,
    }

    if (editingPage) {
      const result = await updateEbookPageAction(editingPage.id, payload)

      if (result.success) {
        await openPages(viewingEbook)
        setIsPageFormOpen(false)
      }
    } else {
      const result = await createEbookPageAction(payload)

      if (result.success) {
        await openPages(viewingEbook)
        setIsPageFormOpen(false)
      }
    }
    setIsSaving(false)
  }

  const handlePageDelete = async (pageId: string) => {
    if (!viewingEbook) return
    const result = await deleteEbookPageAction(pageId)

    if (result.success) {
      await openPages(viewingEbook)
    }
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Dünya Klasikleri
          </h1>
          <p className="text-muted-foreground mt-1">
            Dünya klasiklerinden okuma parçalarını yönetin
          </p>
        </div>
        <Button
          onClick={openCreateForm}
          className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:opacity-90 shadow-md shadow-emerald-500/20"
        >
          <Plus className="w-4 h-4 mr-2" />
          Yeni Klasik Ekle
        </Button>
      </div>

      {/* Search */}
      <Card className="border-border/50">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Başlık, yazar veya kategori ile ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Badge variant="outline" className="self-start py-2 px-4">
              <BookOpen className="w-3.5 h-3.5 mr-1.5" />
              {filteredEbooks.length} klasik
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
          ) : filteredEbooks.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mb-4">
                <Globe className="w-8 h-8 text-muted-foreground" />
              </div>
              <p className="font-medium text-foreground">
                Henüz klasik bulunamadı
              </p>
              <Button onClick={openCreateForm} className="mt-4" size="sm">
                <Plus className="w-4 h-4 mr-1" />
                İlk Klasiği Ekle
              </Button>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Kitap</TableHead>
                  <TableHead>Yazar</TableHead>
                  <TableHead>Kategori</TableHead>
                  <TableHead>Sayfa</TableHead>
                  <TableHead>Kaynak</TableHead>
                  <TableHead className="text-right">İşlemler</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <AnimatePresence mode="popLayout">
                  {filteredEbooks.map((ebook) => (
                    <motion.tr
                      key={ebook.id}
                      layout
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="border-b transition-colors hover:bg-muted/50"
                    >
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-3">
                          {ebook.cover_image_url && (
                            <img
                              src={ebook.cover_image_url}
                              alt=""
                              className="w-10 h-14 rounded object-cover shrink-0 shadow-sm"
                            />
                          )}
                          <span className="truncate max-w-[180px]">
                            {ebook.title}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {ebook.author}
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">
                          {ebookCategoryLabels[ebook.category] ||
                            ebook.category}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground text-sm">
                        {ebook.page_count ?? "—"}
                      </TableCell>
                      <TableCell>
                        {ebook.source_url && (
                          <a
                            href={ebook.source_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
                          >
                            <ExternalLink className="w-3 h-3" />
                            Kaynak
                          </a>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            onClick={() => openPages(ebook)}
                            className="text-muted-foreground hover:text-blue-600"
                            title="Sayfaları Gör"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            onClick={() => openEditForm(ebook)}
                            className="text-muted-foreground hover:text-primary"
                          >
                            <Pencil className="w-3.5 h-3.5" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            onClick={() => openDeleteConfirm(ebook)}
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

      {/* Create/Edit Ebook Dialog */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingEbook ? "Klasiği Düzenle" : "Yeni Dünya Klasiği Ekle"}
            </DialogTitle>
            <DialogDescription>
              {editingEbook
                ? "Mevcut klasik bilgilerini güncelleyin"
                : "Yeni bir dünya klasiği parçası oluşturun"}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="wc-title">Başlık</Label>
                <Input
                  id="wc-title"
                  placeholder="Eser adı"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, title: e.target.value }))
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="wc-author">Yazar</Label>
                <Input
                  id="wc-author"
                  placeholder="Yazarın adı"
                  value={formData.author}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, author: e.target.value }))
                  }
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Kategori</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) =>
                    setFormData((prev) => ({
                      ...prev,
                      category: value as EbookCategory,
                    }))
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {ALL_CATEGORIES.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {ebookCategoryLabels[cat]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="wc-pages">Sayfa Sayısı</Label>
                <Input
                  id="wc-pages"
                  type="number"
                  placeholder="ör: 250"
                  value={formData.page_count}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      page_count: e.target.value,
                    }))
                  }
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="wc-desc">Açıklama (Opsiyonel)</Label>
              <Textarea
                id="wc-desc"
                placeholder="Kısa açıklama..."
                value={formData.description}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                className="min-h-[80px]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="wc-cover">Kapak Resmi URL</Label>
                <Input
                  id="wc-cover"
                  type="url"
                  placeholder="https://..."
                  value={formData.cover_image_url}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      cover_image_url: e.target.value,
                    }))
                  }
                  required
                />
                {formData.cover_image_url && (
                  <img
                    src={formData.cover_image_url}
                    alt="Cover preview"
                    className="w-16 h-24 rounded object-cover mt-1 shadow-sm"
                  />
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="wc-published">Yayın Tarihi</Label>
                <Input
                  id="wc-published"
                  type="date"
                  value={formData.published_at}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      published_at: e.target.value,
                    }))
                  }
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="wc-source-url">Kaynak URL</Label>
                <Input
                  id="wc-source-url"
                  type="url"
                  placeholder="https://www.gutenberg.org/..."
                  value={formData.source_url}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      source_url: e.target.value,
                    }))
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="wc-source-provider">Kaynak Sağlayıcı</Label>
                <Input
                  id="wc-source-provider"
                  placeholder="project_gutenberg"
                  value={formData.source_provider}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      source_provider: e.target.value,
                    }))
                  }
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="wc-license">Lisans</Label>
              <Input
                id="wc-license"
                placeholder="Public Domain"
                value={formData.license}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    license: e.target.value,
                  }))
                }
                required
              />
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsFormOpen(false)}
              >
                İptal
              </Button>
              <Button
                type="submit"
                disabled={isSaving}
                className="bg-gradient-to-r from-emerald-500 to-emerald-600"
              >
                {isSaving ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : editingEbook ? (
                  "Güncelle"
                ) : (
                  "Kaydet"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-destructive" />
              Silme Onayı
            </DialogTitle>
            <DialogDescription>
              <strong>&quot;{deletingEbook?.title}&quot;</strong> kitabını ve
              tüm sayfalarını silmek istediğinize emin misiniz? Bu işlem geri
              alınamaz.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteOpen(false)}>
              İptal
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={isSaving}
            >
              {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : "Sil"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View/Manage Pages Dialog */}
      <Dialog open={isPagesOpen} onOpenChange={setIsPagesOpen}>
        <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-emerald-600" />
              {viewingEbook?.title} — Sayfalar
            </DialogTitle>
            <DialogDescription>
              {viewingEbook?.author} · {ebookPages.length} sayfa
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Badge variant="outline" className="py-1.5 px-3">
                {ebookPages.length} sayfa
              </Badge>
              <Button size="sm" onClick={openPageCreateForm}>
                <Plus className="w-3.5 h-3.5 mr-1" />
                Sayfa Ekle
              </Button>
            </div>

            {ebookPages.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground text-sm">
                Henüz sayfa eklenmemiş
              </div>
            ) : (
              <div className="space-y-2">
                {ebookPages.map((page) => (
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
                        <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded">
                          #{page.order_no}
                        </span>
                        {page.title && (
                          <span className="text-sm font-medium text-foreground truncate max-w-[250px]">
                            {page.title}
                          </span>
                        )}
                        <span className="text-xs text-muted-foreground">
                          {page.content.length} karakter
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
              {viewingEbook?.title} için{" "}
              {editingPage ? "sayfayı güncelleyin" : "yeni bir sayfa ekleyin"}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handlePageSubmit} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="ep-order">Sıra No</Label>
                <Input
                  id="ep-order"
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
              <div className="space-y-2">
                <Label htmlFor="ep-title">Bölüm Başlığı (Opsiyonel)</Label>
                <Input
                  id="ep-title"
                  placeholder="ör: Chapter 1"
                  value={pageFormData.title}
                  onChange={(e) =>
                    setPageFormData((prev) => ({
                      ...prev,
                      title: e.target.value,
                    }))
                  }
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="ep-content">İçerik</Label>
              <Textarea
                id="ep-content"
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
