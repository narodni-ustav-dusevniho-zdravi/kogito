import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const PORT = process.env.CORE_API_PORT;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  await app.listen(PORT);

  console.log(`Core API: http://127.0.0.1:${PORT}/graphql`);
}

bootstrap();
