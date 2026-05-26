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
  orderType?: string;
  address?: string;
  note?: string;
  source: "WEBSITE" | "COUNTER";
  rowIndex?: number;
};

export type OrderListItem = {
  orderNumber: string;
  timestamp: string;
  source: "WEBSITE" | "COUNTER";
  total: number;
  paymentMode: "UPI" | "CASH";
  customerName: string;
  customerPhone: string;
  rowIndex: number;
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
