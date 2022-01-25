import { OmitType } from '@nestjs/swagger';
import { Product } from '../entities/products.entity';

export class CreateProductDto extends OmitType(Product, ['_id'] as const) {}
