import { Module } from '@nestjs/common';
import { CoService } from './co/co.service';
import { ShoppingCartController } from './shopping-cart.controller';
import { ShoppingCartService } from './shopping-cart.service';

@Module({
  providers: [CoService, ShoppingCartService],
  controllers: [ShoppingCartController]
})
export class ShoppingCartModule {}
