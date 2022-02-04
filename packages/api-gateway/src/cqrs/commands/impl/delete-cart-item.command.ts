import { ICommand } from "@nestjs/cqrs";
import { DeleteCartItemInput } from "@carto/shopping-cart";

export class DeleteCartItemCommand implements ICommand {
  constructor(public readonly input: DeleteCartItemInput) {}
}
