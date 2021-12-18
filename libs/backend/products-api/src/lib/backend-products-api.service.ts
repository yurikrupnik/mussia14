import { Injectable } from '@nestjs/common';
import { ProductDocument, Product } from './entities/products.entity';
import { ProductRepository } from './products.repository';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { CrudApiService } from '@mussia14/backend/mongo-utils';

@Injectable()
export class BackendProductsApiService extends CrudApiService<
  ProductDocument,
  CreateProductDto,
  UpdateProductDto,
  ProductRepository
> {
  constructor(private readonly productRepository: ProductRepository) {
    super(productRepository);
  }

  static createMock(ojb?: Partial<Product>): Product {
    return Object.assign(
      {},
      {
        name: 'first name',
        description: 'description name',
      } as Product,
      ojb
    );
  }
}
