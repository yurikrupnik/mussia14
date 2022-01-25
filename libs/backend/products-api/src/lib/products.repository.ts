import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EntityRepository } from '@mussia14/backend/mongo-utils';
import { Product, ProductDocument } from './entities/products.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductRepository extends EntityRepository<
  ProductDocument,
  CreateProductDto,
  UpdateProductDto
> {
  constructor(@InjectModel(Product.name) userModel: Model<ProductDocument>) {
    super(userModel);
  }
}
