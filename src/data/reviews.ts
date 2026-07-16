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

export const testimonials: Review[] = [];

export const productReviews: Review[] = [];

export function getReviewsByProduct(productId: string): Review[] {
  return productReviews.filter((r) => r.productId === productId);
}
