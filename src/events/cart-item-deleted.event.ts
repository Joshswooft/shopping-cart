import { IEvent } from "@nestjs/cqrs";
import { ICartItem } from "../model-interfaces";

export class CartItemDeletedEvent implements IEvent {
  constructor(public readonly cartItem: ICartItem) {}
}
