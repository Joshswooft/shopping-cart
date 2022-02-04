import { IsCurrency, IsNumber, IsPositive, IsString } from "class-validator";

export class CartItemDto {
  @IsNumber()
  readonly id: number;

  @IsString()
  readonly title: string;

  @IsPositive()
  readonly amount: number;

  @IsCurrency()
  readonly currency: string;

  @IsPositive()
  readonly quantity: number;
}
