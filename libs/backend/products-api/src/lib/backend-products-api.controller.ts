import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { BackendProductsApiService } from './backend-products-api.service';
import {
  ApiOkResponse,
  ApiQuery,
  ApiTags,
  OmitType,
  PartialType,
  ApiBearerAuth,
  ApiUnauthorizedResponse,
  ApiBadRequestResponse,
  ApiCreatedResponse,
  getSchemaPath,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { Product } from '@mussia14/backend/products-api';
import { User, UserRoles } from '@mussia14/backend/users-api';
import { Request } from 'express';
import capitalize from 'lodash/capitalize';

enum Projection {
  NAME = 'name',
  DESCRIPTION = 'description',
}

import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
// import { UsersService } from '../../../users-api/src/lib/users.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

import {
  ControllerDecorators,
  SwaggerGetByIdDecorators,
} from '@mussia14/backend/decorators';

export function Auth(...roles: UserRoles[]) {
  return applyDecorators(
    SetMetadata('roles', roles),
    // UseGuards(AuthGuard, RolesGuard),
    ApiBearerAuth(),
    ApiUnauthorizedResponse({ description: 'Unauthorized' })
    // ApiQuery({})
  );
}

// @Swagger()
@ControllerDecorators('products')
export class BackendProductsApiController {
  constructor(private products: BackendProductsApiService) {}

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
  }

  @Get(':id')
  @SwaggerGetByIdDecorators(Projection, Product)
  findById(
    @Query('projection') projection: Projection | [Projection] | null,
    @Param('id') id: string // did not work with id of type User['_id'] or custom new
  ) {
    return this.products.findById(id, projection);
  }

  @Post()
  @ApiBadRequestResponse({
    // description: 'das',
    // schema: {
    //   statusCode: 400,
    //   message: 'Validation failed',
    //   error: 'Bad Request',
    // },
  })
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: User,
    // schema: {
    //   examples: {
    //     aris: {
    //       value: UsersService.createMock(),
    //       summary: 'A sample limit value  # Optional description',
    //     },
    //     yuri: {
    //       value: UsersService.createMock({ email: 'test@test.com' }),
    //       summary: 'A sample limit value  # Optional description',
    //     },
    //     ad: {
    //       value: {
    //         email: faker.internet.email(),
    //         name: faker.name.findName,
    //         password: faker.internet.password(),
    //         tenantId: faker.datatype.uuid(),
    //         provider: loginProviders[random(loginProviders.length - 1)],
    //         role: userRoles[random(userRoles.length - 1)],
    //       },
    //       summary: 'stam test',
    //     },
    //   },
    // },
  })
  @ApiCreatedResponse({
    type: Product,
    schema: {
      examples: [
        {
          description: 'The record has been successfully created 1.',
          value: BackendProductsApiService.createMock({
            name: 'name 1',
            description: 'desc1',
          }),
          summary: 'A sample limit value  # Optional description',
          $ref: getSchemaPath(Product),
        },
        {
          description: 'The record has been successfully created 2.',
          value: BackendProductsApiService.createMock({
            name: 'name 2',
            description: 'desc2',
          }),
          summary: 'A sample limit value  # Optional description',
          $ref: getSchemaPath(Product),
        },
      ],
    },
  })
  // @ApiBody(bodySchema)
  post(@Body() createItemDto: CreateProductDto): Promise<Product> {
    return this.products.create(createItemDto);
  }

  @Delete(':id')
  @ApiOkResponse({
    description: 'The resource has been successfully deleted',
    type: String,
  })
  @ApiParam({
    description: 'Resource id to delete',
    name: 'id',
  })
  delete(@Param('id') id: string): Promise<string> {
    return this.products.delete(id);
  }
}
