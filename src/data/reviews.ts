export interface Review {
  id: string;
  productId?: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  body: string;
  verified: boolean;
  helpful: number;
}

export const testimonials: Review[] = [
  {
    id: "1",
    author: "Jane Doe",
    rating: 5,
    date: "2024-01-01",
    title: "Amazing",
    body: "Absolutely love the skincare products!",
    verified: true,
    helpful: 12
  }
];

export const productReviews: Review[] = [];

export function getReviewsByProduct(productId: string): Review[] {
  return productReviews.filter((r) => r.productId === productId);
}
