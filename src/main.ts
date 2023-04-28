import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  const options = new DocumentBuilder()
    .setTitle('File service')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        description: 'Enter JWT token',
        scheme: 'bearer',
        name: 'Authorization',
        in: 'header',
        bearerFormat: 'JWT',
      },
      'JWT-auth',
    )
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document, {
    customCssUrl: process.env.SWAGGER_CSS,
  });

  await app.listen(4444);
}
bootstrap();
