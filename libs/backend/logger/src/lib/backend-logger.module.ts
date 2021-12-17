import { Module, Global } from '@nestjs/common';
import { LoggerModule, Logger } from 'nestjs-pino';

// @Global()
@Module({
  imports: [LoggerModule.forRoot({})],
  controllers: [],
  providers: [],
  exports: [],
})
export class BackendLoggerModule {}
