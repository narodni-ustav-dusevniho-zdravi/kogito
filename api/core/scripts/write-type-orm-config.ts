import { config } from 'dotenv';

import fs = require('fs');

config({ path: `${__dirname}/../.env` });

fs.writeFileSync(
  'ormconfig.json',
  JSON.stringify(
    {
      type: 'mysql',
      entities: ['./libs/**/**.entity{.ts,.js}'],
      migrations: ['./migrations/*{.ts,.js}'],
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database:
        process.env.DB_NAME +
        (process.env.NODE_ENV === 'dev' ? '-migrate' : ''),
      synchronize: false,
      cli: {
        migrationsDir: './migrations/',
        entitiesDir: './libs/**/**.entity{.ts,.js}',
      },
    },
    null,
    2,
  ),
);
