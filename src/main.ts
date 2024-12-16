import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  console.log(process.env.NODE_ENV)
  const port = process.env.PORT ?? 3084
  console.log(`Aplicação rodando na porta ${port}`)
  console.log(process.env.BD_HOST);
  const app = await NestFactory.create(AppModule);
  app.enableCors()
  await app.listen(port);
  console.log(`Aplicação rodando na porta ${port}`)
}
bootstrap();
