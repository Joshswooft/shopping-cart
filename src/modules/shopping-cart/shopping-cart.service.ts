import { Collection } from "@mikro-orm/core";
import { EntityRepository } from "@mikro-orm/knex";
import { InjectRepository } from "@mikro-orm/nestjs";
import { Injectable, NotFoundException } from "@nestjs/common";
import { Cart, CartItem } from "../../entities";
import { SumDeliveryItems } from "./interfaces";

@Injectable()
export class ShoppingCartService {
  constructor(
    @InjectRepository(Cart) private readonly cartRepo: EntityRepository<Cart>
  ) {}

  async getById(id: Pick<Cart, "id">): Promise<Cart> {
    return this.cartRepo.findOneOrFail(id);
  }

  async add(cartId: Pick<Cart, "id">, item: CartItem): Promise<Cart> {
    const cart = await this.getById(cartId);
    cart.items.add(item);
    this.cartRepo.flush();
    return cart;
  }

  //   TODO: how to find single item in a collection
  private async findCartItem(
    cart: Cart,
    itemId: number
  ): Promise<Collection<CartItem, unknown>> {
    const itemCollection = await cart.items.init({ where: { id: itemId } });
    if (!itemCollection) {
      throw new NotFoundException("Cart item was not found");
    }
    return itemCollection.getItems();
  }

  async remove(cartId: Pick<Cart, "id">, itemId: number): Promise<Cart> {
    const cart = await this.getById(cartId);
    if (cart.items.length == 0) {
      return cart;
    }
    const item = await this.findCartItem(cart, itemId);
    if (item) {
      cart.items.remove(item);
      //   cart.items = [
      //     ...cart.items.slice(0, itemIndex),
      //     ...cart.items.slice(itemIndex + 1),
      //   ];
    }
    this.cartRepo.flush();
    return cart;
  }

  async clear(cartId: Pick<Cart, "id">): Promise<Cart> {
    const cart = await this.getById(cartId);
    cart.items = [];
    this.cartRepo.flush();
    return cart;
  }

  async findAllItems(cartId: number): Promise<Collection<CartItem>> {
    return (await this.cartRepo.findOneOrFail({ id: cartId })).items;
  }

  async getItemsInSingleDelivery(
    ids: number[],
    weights: number[],
    deliveryDays: number[],
    capacity = 10
  ): Promise<SumDeliveryItems> {
    //   TODO: knap sack problem
    // check for items > 9 and items < 1 as invalid

    const n = ids.length;
    if (
      capacity == 0 ||
      n == 0 ||
      weights.length == 0 ||
      deliveryDays.length == 0
    ) {
      return {
        itemIds: [],
        sumDeliveryDays: 0,
      };
    }

    let matrix;
    for (let i = 0; i < n; i++) {
      const arr: number[] = Array(weights.length).fill(-1);
      matrix[i].push(arr);
    }

    console.log("matrix: ", matrix);

    for (let i = 0; i <= n; i++) {
      for (let w = 0; w <= capacity; w++) {
        if (i == 0 || w == 0) {
          matrix[i][w] = 0;
        }
        if (weights[i - 1] <= w) {
          matrix[i][w] = Math.max(
            [i - 1] + matrix[i - 1][w - weights[i - 1]],
            matrix[i - 1][w]
          );
        } else {
          matrix[i][w] = matrix[i - 1][w];
        }
      }
    }

    const res: number = matrix[n][capacity];

    console.log("res: ", res);

    console.log("matrix after: ", matrix);

    const result: SumDeliveryItems = {
      itemIds: [1, 2],
      sumDeliveryDays: 1,
    };
    return Promise.resolve(result);
  }
}
