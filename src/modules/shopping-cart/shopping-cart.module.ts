import { Module } from "@nestjs/common";
import { ShoppingCartController } from "./shopping-cart.controller";
import { ShoppingCartService } from "./shopping-cart.service";

@Module({
  providers: [ShoppingCartService],
  controllers: [ShoppingCartController],
})
export class ShoppingCartModule {}
