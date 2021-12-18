import { Controller, Get, Param, Query, Req } from '@nestjs/common';
import { BackendProductsApiService } from './backend-products-api.service';
import {
  ApiOkResponse,
  ApiQuery,
  ApiTags,
  OmitType,
  PartialType,
  ApiBearerAuth,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { Product } from '@mussia14/backend/products-api';
import { Request } from 'express';

enum Projection {
  NAME = 'name',
  DESCRIPTION = 'description',
}

import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';

import { User, UserRoles } from '@mussia14/backend/users-api';
export function Auth(...roles: UserRoles[]) {
  return applyDecorators(
    SetMetadata('roles', roles),
    // UseGuards(AuthGuard, RolesGuard),
    ApiBearerAuth(),
    ApiUnauthorizedResponse({ description: 'Unauthorized' })
    // ApiQuery({})
  );
}

function ControllerInit(name: string) {
  return applyDecorators(Controller(name), ApiTags(name));
}

class ControllerWrapper<T, U, V> {
  // constructor(private products: BackendProductsApiService) {}
  @Get(':id')
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
  })
  findById(
    @Query('projection') projection: Projection | [Projection] | null,
    @Param('id') id: string // did not work with id of type User['_id'] or custom new
  ) {
    return 'ss';
    // return this.products.findById(id, projection);
  }
}

// @Controller('products')
// @ApiTags('Products')
@ControllerInit('products')
export class BackendProductsApiController extends ControllerWrapper<
  Product,
  any,
  any
> {
  constructor(private products: BackendProductsApiService) {
    super();
  }

  @Get()
  @Auth(UserRoles.admin)
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
    @Query('projection') projection: Projection | [Projection] | null,
    @Query('limit') limit = 0
  ) {
    delete request.query.limit;
    delete request.query.projection;
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

  // @Get(':id')
  // @ApiQuery({
  //   description: 'A list of projections for mongodb queries',
  //   name: 'projection',
  //   required: false,
  //   isArray: true,
  //   enum: Projection,
  // })
  // @ApiOkResponse({
  //   description: 'The resources has been successfully returned',
  //   type: User,
  // })
  // findById(
  //   @Query('projection') projection: Projection | [Projection] | null,
  //   @Param('id') id: string // did not work with id of type User['_id'] or custom new
  // ) {
  //   return this.products.findById(id, projection);
  // }
}
