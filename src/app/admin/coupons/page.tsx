import prisma from "@/lib/prisma";
import { CouponsClient } from "./CouponsClient";

export const dynamic = "force-dynamic";

export default async function AdminCouponsPage() {
  const coupons = await prisma.coupon.findMany({
    orderBy: { createdAt: "desc" },
  });

  const couponsFormatted = coupons.map((c) => ({
    id: c.id,
    code: c.code,
    discountType: c.discountType,
    discountValue: c.discountValue,
    expiry: c.expiry ? c.expiry.toISOString() : null,
    usageLimit: c.usageLimit,
    usageCount: c.usageCount,
  }));

  return <CouponsClient initialCoupons={couponsFormatted} />;
}
