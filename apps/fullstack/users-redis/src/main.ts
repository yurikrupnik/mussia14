import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.REDIS,
      options: {
        url:
          `redis://${process.env.REDIS_URL}:${process.env.REDIS_PORT}` ||
          'redis://localhost:6379',
      },
    }
  );

  app.listen().then(() => {
    console.log('Posts service is listening...');
  });
}

bootstrap();
