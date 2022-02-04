import { Options } from "@mikro-orm/core";
import { PostgreSqlDriver } from "@mikro-orm/postgresql";
import { TsMorphMetadataProvider } from "@mikro-orm/reflection";
import { Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

export class MicroOrmConfigService extends ConfigService<Options> {
  constructor(private configService: ConfigService) {
    super();
  }
  logger = new Logger("MikroORM");

  config: Options = {
    tsNode: true,
    type: "postgresql",
    entities: ["dist/**/*.entity.js"],
    entitiesTs: ["src/**/*.entity.ts"],
    dbName: this.configService.get<string>("POSTGRES_DB"),
    port: 3307,
    debug: true,
    logger: this.logger.log.bind(this.logger),
    driver: PostgreSqlDriver,
    metadataProvider: TsMorphMetadataProvider,
  } as Options;
}
