import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Module } from "@nestjs/common";
import config from "../../config/mikro-orm.config";
// import { ORM_CONFIG_OPTIONS } from "./orm-config.constants";
// import { MicroOrmConfigService } from "./orm-config.service";

@Module({
  imports: [MikroOrmModule.forRoot(config)],
  exports: [MikroOrmModule],
})
export class OrmModule {
  /* what im trying to do here:

    1. read configuration from the config module into my orm-config.service
    2. Use the orm-config in my MikroOrmModule
    3. Export the MikroOrmModule

  */
  // static register(options: ConfigModuleOptions): DynamicModule {
  //   return {
  //     module: OrmModule,
  //     providers: [
  //       {
  //         provide: ORM_CONFIG_OPTIONS,
  //         useValue: options,
  //       },
  //       MicroOrmConfigService,
  //     ],
  //     exports: [MikroOrmModule],
  //   };
  // }
}
