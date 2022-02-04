import { EntityRepository } from "@mikro-orm/knex";
import { getRepositoryToken } from "@mikro-orm/nestjs";
import { Test, TestingModule } from "@nestjs/testing";
import { mock } from "ts-mockito";
import { Cart, CartItem } from "../../entities";
import { ShoppingCartService } from "./shopping-cart.service";

describe("ShoppingCartService", () => {
  let service: ShoppingCartService;

  beforeEach(async () => {
    const cartRepoMock: EntityRepository<Cart> = mock<EntityRepository<Cart>>(
      EntityRepository
    );
    const cartItemRepoMock: EntityRepository<CartItem> = mock<
      EntityRepository<CartItem>
    >(EntityRepository);
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ShoppingCartService,
        {
          provide: getRepositoryToken(Cart),
          useValue: cartRepoMock,
        },
        {
          provide: getRepositoryToken(CartItem),
          useValue: cartItemRepoMock,
        },
      ],
    }).compile();

    service = module.get<ShoppingCartService>(ShoppingCartService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should get the items that fit in a single shipment along with the sum of days it will take", () => {
    // aim is to min delivery days AND fit as many items in the box as possible min: delivery, max: weight

    const testCases = [
      {
        inputs: {
          itemIds: [1, 2, 3, 4, 5, 6],
          weights: [1, 8, 7, 4, 3, 2],
          deliveryDays: [4, 1, 2, 10, 3, 5],
        },
        expected: {
          itemIds: [2, 1],
          sumDeliveryDays: 5,
        },
      },
    ];

    for (let i = 0; i < testCases.length; i++) {
      const input = testCases[i].inputs;
      const actual = service.getItemsInSingleDelivery(
        input.itemIds,
        input.weights,
        input.deliveryDays
      );
      expect(actual).toBe(testCases[i].expected);
    }
  });
});
