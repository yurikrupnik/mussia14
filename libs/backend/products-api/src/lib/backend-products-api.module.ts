import { Module } from '@nestjs/common';
import { BackendProductsApiController } from './backend-products-api.controller';
import { BackendProductsApiService } from './backend-products-api.service';

@Module({
  controllers: [BackendProductsApiController],
  providers: [BackendProductsApiService],
  exports: [BackendProductsApiService],
})
export class BackendProductsApiModule {}
