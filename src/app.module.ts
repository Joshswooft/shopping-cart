import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { HealthModule } from "./modules/health/health.module";
import { OrmModule } from "./modules/orm/orm.module";

@Module({
  // config module loads and parses .env for us
  imports: [OrmModule, ConfigModule.forRoot({ isGlobal: true }), HealthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
