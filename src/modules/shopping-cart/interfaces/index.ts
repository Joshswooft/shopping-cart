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

export interface IRepository<T> {
  save: (cart: T) => T;
  delete: (cart: T) => T;
}

export type CartRepository = IRepository<ICart>;

export interface SumDeliveryItems {
  itemIds: number[];
  sumDeliveryDays: number;
}
