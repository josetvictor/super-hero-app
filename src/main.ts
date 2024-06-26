import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
  }));

  const config = new DocumentBuilder()
    .setTitle('Super Hero API')
    .setDescription('The super hero API description')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('auth')
    .addTag('Users')
    .addTag('Heros')
    .addTag('Attributes')
    .addTag('Powers')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
