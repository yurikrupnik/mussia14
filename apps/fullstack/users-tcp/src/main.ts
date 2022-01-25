import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
  transport: Transport.TCP,
  // options: {
  // host: 'localhost',
  // port: 3000,
  // },
}).then((app) => {
  app
    .listen()
    .then(() => {
      console.log('Users TCP service is listening...');
    })
    .catch((err) => {
      console.log('failed listening', err);
    });
});
