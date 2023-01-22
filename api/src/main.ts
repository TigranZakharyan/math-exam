import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as morgan from 'morgan';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(morgan('dev'))
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
  }));
  app.enableCors();
  const config = new DocumentBuilder()
    .setTitle('Math-exam')
    .setDescription('The Math-exam API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(process.env.PORT || 8080);
}
bootstrap();
