import { Options } from "@mikro-orm/core";
import { PostgreSqlDriver } from "@mikro-orm/postgresql";
import { TsMorphMetadataProvider } from "@mikro-orm/reflection";
import { Logger } from "@nestjs/common";
import * as dotenv from "dotenv";
import "reflect-metadata";
import { findEnv } from "@carto/common/dist"

// TODO: we should create this configuration using nest config service from @nestjs/config
dotenv.config({path: findEnv() });

const logger = new Logger("MikroORM");
const config = {
  tsNode: true,
  type: "postgresql",
  entities: ["dist/**/*.entity.js"],
  entitiesTs: ["src/**/*.entity.ts"],
  dbName: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  user: process.env.POSTGRES_USER,
  port: 5432,
  debug: true,
  logger: logger.log.bind(logger),
  driver: PostgreSqlDriver,
  metadataProvider: TsMorphMetadataProvider,
} as Options;

export default config;
