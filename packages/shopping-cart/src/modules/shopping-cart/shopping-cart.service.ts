import { Collection } from "@mikro-orm/core";
import { EntityRepository } from "@mikro-orm/knex";
import { InjectRepository } from "@mikro-orm/nestjs";
import { Injectable } from "@nestjs/common";
import * as assert from "assert";
import { Cart, CartItem } from "../../entities";
import { CreateCartItemInput } from "../../inputs";
import { MCMKP } from "../../utils/knapsack";
import { SumDeliveryItems } from "./interfaces";

interface Item {
  id: number;
  weight: number;
  deliveryDay: number;
}

@Injectable()
export class ShoppingCartService {
  constructor(
    @InjectRepository(Cart) private readonly cartRepo: EntityRepository<Cart>,
    @InjectRepository(CartItem)
    private readonly cartItemRepo: EntityRepository<CartItem>
  ) {}

  async getById(id: number): Promise<Cart> {
    return this.cartRepo.findOneOrFail(id);
  }

  async add(item: CreateCartItemInput): Promise<Cart> {
    const { cartId, ...cartItem } = item;
    const cart = await this.getById(cartId);
    this.cartItemRepo.create(cartItem);
    this.cartItemRepo.persistAndFlush(cartItem);
    return cart;
  }

  private async findCartItem(cart: Cart, itemId: number): Promise<CartItem> {
    return this.cartItemRepo.findOneOrFail({ id: itemId, cart });
  }

  async remove(cartId: number, itemId: number): Promise<boolean> {
    const cart = await this.getById(cartId);
    if (cart.items.length == 0) {
      return false;
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
    return true;
  }

  async clear(cartId: number): Promise<Cart> {
    const cart = await this.getById(cartId);
    cart.items.removeAll();
    this.cartRepo.flush();
    return cart;
  }

  async findAllItems(cartId: number): Promise<Collection<CartItem>> {
    return (await this.cartRepo.findOneOrFail({ id: cartId })).items;
  }

  getItemsInSingleDelivery(
    ids: number[],
    weights: number[],
    deliveryDays: number[],
    capacity = 10
  ): SumDeliveryItems {
    try {
      const n = ids.length;
      assert.strictEqual(
        deliveryDays.length,
        weights.length,
        `delivery days: ${deliveryDays.length} not equal to weights: ${
          weights.length
        }`
      );

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

      const items: Item[] = [];
      for (let i = 0; i < ids.length; i++) {
        if (weights[i] > capacity || weights[i] < 1) {
          continue;
        }
        items.push({
          id: ids[i],
          deliveryDay: deliveryDays[i],
          weight: weights[i],
        });
      }

      const d = items.map((i) => i.deliveryDay);
      const w = items.map((i) => i.weight);

      assert.strictEqual(
        d.length,
        w.length,
        "Delivery days and weights are not the same size"
      );

      // TODO: we want to minimise delivery days not maximise
      const { matrix, value, itemIds } = MCMKP(d, w);

      // const itemsSelected = this.selectItemsFromKnapSack(matrix, items);

      return {
        itemIds,
        sumDeliveryDays: value,
      };
    } catch (e) {
      // TODO: replace with logger
      console.error(e);
    }
  }
}
