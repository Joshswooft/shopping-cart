import { Options } from "@mikro-orm/core";
import { PostgreSqlDriver } from "@mikro-orm/postgresql";
import { TsMorphMetadataProvider } from "@mikro-orm/reflection";
import { Logger } from "@nestjs/common";
import "reflect-metadata";

const logger = new Logger("MikroORM");
const config = {
  tsNode: true,
  type: "postgresql",
  entities: ["dist/**/*.entity.js"],
  entitiesTs: ["src/**/*.entity.ts"],
  dbName: "mikro-orm-nest-ts",
  port: 3307,
  debug: true,
  logger: logger.log.bind(logger),
  driver: PostgreSqlDriver,
  metadataProvider: TsMorphMetadataProvider,
} as Options;

export default config;
