/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Plus, Search, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { formatPrice } from "@/lib/utils";
import { toast } from "sonner";

interface ProductRow {
  id: string;
  name: string;
  slug: string;
  description: string;
  ingredients: string;
  howToUse: string;
  price: number;
  compareAtPrice: number | null;
  sku: string;
  stockQuantity: number;
  categoryId: string;
  categoryName: string;
  images: string[];
  isFeatured: boolean;
  isActive: boolean;
  variantsCount: number;
}

interface ProductsClientProps {
  initialProducts: ProductRow[];
  categories: { id: string; name: string }[];
}

export function ProductsClient({
  initialProducts,
  categories,
}: ProductsClientProps) {
  const [products, setProducts] = useState<ProductRow[]>(initialProducts);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductRow | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    sku: "",
    price: 0,
    compareAtPrice: "" as string | number,
    stockQuantity: 0,
    categoryId: categories[0]?.id || "",
    description: "",
    ingredients: "",
    howToUse: "",
    imageInput: "/placeholder.png",
    isFeatured: false,
    isActive: true,
  });

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.sku.toLowerCase().includes(search.toLowerCase())
  );

  const openCreateModal = () => {
    setEditingProduct(null);
    setFormData({
      name: "",
      slug: "",
      sku: "",
      price: 29,
      compareAtPrice: "",
      stockQuantity: 100,
      categoryId: categories[0]?.id || "",
      description: "",
      ingredients: "",
      howToUse: "",
      imageInput: "/placeholder.png",
      isFeatured: false,
      isActive: true,
    });
    setModalOpen(true);
  };

  const openEditModal = (product: ProductRow) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      slug: product.slug,
      sku: product.sku,
      price: product.price,
      compareAtPrice: product.compareAtPrice || "",
      stockQuantity: product.stockQuantity,
      categoryId: product.categoryId,
      description: product.description,
      ingredients: product.ingredients,
      howToUse: product.howToUse,
      imageInput: product.images[0] || "/placeholder.png",
      isFeatured: product.isFeatured,
      isActive: product.isActive,
    });
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = editingProduct
      ? `/api/products/${editingProduct.slug}`
      : `/api/products`;
    const method = editingProduct ? "PUT" : "POST";

    const payload = {
      name: formData.name,
      slug: formData.slug || formData.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      sku: formData.sku,
      price: Number(formData.price),
      compareAtPrice: formData.compareAtPrice ? Number(formData.compareAtPrice) : null,
      stockQuantity: Number(formData.stockQuantity),
      categoryId: formData.categoryId,
      description: formData.description,
      ingredients: formData.ingredients,
      howToUse: formData.howToUse,
      images: [formData.imageInput],
      isFeatured: formData.isFeatured,
      isActive: formData.isActive,
    };

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Failed to save product");
      } else {
        toast.success(editingProduct ? "Product updated" : "Product created");
        setModalOpen(false);

        // Refresh dynamic list
        const refreshRes = await fetch("/api/products?limit=100");
        const refreshData = await refreshRes.json();
        if (refreshData.products) {
          setProducts(refreshData.products);
        }
      }
    } catch (err) {
      console.error(err);
      toast.error("Network error saving product");
    }
  };

  const handleDelete = async (slug: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      const res = await fetch(`/api/products/${slug}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Product deleted successfully");
        setProducts((prev) => prev.filter((p) => p.slug !== slug));
      } else {
        const errData = await res.json();
        toast.error(errData.error || "Failed to delete product");
      }
    } catch (err) {
      console.error(err);
      toast.error("Network error deleting product");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl text-warm-gray-900 mb-1">Products</h1>
          <p className="text-sm text-warm-gray-500 font-sans">
            Catalog list, edits, and stock controls.
          </p>
        </div>
        <Button
          onClick={openCreateModal}
          className="bg-warm-gray-900 hover:bg-terracotta-400 text-cream-50 font-sans text-sm rounded-xl py-5 px-5 gap-2 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Product
        </Button>
      </div>

      {/* Search toolbar */}
      <div className="relative max-w-md">
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name or SKU..."
          className="pl-10 bg-white border-cream-300 font-sans"
        />
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-warm-gray-400" />
      </div>

      {/* Grid / Table list */}
      <div className="overflow-x-auto bg-white rounded-2xl border border-cream-300">
        <table className="w-full text-left text-sm font-sans">
          <thead>
            <tr className="border-b border-cream-200 text-warm-gray-400 font-medium">
              <th className="p-4">Product Name</th>
              <th className="p-4">SKU</th>
              <th className="p-4">Category</th>
              <th className="p-4">Price</th>
              <th className="p-4">Stock</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-cream-100 text-warm-gray-700">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-8 text-center text-warm-gray-400">
                  No products found. Add one to get started!
                </td>
              </tr>
            ) : (
              filtered.map((prod) => (
                <tr key={prod.id} className="hover:bg-cream-50/50">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-12 rounded bg-gradient-to-br from-terracotta-50 to-cream-200 flex items-center justify-center shrink-0">
                        <span className="font-serif text-sm text-terracotta-300">
                          {prod.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <span className="font-medium text-warm-gray-900 block">{prod.name}</span>
                        {prod.isFeatured && (
                          <span className="text-[10px] bg-terracotta-50 text-terracotta-600 px-1.5 py-0.5 rounded font-sans uppercase font-bold tracking-wider">
                            Featured
                          </span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="p-4 font-mono text-xs">{prod.sku}</td>
                  <td className="p-4 text-warm-gray-500">{prod.categoryName}</td>
                  <td className="p-4 font-medium">{formatPrice(prod.price)}</td>
                  <td className="p-4">
                    <span className={prod.stockQuantity < 10 ? "text-red-500 font-bold" : "text-warm-gray-600"}>
                      {prod.stockQuantity}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="inline-flex gap-1">
                      <Button
                        variant="ghost"
                        onClick={() => openEditModal(prod)}
                        className="p-2 hover:bg-cream-200 text-warm-gray-600 hover:text-warm-gray-900"
                        aria-label="Edit product"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        onClick={() => handleDelete(prod.slug)}
                        className="p-2 hover:bg-red-50 text-warm-gray-400 hover:text-red-500"
                        aria-label="Delete product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Editor Dialog Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="max-w-2xl bg-cream-50 max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-serif text-2xl">
              {editingProduct ? "Edit Product" : "Create Product"}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSave} className="space-y-4 font-sans text-sm mt-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="prodName">Product Name</Label>
                <Input
                  id="prodName"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData((fd) => ({ ...fd, name: e.target.value }))}
                  className="bg-white border-cream-300 mt-1"
                />
              </div>
              <div>
                <Label htmlFor="prodSlug">Slug (Optional)</Label>
                <Input
                  id="prodSlug"
                  value={formData.slug}
                  onChange={(e) => setFormData((fd) => ({ ...fd, slug: e.target.value }))}
                  placeholder="e.g. skin-revitalizer"
                  className="bg-white border-cream-300 mt-1"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="prodSku">SKU</Label>
                <Input
                  id="prodSku"
                  required
                  value={formData.sku}
                  onChange={(e) => setFormData((fd) => ({ ...fd, sku: e.target.value }))}
                  placeholder="SK-SKIN-01"
                  className="bg-white border-cream-300 mt-1"
                />
              </div>
              <div>
                <Label htmlFor="prodPrice">Price ($)</Label>
                <Input
                  id="prodPrice"
                  type="number"
                  required
                  value={formData.price}
                  onChange={(e) => setFormData((fd) => ({ ...fd, price: Number(e.target.value) }))}
                  className="bg-white border-cream-300 mt-1"
                />
              </div>
              <div>
                <Label htmlFor="prodCompareAt">Compare Price ($)</Label>
                <Input
                  id="prodCompareAt"
                  type="number"
                  value={formData.compareAtPrice}
                  onChange={(e) => setFormData((fd) => ({ ...fd, compareAtPrice: e.target.value }))}
                  className="bg-white border-cream-300 mt-1"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="prodCategory">Category</Label>
                <Select
                  value={formData.categoryId}
                  onValueChange={(val) => setFormData((fd) => ({ ...fd, categoryId: val || "" }))}
                >
                  <SelectTrigger className="bg-white border-cream-300 mt-1 font-sans">
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent className="bg-cream-50 font-sans">
                    {categories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="prodStock">Stock Quantity</Label>
                <Input
                  id="prodStock"
                  type="number"
                  required
                  value={formData.stockQuantity}
                  onChange={(e) => setFormData((fd) => ({ ...fd, stockQuantity: Number(e.target.value) }))}
                  className="bg-white border-cream-300 mt-1"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="prodImage">Image URL</Label>
              <Input
                id="prodImage"
                required
                value={formData.imageInput}
                onChange={(e) => setFormData((fd) => ({ ...fd, imageInput: e.target.value }))}
                className="bg-white border-cream-300 mt-1"
              />
            </div>

            <div>
              <Label htmlFor="prodDesc">Description</Label>
              <textarea
                id="prodDesc"
                required
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData((fd) => ({ ...fd, description: e.target.value }))}
                className="w-full rounded-md border border-cream-300 bg-white px-3 py-2 mt-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta-400 resize-none font-sans"
              />
            </div>

            <div>
              <Label htmlFor="prodIngredients">Ingredients (Optional)</Label>
              <textarea
                id="prodIngredients"
                rows={2}
                value={formData.ingredients}
                onChange={(e) => setFormData((fd) => ({ ...fd, ingredients: e.target.value }))}
                className="w-full rounded-md border border-cream-300 bg-white px-3 py-2 mt-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta-400 resize-none font-sans"
              />
            </div>

            <div>
              <Label htmlFor="prodHow">How to Use (Optional)</Label>
              <textarea
                id="prodHow"
                rows={2}
                value={formData.howToUse}
                onChange={(e) => setFormData((fd) => ({ ...fd, howToUse: e.target.value }))}
                className="w-full rounded-md border border-cream-300 bg-white px-3 py-2 mt-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta-400 resize-none font-sans"
              />
            </div>

            <div className="flex gap-6 pt-2">
              <div className="flex items-center gap-2.5">
                <Checkbox
                  id="prodFeatured"
                  checked={formData.isFeatured}
                  onCheckedChange={(val) => setFormData((fd) => ({ ...fd, isFeatured: val as boolean }))}
                  className="border-warm-gray-300 data-[state=checked]:bg-terracotta-400 data-[state=checked]:border-terracotta-400"
                />
                <Label htmlFor="prodFeatured" className="cursor-pointer">
                  Feature this product on homepage
                </Label>
              </div>
              <div className="flex items-center gap-2.5">
                <Checkbox
                  id="prodActive"
                  checked={formData.isActive}
                  onCheckedChange={(val) => setFormData((fd) => ({ ...fd, isActive: val as boolean }))}
                  className="border-warm-gray-300 data-[state=checked]:bg-terracotta-400 data-[state=checked]:border-terracotta-400"
                />
                <Label htmlFor="prodActive" className="cursor-pointer">
                  Is active / visible in catalog
                </Label>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-cream-300">
              <Button
                type="button"
                variant="outline"
                onClick={() => setModalOpen(false)}
                className="border-warm-gray-300 text-warm-gray-700 hover:bg-cream-200"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-warm-gray-900 hover:bg-terracotta-400 text-cream-50 font-sans px-6"
              >
                Save Changes
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
