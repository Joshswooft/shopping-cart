import { Body, Controller, Get, Logger, Post } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
// TODO: when i dockerize this, it can't find the below import and thats because its in a seperate docker container
// instead we should treat it as a seperate package like how we do with lerna.
import { CreateCartItemInput } from "@carto/shopping-cart";
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
