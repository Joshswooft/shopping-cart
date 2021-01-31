import { Test, TestingModule } from "@nestjs/testing";
import { SumDeliveryItems } from "./interfaces";
import { ShoppingCartService } from "./shopping-cart.service";

describe("ShoppingCartService", () => {
  let service: ShoppingCartService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShoppingCartService],
    }).compile();

    service = module.get<ShoppingCartService>(ShoppingCartService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should get the items that fit in a single shipment along with the number of days it will take", () => {
    const itemIds = [1, 2, 3, 4, 5, 6];
    const weights = [1, 8, 7, 4, 3, 2];
    const deliveryDays = [4, 1, 2, 10, 3, 5];

    const expectedOutput: SumDeliveryItems = {
      itemIds: [2, 1],
      sumDeliveryDays: 5,
    };

    const actual = service.getItemsInSingleDelivery(
      itemIds,
      weights,
      deliveryDays
    );

    console.log("actual: ", actual);

    expect(actual).toBe(expectedOutput);
  });
});
