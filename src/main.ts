import { NestFactory } from "@nestjs/core";
import { Transport } from "@nestjs/microservices";
import { AppModule } from "./app.module";

async function bootstrap() {
  // TODO: define other nats connection options
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.NATS,
    options: {
      url: "nats://localhost:4222",
      queue: "cart_queue",
    },
  });
  app.listen(() => console.log("Microservice is listening"));
}
bootstrap();
