import { ICommand } from "@nestjs/cqrs";
import { CreateCartItemInput } from "../../../../../src/inputs";

export class CreateCartItemCommand implements ICommand {
  constructor(public readonly input: CreateCartItemInput) {}
}
