import { Collection } from "@mikro-orm/core";
import { CartItem } from "../../entities";

export interface ICart {
  id: number;
  items: Collection<CartItem, unknown>;
}
