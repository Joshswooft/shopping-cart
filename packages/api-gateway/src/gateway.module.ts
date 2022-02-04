import { Module } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { GatewayController } from "./gateway.controller";
import { GatewayService } from "./gateway.service";
import { HealthModule } from "./health/health.module";
import { SHOPPING_CART_SERVICE } from "./service-names.constants";

@Module({
  imports: [
    HealthModule,
    //   configuration would not normally be defined here - instead an external config service
    // nest allows us to inject this by registering a custom provider - https://docs.nestjs.com/microservices/basics#client
    ClientsModule.register([
      {
        name: SHOPPING_CART_SERVICE,
        transport: Transport.TCP,
        options: {
          host: "127.0.0.1",
          port: 8000,
        },
      },
    ]),
  ],
  providers: [GatewayService, CommandBus],
  exports: [GatewayService],
  controllers: [GatewayController],
})
export class GatewayModule {}
