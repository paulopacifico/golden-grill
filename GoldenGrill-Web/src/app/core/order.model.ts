export interface PlaceOrderRequest {
  items: PlaceOrderItemRequest[];
}

export interface PlaceOrderItemRequest {
  productId: number;
  productName: string;
  unitPrice: number;
  quantity: number;
}

export interface OrderResponse {
  id: number;
  createdAt: string;
  totalPrice: number;
  status: string;
  items: OrderItemResponse[];
}

export interface OrderItemResponse {
  productId: number;
  productName: string;
  unitPrice: number;
  quantity: number;
}
