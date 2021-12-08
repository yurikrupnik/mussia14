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

admin.initializeApp({
  // projectId: 'mussia14',
  credential: admin.credential.cert({
    private_key:
      '-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCNOOxKKTQnEzLv\nm+adDn475SH3ujfcTIGhFvjKQP6MOauR6yDKsxpMXoF8TbTir2qzdM9Au/55dstN\n/pw5tmR+6hNCnDKlxPtG2T/9igMWOMIV7oyIGVCx3x+13TpY/HCFP7KoB4TKJK+X\nA0rg0PUhwFlYSd07L1cCuOKYsBgnLeT1ldYOnYTFJOkUVJvJCLr9SjeCCdY0/7oi\nXwAkqZ9iLQrkAumyjqqPkbcBHNj1QxLdSCSQBbm4dpl0s5WLH4TrEBYR6H2uoXJt\nSjmG1DtpOwMhRSyM1WRg1yBa3AeFnLzxU0MJHSUPP8aX6yYPfXwFQbLnpDKkd9Pu\ni8PdveWvAgMBAAECggEAKGl7pJU56VyjHNIeIh99nCIroDpXteDmz3RFaYtDzFjM\ncgs47QhnpCb/ItURyDSucgAhNsMVRSjrcLxFdHZvN6pALLWKAMnnphSRLTqLO5au\nY5xJ9sBXyS6yYlaWVdSXVmot88uDAl2RKcO1b7QcEbZ7Wrp4ZnFbktnZbhwmLT+W\nDG4gBUmJa/frlUBMGY7uUAGZCzRimrbmZxTzpTHfy9g4wsRFkmQGxhz8fVTmkuJi\nB5XAOlSxiedX9e5rvmAIPszKiegWpspVYH8VQ8pa6/UXP5aFrPgrr5XcKsMcDZ1K\nyR05TWCEEaa28L0PRCgII6UOxuei3mf/PvG8l0drAQKBgQC/d92izijKwbMaReAr\nWkXfZeedPEnK9HS9dram3Q1EHLmRSw1cORyJfAA3E3AvU6+8nx1OTyQI9UEWnkhT\n3z18wUpuc0B0YJEKeUp4ZWn/RZ6J9Quo5ZvixcfI7PU1YeRtOQeobbip3NW0TtFb\nCsX0kZV/nliWrsnI9/svwKSjQQKBgQC80cbFz4u0SXrutIVK7Fu3ipwOey+LD0WL\nsyyVh9swhaKWhdyfUfJtYWEIUa+OzB/egHTvGJmsMfTdUoz6PdYXy5Htvv/UB2xh\nXL8ABQ35xDjPDUvC44/EmvT458FTXzCs5GLUzd/OhE5hWzOCp5N17draClV+xkYW\nAdObxXZ87wKBgA+JZHy/iePaD/SD0wrxilX0aPUDXWGQsKBnL68epOLwCcbWdkET\niVNGsqXFeAb/HXWK28/s8Bmh/SQet/PGW7Dx5l5MD+DhrSNScE6QvCcwuQqszcNo\nzlt6fRm60LMCPIz4YbyzGpb+CoFVG/vtRd7wqVbvvHSNvmYGaWWYlkOBAoGAFm3w\n58SMuuDTqpFlGA5VosrjWNEHR8SLpVmmXSjjP7NQKgNCvuY0HwwnQ564dQUIcBzg\nRxqr/ol8peHNf1hjGzaCYjSDHUO4eyRSSAVRsK6/dNEGg+MWS+uAWCTnkSjIlnEW\n0GKYSGbtDKGRz95qJOMZUTdTCpkw8CJNab6eIZ8CgYAu01SkhcsyxP+gcElwZVeC\nVSprkbbgJ+/JBtS+tSyGB/xaF22qzaVn+nDxiWzvZMzXq+SBumaROyZpOgAhCoaa\nRjqwXUb/IRnVwN3c9BXvyqq6X6vlCVyRO6cRT09FbDxPPJIiaHRaBXBDuskUK3co\nCbR66v9JqKU8zHqbmrvvSQ==\n-----END PRIVATE KEY-----\n',
    // private_key: process.env.FIREBASE_PRIVATE_KEY,
    // private_key: process.env.FIREBASE_PRIVATE_KEY,
    // client_email: process.env.FIREBASE_CLIENT_EMAIL,
    client_email: 'firebase-adminsdk-l15ce@mussia14.iam.gserviceaccount.com',
    // project_id: process.env.FIREBASE_PROJECT_ID,
    project_id: 'mussia14',
  } as Partial<admin.ServiceAccount>),
  // databaseURL: 'https://mussia8-default-rtdb.europe-west1.firebasedatabase.app',
  // databaseURL: process.env.FIREBASE_DATABASE_URL,
});

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  const globalPrefix = 'api';
  // start custom config here
  app.enableCors();
  app.use(morgan('dev'));
  app.useLogger(new MyLogger());
  // app.useGlobalGuards(RolesGuard);
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
