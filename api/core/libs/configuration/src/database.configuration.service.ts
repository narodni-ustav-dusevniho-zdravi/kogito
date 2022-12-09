import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

export const type = 'mysql';

const importAllFunctions = (
  requireContext: __WebpackModuleApi.RequireContext,
) =>
  requireContext
    .keys()
    .sort()
    .map((filename) => {
      const required = requireContext(filename);
      return Object.keys(required).reduce((result, exportedKey) => {
        const exported = required[exportedKey];
        if (typeof exported === 'function') {
          return result.concat(exported);
        }
        return result;
      }, [] as any);
    })
    .flat();

const entityContext = require.context('./../../', true, /\.entity\.ts$/);
const migrationsContext = require.context(
  './../../../migrations/',
  true,
  /\.ts$/,
);

@Injectable()
export class DatabaseConfigurationService {
  constructor(private configService: ConfigService) {}

  public generateTypeORMConfiguration(): TypeOrmModuleOptions {
    const databaseParams = this.configService.get('database');

    return {
      ...databaseParams,
      type: 'mysql',
      entities: importAllFunctions(entityContext),
      migrations: importAllFunctions(migrationsContext),
      synchronize: process.env.NODE_ENV === 'dev',
    };
  }
}
