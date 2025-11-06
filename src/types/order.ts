import type { CheckoutFormData } from './cart';

export interface Order {
  id: string;
  items: Array<{
    productId: number;
    title: string;
    price: number;
    quantity: number;
  }>;
  total: number;
  shippingInfo: Partial<CheckoutFormData>;
  createdAt: string;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
}