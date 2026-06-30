import { Metadata } from "next";
import { prisma } from "@/lib/prisma";

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const product = await prisma.product.findUnique({
      where: { slug: params.slug },
      select: {
        name: true,
        description: true,
        images: true,
        price: true,
      },
    });

    if (!product) {
      return { title: "Product Not Found" };
    }

    return {
      title: product.name,
      description: product.description?.slice(0, 160) || `Shop ${product.name} at Ecilak`,
      openGraph: {
        title: `${product.name} — Ecilak`,
        description: product.description?.slice(0, 160) || `Shop ${product.name} at Ecilak`,
        images: product.images.length > 0 ? [{ url: product.images[0] }] : [],
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: product.name,
        description: product.description?.slice(0, 160) || `Shop ${product.name} at Ecilak`,
        images: product.images.length > 0 ? [product.images[0]] : [],
      },
    };
  } catch {
    return { title: "Product" };
  }
}

export default function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
