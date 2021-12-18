import { LoggerModule } from 'nestjs-pino';
import { Module, Logger } from '@nestjs/common';

@Module({
  imports: [LoggerModule.forRoot()],
  exports: [Logger],
  providers: [Logger],
})
export class BackendLoggerModule {}
