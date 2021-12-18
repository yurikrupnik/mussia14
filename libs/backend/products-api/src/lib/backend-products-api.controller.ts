import { Controller, Get, Query, Req } from '@nestjs/common';
import { BackendProductsApiService } from './backend-products-api.service';
import {
  ApiOkResponse,
  ApiQuery,
  ApiTags,
  OmitType,
  PartialType,
} from '@nestjs/swagger';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { Product } from '@mussia14/backend/products-api';
import { Request } from 'express';

enum Projection {
  NAME,
  DESCRIPTION,
}

@Controller('products')
@ApiTags('Products')
export class BackendProductsApiController {
  constructor(private products: BackendProductsApiService) {}

  gets() {
    Promise.resolve({ aris: 'sss' });
  }

  @Get()
  @ApiQuery({
    description: 'A list of projections for mongodb queries',
    name: 'search',
    type: PartialType(OmitType(Product, ['_id'])),
  })
  @ApiQuery({
    description: 'Limit of items to fetch',
    name: 'limit',
    required: false,
    type: Number,
    example: 0,
    examples: {
      low: {
        value: 10,
        description: 'ten value',
        summary: 'A sample limit value 10',
      },
      high: {
        value: 50,
        description: 'fifty value',
        summary: 'A sample limit value 50',
      },
    },
  })
  @ApiQuery({
    description: 'A list of projections for mongodb queries',
    name: 'projection',
    required: false,
    isArray: true,
    enum: Projection,
  })
  @ApiOkResponse({
    description: 'The resources has been successfully returned',
    type: Product,
    isArray: true,
  })
  getData(
    @Req() request: Request,
    // @Query('pagination') pagination: PaginationParams,
    @Query('projection') projection: Projection | [Projection] | null,
    // new DefaultValuePipe(0), ParseIntPipe - as global
    @Query('limit') limit = 0
    // @Query('email') email: string,
    // @Query('search') search: Partial<Omit<User, '_id' | 'password'>>
  ) {
    delete request.query.limit;
    delete request.query.projection;

    console.log('query', request.query);
    // console.log('search', search);
    // console.log('email', email);
    // console.log('pagination', pagination);
    console.log('limit', limit);
    return this.products.findAll(request.query, projection, {
      limit,
      // page: Number(skip),
    });

    // return this.backendProductsApiService.
    // return this.usersService.findAll(reque
    // st.query, projection, {
    //   limit,
    //   // page: Number(skip),
    // });
  }
}
