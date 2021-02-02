import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { GatewayModule } from "./gateway.module";

const logger = new Logger();

async function bootstrap() {
  const app = await NestFactory.create(GatewayModule);

  app.useLogger(logger);
  app.listen(8000);
}
bootstrap();
