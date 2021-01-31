export interface ICartItem {
  id: number;
  title: string;
  amount: number;
  currency: string;
  quantity: number;
  productId: string;
}

export interface ICart {
  id: number;
  items: ICartItem[];
}

export interface SumDeliveryItems {
  itemIds: number[];
  sumDeliveryDays: number;
}
