import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { ShoppingCartService } from "@carto/shopping-cart";
import { CreateCartItemCommand } from "../impl/create-cart-item.command";

@CommandHandler(CreateCartItemCommand)
export class CreateCartItemHandler
  implements ICommandHandler<CreateCartItemCommand> {
  constructor(
    private readonly shoppingCartService: ShoppingCartService,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: CreateCartItemCommand) {
    const { input } = command;
    const cartItem = this.publisher.mergeObjectContext(
      await this.shoppingCartService.add(input)
    );

    cartItem.commit();
  }
}
