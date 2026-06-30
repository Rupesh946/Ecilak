/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
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
import { toast } from "sonner";

interface CouponRow {
  id: string;
  code: string;
  discountType: "PERCENTAGE" | "FIXED";
  discountValue: number;
  expiry: string | null;
  usageLimit: number | null;
  usageCount: number;
}

interface CouponsClientProps {
  initialCoupons: CouponRow[];
}

export function CouponsClient({ initialCoupons }: CouponsClientProps) {
  const [coupons, setCoupons] = useState<CouponRow[]>(initialCoupons);
  const [modalOpen, setModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    code: "",
    discountType: "PERCENTAGE" as "PERCENTAGE" | "FIXED",
    discountValue: 10,
    expiry: "",
    usageLimit: "" as string | number,
  });

  const openCreateModal = () => {
    setFormData({
      code: "",
      discountType: "PERCENTAGE",
      discountValue: 10,
      expiry: "",
      usageLimit: "",
    });
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      code: formData.code.toUpperCase().trim(),
      discountType: formData.discountType,
      discountValue: Number(formData.discountValue),
      expiry: formData.expiry ? new Date(formData.expiry).toISOString() : null,
      usageLimit: formData.usageLimit ? Number(formData.usageLimit) : null,
    };

    try {
      const res = await fetch("/api/coupons", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Failed to create coupon");
      } else {
        toast.success("Coupon created successfully!");
        setModalOpen(false);

        // Fetch refreshed list
        const refreshRes = await fetch("/api/coupons");
        if (refreshRes.ok) {
          const refreshData = await refreshRes.json();
          setCoupons(refreshData);
        }
      }
    } catch (err) {
      console.error(err);
      toast.error("Network error creating coupon");
    }
  };

  const isExpired = (expiryStr: string | null) => {
    if (!expiryStr) return false;
    return new Date(expiryStr) < new Date();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl text-warm-gray-900 mb-1">Coupons</h1>
          <p className="text-sm text-warm-gray-500 font-sans">
            Promotional codes, campaign discounts, and limits.
          </p>
        </div>
        <Button
          onClick={openCreateModal}
          className="bg-warm-gray-900 hover:bg-terracotta-400 text-cream-50 font-sans text-sm rounded-xl py-5 px-5 gap-2 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Coupon
        </Button>
      </div>

      {/* Grid / Table list */}
      <div className="overflow-x-auto bg-white rounded-2xl border border-cream-300">
        <table className="w-full text-left text-sm font-sans">
          <thead>
            <tr className="border-b border-cream-200 text-warm-gray-400 font-medium">
              <th className="p-4">Coupon Code</th>
              <th className="p-4">Discount Type</th>
              <th className="p-4">Value</th>
              <th className="p-4">Expiry Date</th>
              <th className="p-4">Usage Track</th>
              <th className="p-4 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-cream-100 text-warm-gray-700">
            {coupons.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-8 text-center text-warm-gray-400">
                  No coupons found. Create one to reward customers!
                </td>
              </tr>
            ) : (
              coupons.map((c) => {
                const expired = isExpired(c.expiry);
                const limitReached = c.usageLimit !== null && c.usageCount >= c.usageLimit;
                const active = !expired && !limitReached;

                return (
                  <tr key={c.id} className="hover:bg-cream-50/50">
                    <td className="p-4 font-mono text-sm font-bold text-warm-gray-900">
                      {c.code}
                    </td>
                    <td className="p-4 text-warm-gray-500">
                      {c.discountType === "PERCENTAGE" ? "Percentage Off" : "Fixed Discount"}
                    </td>
                    <td className="p-4 font-medium text-warm-gray-900">
                      {c.discountType === "PERCENTAGE" ? `${c.discountValue}%` : `$${c.discountValue}`}
                    </td>
                    <td className="p-4 text-warm-gray-400">
                      {c.expiry
                        ? new Date(c.expiry).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })
                        : "Never Expires"}
                    </td>
                    <td className="p-4 text-warm-gray-600">
                      {c.usageCount} / {c.usageLimit || "∞"}
                    </td>
                    <td className="p-4 text-right">
                      <span
                        className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          active
                            ? "bg-green-50 text-green-700"
                            : expired
                            ? "bg-red-50 text-red-700"
                            : "bg-amber-50 text-amber-700"
                        }`}
                      >
                        {active ? "Active" : expired ? "Expired" : "Limit Reached"}
                      </span>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Coupon Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="max-w-md bg-cream-50">
          <DialogHeader>
            <DialogTitle className="font-serif text-2xl">Create Coupon</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSave} className="space-y-4 font-sans text-sm mt-4">
            <div>
              <Label htmlFor="couponCodeInput">Coupon Code</Label>
              <Input
                id="couponCodeInput"
                required
                value={formData.code}
                onChange={(e) => setFormData((fd) => ({ ...fd, code: e.target.value.toUpperCase() }))}
                placeholder="e.g. SUMMER20"
                className="bg-white border-cream-300 mt-1 uppercase"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="discountType">Discount Type</Label>
                <Select
                  value={formData.discountType}
                  onValueChange={(val) =>
                    setFormData((fd) => ({ ...fd, discountType: val as "PERCENTAGE" | "FIXED" }))
                  }
                >
                  <SelectTrigger className="bg-white border-cream-300 mt-1">
                    <SelectValue placeholder="Discount Type" />
                  </SelectTrigger>
                  <SelectContent className="bg-cream-50 font-sans">
                    <SelectItem value="PERCENTAGE">Percentage (%)</SelectItem>
                    <SelectItem value="FIXED">Fixed Amount ($)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="discountValue">Value</Label>
                <Input
                  id="discountValue"
                  type="number"
                  required
                  value={formData.discountValue}
                  onChange={(e) =>
                    setFormData((fd) => ({ ...fd, discountValue: Number(e.target.value) }))
                  }
                  className="bg-white border-cream-300 mt-1"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="expiryDate">Expiry Date (Optional)</Label>
              <Input
                id="expiryDate"
                type="date"
                value={formData.expiry}
                onChange={(e) => setFormData((fd) => ({ ...fd, expiry: e.target.value }))}
                className="bg-white border-cream-300 mt-1"
              />
            </div>

            <div>
              <Label htmlFor="usageLimit">Usage Limit (Optional)</Label>
              <Input
                id="usageLimit"
                type="number"
                value={formData.usageLimit}
                onChange={(e) => setFormData((fd) => ({ ...fd, usageLimit: e.target.value }))}
                placeholder="Leave blank for unlimited"
                className="bg-white border-cream-300 mt-1"
              />
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
                Create
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
