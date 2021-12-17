import { Controller } from '@nestjs/common';
import { BackendProductsApiService } from './backend-products-api.service';

@Controller('backend-products-api')
export class BackendProductsApiController {
  constructor(private backendProductsApiService: BackendProductsApiService) {}
}
