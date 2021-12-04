import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  Req,
  ParseIntPipe,
  DefaultValuePipe,
} from '@nestjs/common';
import random from 'lodash/random';
import { Request } from 'express';
import faker from 'faker';
import {
  ApiTags,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiQuery,
  ApiBodyOptions,
  ApiExtraModels,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
  getSchemaPath,
  OmitType,
  PartialType,
  PickType,
  ApiParam,
} from '@nestjs/swagger';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-users.dto';
import { UpdateUserDto } from './dto/update-users.dto';
import { loginProviders, User, userRoles } from './entities/users.entity';
import { ValidationPipe } from '@mussia14/backend/validations';

import {
  IsNumber,
  Min,
  IsOptional,
  ValidateNested,
  IsMongoId,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
export class PaginationParams {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  skip?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  limit?: number;
}

enum Projection {
  name = 'name',
  role = 'role',
  email = 'email',
  tenantId = 'tenantId',
  provider = 'provider',
}

// loginProviders[1];

export type events = 'event1' | 'event2';

class Event1Dto {
  @ApiProperty({
    default: 'event1',
  })
  topic: events;

  @ValidateNested({ each: true })
  @Type(() => User)
  @ApiProperty({})
  message: User;
}

class TestDto {
  @ApiProperty({
    description: `id example just id`,
    example: 'id example just id',
    // readOnly: true,
    required: false,
  })
  // @IsOptional()
  @IsMongoId()
  id: string;
}

const bodySchema: ApiBodyOptions = {
  // type: 'object',
  // type: User,
  // description: 'my body here descs',
  examples: {
    admin: {
      description: '1',
      value: UsersService.createMock({
        email: 'admin@admin.com',
        password: 'admin',
        role: 'admin',
      }),
      summary: 'A sample limit value admin user',
    },
    yuri: {
      description: '2',
      value: UsersService.createMock({
        email: 'viewer@viewer.com',
        password: 'viewer',
        role: 'viewer',
      }),
      summary: 'A sample limit value viewer user',
    },
    stam: {
      description: '3',
      value: UsersService.createMock({
        email: '{{$randomEmail}}',
        // password: 'admin',
      }),
      summary: 'A sample limit value stam user',
    },
    stam1: {
      // $ref: User,
      // $ref: getSchemaPath(User),
      description: '4',
      value: UsersService.createMock({
        email: 'finance@finance.com',
        role: 'finance',
        // password: 'admin',
      }),
      // $ref: getSchemaPath(Event1Dto),
      // value: Event1Dto,
      summary: 'A sample limit value finance user',
    },
    // ad: {
    //   value: {
    //     email: faker.internet.email(),
    //     name: faker.name.findName(),
    //     password: faker.internet.password(),
    //     tenantId: faker.datatype.uuid(),
    //     provider: loginProviders[random(loginProviders.length - 1)],
    //     role: userRoles[random(userRoles.length - 1)],
    //   },
    //   summary: 'stam test',
    // },
  },
  schema: {
    examples: {
      admin: {
        description: '1xsa',
        value: UsersService.createMock({
          email: 'admin@admin.com',
          password: 'admin',
          role: 'admin',
        }),
        summary: 'A sample limit value admin user',
      },
      yuri: {
        description: '2sda',
        value: UsersService.createMock({
          email: 'viewer@viewer.com',
          password: 'viewer',
          role: 'viewer',
        }),
        summary: 'A sample limit value viewer user',
      },
      stam: {
        description: '3',
        value: UsersService.createMock({
          email: '{{$randomEmail}}',
          // password: 'admin',
        }),
        summary: 'A sample limit value stam user',
      },
      stam1: {
        // $ref: User,
        // $ref: getSchemaPath(User),
        description: '4',
        value: UsersService.createMock({
          email: 'finance@finance.com',
          role: 'finance',
          // password: 'admin',
        }),
        // $ref: getSchemaPath(Event1Dto),
        // value: Event1Dto,
        summary: 'A sample limit value finance user',
      },
      // ad: {
      //   value: {
      //     email: faker.internet.email(),
      //     name: faker.name.findName(),
      //     password: faker.internet.password(),
      //     tenantId: faker.datatype.uuid(),
      //     provider: loginProviders[random(loginProviders.length - 1)],
      //     role: userRoles[random(userRoles.length - 1)],
      //   },
      //   summary: 'stam test',
      // },
    },
    oneOf: [
      {
        // example: User,
        // example: 'yuri',
        // description: 'my shit',
        examples: [
          {
            value: UsersService.createMock({ email: 'isssso@test.com' }),
            summary: 'A sample limit value  # Optional description',
          },
        ],
        $ref: getSchemaPath(User),
        // $ref: getSchemaPath(Event1Dto),
      },
      {
        // description: 'my shit 1111',
        // example: {
        //   value: UsersService.createMock({ email: 'io@test.com' }),
        //   summary: 'A sample limit ',
        // },
        examples: [
          {
            value: UsersService.createMock({ email: 'a@test.com' }),
            summary: 'A sample limit value  sdasd# Optional description',
          },
        ],
        // example: Event1Dto,
        $ref: getSchemaPath(Event1Dto),
      },
    ],
  },
};

@ApiExtraModels(User)
@ApiExtraModels(Event1Dto)
@ApiTags('Users')
// @ApiCookieAuth()
// @ApiOAuth2(['users:write'])
// @ApiBearerAuth()
// @ApiBasicAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiQuery({
    description: 'A list of projections for mongodb queries',
    name: 'search',
    required: false,
    // name: nested.field,
    style: 'deepObject',
    // required: false,
    // schema: {
    //   // type
    // },
    type: OmitType(User, ['_id', 'password']),
    // isArray: true,
  })
  @ApiQuery({
    description: 'Limit of items to fetch',
    name: 'email',
    required: false,
    example: 'aris@aris.com',
    type: PartialType(PickType(User, ['email'])),
  })
  @ApiQuery({
    description: 'Limit of items to fetch',
    name: 'limit',
    required: false,
    examples: {
      low: {
        value: 0,
        summary: 'A sample limit value 0',
      },
      high: {
        value: 10,
        summary: 'A sample limit value 10',
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
    type: User,
    isArray: true,
  })
  getData(
    @Req() request: Request,
    // @Query() { skip, limit }: PaginationParams,
    @Query('projection') projection: Projection | [Projection] | null,
    // new DefaultValuePipe(0), ParseIntPipe - as global
    @Query('limit') limit = 0,
    @Query('email') email: string,
    @Query('search') search: any
  ) {
    console.log('query', request.query);
    console.log('params', request.params);
    console.log('search', search);
    console.log('email', email);
    console.log('limit', limit);
    return this.usersService.findAll(search, projection, {
      limit,
      // page: Number(skip),
    });
  }

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
    type: User,
  })
  findOne(
    @Req() request: Request,
    @Query('projection') projection: Projection | [Projection] | null,
    @Param('id') id: string // did not work with id of type User['_id'] or custom new
  ) {
    console.log('request.query', request.query);
    console.log('request.params', request.params);
    console.log('id', id);
    // return id;
    return this.usersService.findOne(id, projection);
  }

  @Put(':id')
  @ApiNotFoundResponse({})
  @ApiOkResponse({
    description: 'The resources has been successfully updated',
    type: User,
  })
  update(
    // @Body() body: UpdateUserDto, // todo return validation - added global
    @Body() body: UpdateUserDto | CreateUserDto,
    @Param('id') id: string
  ): Promise<User> {
    return this.usersService.update(id, body);
  }

  @Post()
  @ApiBadRequestResponse({
    description: 'das',
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
    type: User,
    schema: {
      examples: [
        {
          description: 'The record has been successfully created 1.',
          value: UsersService.createMock(),
          summary: 'A sample limit value  # Optional description',
          $ref: getSchemaPath(User),
        },
        {
          description: 'The record has been successfully created 2.',
          value: UsersService.createMock({ email: 'test@test.com' }),
          summary: 'A sample limit value  # Optional description',
          $ref: getSchemaPath(User),
        },
        {
          description: 'The record has been successfully created 3.',
          value: {
            email: faker.internet.email(),
            name: faker.name.findName,
            password: faker.internet.password(),
            tenantId: faker.datatype.uuid(),
            provider: loginProviders[random(loginProviders.length - 1)],
            role: userRoles[random(userRoles.length - 1)],
          },
          summary: 'stam test',
          $ref: getSchemaPath(User),
        },
      ],
      // examples: {
      //   aris: {
      //     description: 'The record has been successfully created 1.',
      //     value: UsersService.createMock(),
      //     summary: 'A sample limit value  # Optional description',
      //   },
      //   yuri: {
      //     description: 'The record has been successfully created 2.',
      //     value: UsersService.createMock({ email: 'test@test.com' }),
      //     summary: 'A sample limit value  # Optional description',
      //   },
      //   ad: {
      //     description: 'The record has been successfully created 3.',
      //     value: {
      //       email: faker.internet.email(),
      //       name: faker.name.findName,
      //       password: faker.internet.password(),
      //       tenantId: faker.datatype.uuid(),
      //       provider: loginProviders[random(loginProviders.length - 1)],
      //       role: userRoles[random(userRoles.length - 1)],
      //     },
      //     summary: 'stam test',
      //   },
      // },
    },
  })
  @ApiBody(bodySchema)
  post(@Body() createItemDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createItemDto);
  }

  @Delete(':id')
  @ApiOkResponse({
    description: 'The resources has been successfully deleted',
    type: String,
  })
  delete(@Param('id') id: string): Promise<string> {
    return this.usersService.delete(id);
  }

  @Delete()
  deleteAll() {
    return this.usersService.deleteAll();
  }
}
