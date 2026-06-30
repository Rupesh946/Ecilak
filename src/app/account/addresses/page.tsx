"use client";

import { useState } from "react";
import { MapPin, Plus, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const initialAddresses = [
  {
    id: "1",
    label: "Home",
    name: "Jane Doe",
    address: "123 Beauty Lane",
    city: "Los Angeles",
    state: "CA",
    zip: "90001",
    isDefault: true,
  },
  {
    id: "2",
    label: "Office",
    name: "Jane Doe",
    address: "456 Commerce Blvd, Suite 200",
    city: "Santa Monica",
    state: "CA",
    zip: "90401",
    isDefault: false,
  },
];

export default function AddressesPage() {
  const [addresses] = useState(initialAddresses);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-serif text-2xl text-warm-gray-900">
          Saved Addresses
        </h2>
        <Button
          variant="outline"
          className="border-warm-gray-300 text-warm-gray-600 font-sans text-sm gap-2 rounded-xl"
        >
          <Plus className="w-4 h-4" />
          Add Address
        </Button>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {addresses.map((addr) => (
          <div
            key={addr.id}
            className="bg-cream-50 rounded-2xl p-6 relative"
          >
            <div className="flex items-center gap-2 mb-3">
              <MapPin className="w-4 h-4 text-terracotta-400" />
              <span className="font-sans font-medium text-warm-gray-900 text-sm">
                {addr.label}
              </span>
              {addr.isDefault && (
                <Badge className="bg-terracotta-50 text-terracotta-600 text-[10px] font-sans border-0">
                  Default
                </Badge>
              )}
            </div>

            <div className="text-sm text-warm-gray-600 font-sans space-y-0.5 mb-4">
              <p>{addr.name}</p>
              <p>{addr.address}</p>
              <p>
                {addr.city}, {addr.state} {addr.zip}
              </p>
            </div>

            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="text-warm-gray-500 hover:text-terracotta-400 font-sans text-xs gap-1"
              >
                <Pencil className="w-3 h-3" />
                Edit
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-warm-gray-400 hover:text-red-500 font-sans text-xs gap-1"
              >
                <Trash2 className="w-3 h-3" />
                Remove
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
