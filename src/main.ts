import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // for swagger (UI)
  const config = new DocumentBuilder()
    .setTitle('Books & Authors API')
    .setDescription('The API for managing books and authors')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // UI will be at http://localhost:3000/api


  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
