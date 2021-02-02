import { Body, Controller, Get, Logger, Post } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { CreateCartItemInput } from "../../src/inputs/cart/create-cart-item.input";
import { CreateCartItemCommand } from "./cqrs/commands/impl/create-cart-item.command";

@Controller("test")
export class GatewayController {
  logger = new Logger();
  constructor(private commandBus: CommandBus) {}

  @Get()
  test() {
    this.logger.debug("hit test endpoint");
    return "hello world";
  }

  @Post()
  async createItem(@Body() createCartItem: CreateCartItemInput) {
    this.logger.log(`creating cart item: ${createCartItem}`);
    return await this.commandBus.execute(
      new CreateCartItemCommand(createCartItem)
    );
  }
}
