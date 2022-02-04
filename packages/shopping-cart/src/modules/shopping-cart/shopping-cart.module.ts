import { Module } from "@nestjs/common";
import { ShoppingCartService } from "./shopping-cart.service";

@Module({
  providers: [ShoppingCartService],
})
export class ShoppingCartModule {}
