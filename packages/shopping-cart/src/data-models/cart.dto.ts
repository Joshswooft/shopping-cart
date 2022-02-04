import { IsNumber, ValidateNested } from "class-validator";
import { CartItemDto } from "./cart-item.dto";

export class CartDto {
  @IsNumber()
  readonly id: number;

  @ValidateNested({ each: true })
  readonly items: CartItemDto[];
}
