export type OrderItem = {
  name: string;
  price: number;
  quantity: number;
};

export type Order = {
  orderNumber: string;
  timestamp: string;
  items: OrderItem[];
  subtotal: number;
  discountPercent: number;
  discountAmount: number;
  total: number;
  paymentMode: "UPI" | "CASH";
  customerPhone?: string;
  customerName?: string;
  source: "WEBSITE" | "COUNTER";
};

export type ApiOrderResponse = {
  success: boolean;
  orderNumber?: string;
  message?: string;
};

export type FetchOrderResponse = {
  success: boolean;
  order?: Order;
  message?: string;
};
