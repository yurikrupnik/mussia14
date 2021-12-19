import { Request } from 'express';
import { Body, Delete, Param, Query, Req, UseGuards } from '@nestjs/common';
import { BackendProductsApiService } from './backend-products-api.service';
import { ApiBearerAuth, OmitType, PartialType } from '@nestjs/swagger';
import { Product } from './entities/products.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { UserRoles } from '@mussia14/backend/users-api';
import { Auth, FirebaseAuthGuard } from '@mussia14/backend/guards';
import {
  ControllerDecorators,
  SwaggerDeleteByIdDecorators,
  SwaggerGetByIdDecorators,
  SwaggerPostDecorators,
  SwaggerPutDecorators,
  SwaggerGetDecorators,
} from '@mussia14/backend/decorators';

enum Projection {
  NAME = 'name',
  DESCRIPTION = 'description',
}

@ControllerDecorators('products')
export class BackendProductsApiController {
  constructor(private products: BackendProductsApiService) {}

  @SwaggerPostDecorators(Projection)
  post(@Body() createItemDto: CreateProductDto): Promise<Product> {
    return this.products.create(createItemDto);
  }

  // @Auth()
  // @UseGuards(FirebaseAuthGuard)
  // @ApiBearerAuth()
  // @UseGuards(AuthGuard('local'))
  @SwaggerGetDecorators(
    Projection,
    Product,
    PartialType(OmitType(Product, ['_id']))
  )
  getData(
    @Req() request: Request,
    @Query('projection') projection: Projection | [Projection] | null,
    @Query('limit') limit = 0
  ) {
    delete request.query.limit;
    delete request.query.projection;
    return this.products.findAll(request.query, projection, {
      limit,
      // page: Number(skip),
    });
  }

  @SwaggerGetByIdDecorators(Projection, Product)
  findById(
    @Query('projection') projection: Projection | [Projection] | null,
    @Param('id') id: string // did not work with id of type User['_id'] or custom new
  ) {
    return this.products.findById(id, projection);
  }

  @SwaggerPutDecorators(Product)
  update(@Body() body: UpdateProductDto, @Param('id') id: string) {
    return this.products.update(id, body);
  }

  @SwaggerDeleteByIdDecorators()
  delete(@Param('id') id: string): Promise<string> {
    return this.products.delete(id);
  }

  @Delete()
  deleteAll() {
    return this.products.deleteMany();
  }
}
