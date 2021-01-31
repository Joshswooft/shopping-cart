import {
  Entity,
  Index,
  ManyToOne,
  OneToOne,
  PrimaryKey,
  Property,
} from "@mikro-orm/core";
import { Cart } from "./cart.entity";
import { Product } from "./product.entity";

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

  @OneToOne(() => Product, (product) => product.id)
  product: string;

  @ManyToOne()
  cart!: Cart;
}
