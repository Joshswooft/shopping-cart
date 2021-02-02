import { Collection, Entity, OneToMany, PrimaryKey } from "@mikro-orm/core";
import { AggregateRoot } from "@nestjs/cqrs";
import { ICart } from "../model-interfaces";
import { CartItem } from "./cart-item.entity";

@Entity()
export class Cart extends AggregateRoot implements ICart {
  @PrimaryKey()
  id: number;

  @OneToMany(() => CartItem, (cartItem) => cartItem.cart)
  items = new Collection<CartItem>(this);
}
