import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from '@mussia14/backend/users-api';
import { BackendDocsModule } from '@mussia14/backend/docs';

@Module({
  imports: [
    BackendDocsModule,
    ConfigModule.forRoot({
      isGlobal: true,
      // cache: true,
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
