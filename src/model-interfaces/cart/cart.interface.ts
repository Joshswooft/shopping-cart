import { Collection } from "@mikro-orm/core";
import { CartItem } from "src/entities";

export interface ICart {
  id: number;
  items: Collection<CartItem, unknown>;
}
