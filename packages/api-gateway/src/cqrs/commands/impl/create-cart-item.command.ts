import { ICommand } from "@nestjs/cqrs";
import { CreateCartItemInput } from "@carto/shopping-cart";

export class CreateCartItemCommand implements ICommand {
  constructor(public readonly input: CreateCartItemInput) {}
}
