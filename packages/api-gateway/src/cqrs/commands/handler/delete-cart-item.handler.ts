import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { ShoppingCartService } from "@carto/shopping-cart";
import { DeleteCartItemCommand } from "../impl/delete-cart-item.command";

@CommandHandler(DeleteCartItemCommand)
export class DeleteCartItemHandler
  implements ICommandHandler<DeleteCartItemCommand> {
  constructor(private readonly shoppingCartService: ShoppingCartService) {}

  async execute(command: DeleteCartItemCommand) {
    const {
      input: { cartId, itemId },
    } = command;
    // const hero = this.repository.findOneById(+heroId);
    await this.shoppingCartService.remove(cartId, itemId);
    // hero.killEnemy(dragonId);
    // await this.repository.persist(hero);
  }
}
