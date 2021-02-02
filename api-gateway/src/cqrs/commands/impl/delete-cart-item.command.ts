import { ICommand } from "@nestjs/cqrs";
import { DeleteCartItemInput } from "../../../../../src/inputs";

export class DeleteCartItemCommand implements ICommand {
  constructor(public readonly input: DeleteCartItemInput) {}
}
