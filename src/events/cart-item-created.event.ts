import { IEvent } from "@nestjs/cqrs";
import { CartItemDto } from "../data-models";

export class CartItemCreatedEvent implements IEvent {
  constructor(public readonly cartItem: CartItemDto) {}
}
