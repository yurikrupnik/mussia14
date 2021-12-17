import { Module } from '@nestjs/common';
import { BackendEnvService } from './backend-env.service';

@Module({
  controllers: [],
  providers: [BackendEnvService],
  exports: [BackendEnvService],
})
export class BackendEnvModule {}
