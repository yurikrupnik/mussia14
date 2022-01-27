import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import os from 'os';

const hostname = os.hostname();

NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
  transport: Transport.TCP,
  options: {
    host: process.env.HOST || '0.0.0.0',
    port: 3000,
  },
}).then((app) => {
  app
    .listen()
    .then(() => {
      console.log('os hostname', hostname);
      console.log('Users TCP service is listening...');
    })
    .catch((err) => {
      console.log('failed listening', err);
    });
});
