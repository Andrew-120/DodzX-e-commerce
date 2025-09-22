
export interface IOrder {
  id: string;
  paymentMethodType: "cash" | "card";
  isDelivered: boolean;
  isPaid: boolean;
  totalOrderPrice: number;
}

export interface IOrdersResponse {
  data: IOrder[];
  success: boolean;
  message: string;
}
