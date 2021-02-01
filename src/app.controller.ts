import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { AppService } from "./app.service";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // TODO
  @EventPattern("item_added")
  async handleItemAdded(data: Record<string, unknown>): Promise<string> {
    return this.appService.getHello();
  }
}
