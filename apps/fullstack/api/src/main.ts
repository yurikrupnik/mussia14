import { VersioningType, ValidationPipe, Logger } from '@nestjs/common';
import helmet from 'helmet';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { HttpExceptionFilter } from '@mussia14/backend/filters';
import admin from 'firebase-admin';
import { ConfigService } from '@nestjs/config';
import { BackendDocsModule } from '@mussia14/backend/docs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  const globalPrefix = 'api';
  // start custom config here
  app.enableCors();

  app.useLogger(app.get(Logger));
  const configService = app.get(ConfigService);
  admin.initializeApp({
    credential: admin.credential.cert({
      private_key: configService.get('FIREBASE_PRIVATE_KEY'), // todo enum from those envs
      client_email: configService.get('FIREBASE_CLIENT_EMAIL'),
      project_id: configService.get('PROJECT_ID'),
    } as Partial<admin.ServiceAccount>),
    databaseURL: configService.get('FIREBASE_DATABASE_URL'),
  });

  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    })
  );
  app.enableVersioning({
    type: VersioningType.URI,
  });

  app.use(helmet());
  app.use(helmet.noSniff());
  app.use(helmet.hidePoweredBy());
  app.use(helmet.contentSecurityPolicy());
  app.setGlobalPrefix(globalPrefix);
  app.enableShutdownHooks();

  // end custom config here

  const docs = app.get(BackendDocsModule);
  docs.setup(app, globalPrefix, 'Mussia14 API', 'General use cloud run api');

  const logger = app.get(Logger);
  const port = configService.get('PORT');
  await app.listen(port, () => {
    logger.log('Listening at http://localhost:' + port + '/' + globalPrefix);
  });
}

bootstrap();
