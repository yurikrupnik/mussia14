import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
  transport: Transport.TCP,
  options: {},
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
