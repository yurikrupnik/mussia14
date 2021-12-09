import { Logger, VersioningType, ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import morgan from 'morgan';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app/app.module';
import { MyLogger } from './app/a-utils/my-logger/my-logger.service';
import { RolesGuard } from './app/firebase/auth.guard';
import { HttpExceptionFilter } from './app/filters/HttpExceptionsFilter';
import admin from 'firebase-admin';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  const globalPrefix = 'api';
  // start custom config here
  app.enableCors();
  app.use(morgan('dev'));
  app.useLogger(new MyLogger());
  const configService = app.get(ConfigService);
  admin.initializeApp({
    credential: admin.credential.cert({
      private_key: configService.get('FIREBASE_PRIVATE_KEY'), // todo enum from those envs
      client_email: configService.get('FIREBASE_CLIENT_EMAIL'),
      project_id: configService.get('PROJECT_ID'),
    } as Partial<admin.ServiceAccount>),
    // databaseURL: 'https://mussia8-default-rtdb.europe-west1.firebasedatabase.app',
    databaseURL: configService.get('FIREBASE_DATABASE_URL'),
  });
  // // app.useGlobalGuards(RolesGuard);
  // const MONGO_URI = app.get('MONGO_URI');
  // console.log('MONGO_URI', MONGO_URI);

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

  const config = new DocumentBuilder()
    .setTitle('Mussia14 General API')
    .setDescription('General use cloud run api')
    .setVersion('1.0')
    // .addBearerAuth(
    //   { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
    //   'access-token'
    // )
    .addBearerAuth()
    // .addSecurity('firebase', {
    //   type: 'oauth2',
    //   // scheme: 'bearer',
    //   // bearerFormat: 'JWT',
    //   // description: 'my oauth2 first try',
    //   // name: 'stam',
    // })
    // .setBasePath('/')
    // .addBasicAuth()
    .addOAuth2()
    // .addSecurity('basic', {
    //   type: 'http',
    //   scheme: 'basic',
    // })

    // .addCookieAuth('optional-session-id')
    // .setBasePath('/api/users')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(globalPrefix, app, document, {
    swaggerOptions: {},
  });
  // const yamlString: string = yaml.stringify(document, {});
  // fs.writeFileSync('./swaggers/bi-service.yaml', yamlString);

  // fs.writeFileSync('./swagger-spec.yaml', JSON.stringify(document));

  const port = process.env.PORT || 3333;
  await app.listen(port, () => {
    Logger.log('Listening at http://localhost:' + port + '/' + globalPrefix);
  });
}

bootstrap();
