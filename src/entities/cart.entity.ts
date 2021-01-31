import { Collection, Entity, OneToMany, PrimaryKey } from "@mikro-orm/core";
import { CartItem } from "./cart-item.entity";

@Entity()
export class Cart {
  @PrimaryKey()
  id: number;

  @OneToMany(() => CartItem, (cartItem) => cartItem.cart)
  items = new Collection<CartItem>(this);
}
