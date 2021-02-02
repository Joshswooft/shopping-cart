import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { SHOPPING_CART_SERVICE } from "./service-names.constants";

@Injectable()
export class GatewayService {
  constructor(@Inject(SHOPPING_CART_SERVICE) private client: ClientProxy) {}
}
