import { MapPin, Plus, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function AddressesPage() {
  const session = await getServerSession(authOptions);
  
  const addresses = session?.user?.id ? await prisma.address.findMany({
    where: { userId: session.user.id },
    orderBy: { isDefault: 'desc' }
  }) : [];

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

      {addresses.length === 0 ? (
        <p className="text-warm-gray-500 font-sans text-center py-12">
          You haven&apos;t saved any addresses yet.
        </p>
      ) : (
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
                {addr.phone && <p>{addr.phone}</p>}
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
      )}
    </div>
  );
}
