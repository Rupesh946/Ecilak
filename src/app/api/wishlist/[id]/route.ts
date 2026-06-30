import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }

    const productId = params.id;

    // Delete item
    await prisma.wishlist.delete({
      where: {
        userId_productId: {
          userId: session.user.id,
          productId,
        },
      },
    });

    return NextResponse.json({ message: "Item removed from wishlist" });
  } catch (error) {
    console.error("Wishlist DELETE error:", error);
    return NextResponse.json({ error: "Failed to remove item" }, { status: 500 });
  }
}
