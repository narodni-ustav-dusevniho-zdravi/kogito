import { registerAs } from '@nestjs/config';

console.log(process.env);

export const AppConfiguration = registerAs('app', () => ({
  environment: process.env.NODE_ENV,

  fakeSMSSending: process.env.FAKE_SMS_SENDING ? process.env.FAKE_SMS_SENDING : false,

  neogateLogin: process.env.NEOGATE_LOGIN,
  neogatePassword: process.env.NEOGATE_PASSWORD,
  neogateSender: process.env.NEOGATE_SENDER,
}));

export const DatabaseConfiguration = registerAs('database', () => ({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
}));
