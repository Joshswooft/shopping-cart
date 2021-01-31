import {
  Entity,
  Index,
  ManyToOne,
  PrimaryKey,
  Property,
} from "@mikro-orm/core";
import { Cart } from "./cart.entity";

@Entity()
@Index({ properties: ["title"] })
export class CartItem {
  @PrimaryKey()
  id: number;

  @Property()
  title: string;

  @Property()
  amount: number;

  @Property()
  currency: string;

  @Property()
  quantity: number;

  @ManyToOne()
  cart!: Cart;
}
