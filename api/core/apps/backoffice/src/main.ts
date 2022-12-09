import { NestFactory } from '@nestjs/core';
import { BackofficeModule } from './backoffice.module';

const PORT = process.env.BACKOFFICE_API_PORT;

async function bootstrap() {
  const app = await NestFactory.create(BackofficeModule);

  app.enableCors();

  await app.listen(PORT);

  console.log(`Backoffice API: http://127.0.0.1:${PORT}/graphql`);
}

bootstrap();
