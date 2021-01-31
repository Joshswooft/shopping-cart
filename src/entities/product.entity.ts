import { Entity, PrimaryKey } from "@mikro-orm/core";

@Entity()
export class Product {
  @PrimaryKey()
  id: string;

  title: string;

  // other fields like categories, brands, attributes...
}
