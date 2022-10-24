import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { QueryErrorFilter } from './filters/global-error.filter';
import {devFrontOrigin} from "./constants";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: devFrontOrigin,
    methods: ['GET', 'PUT', 'POST', 'DELETE']
  });

  app.useGlobalPipes(new ValidationPipe());
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new QueryErrorFilter(httpAdapter));

  await app.listen(3000);


}
bootstrap();
