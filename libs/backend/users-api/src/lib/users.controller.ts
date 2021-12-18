import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiBodyOptions,
  ApiCreatedResponse,
  ApiExtraModels,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiProperty,
  ApiQuery,
  ApiTags,
  ApiParam,
  getSchemaPath,
  OmitType,
  PartialType,
} from '@nestjs/swagger';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-users.dto';
import { UpdateUserDto } from './dto/update-users.dto';
import { User, UserRoles } from './entities/users.entity';

import { IsNumber, IsOptional, Min, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginationParams {
  @ApiProperty({
    description: `a`,
    example: 'ac',
    // readOnly: true,
    required: false,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  skip?: number;

  @ApiProperty({
    description: `b`,
    example: 'bc',
    // readOnly: true,
    required: false,
  })
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
enum even12 {
  EVENT1 = 'event1',
  EVENT2 = 'event2',
}

class Event1Dto {
  @ApiProperty({
    enum: even12,
    default: even12.EVENT1,
    description: 'GCP PubSub topic name name',
  })
  topic: events;

  @ValidateNested({ each: true })
  @Type(() => User)
  @ApiProperty({})
  message: User;
}

const bodySchema: ApiBodyOptions = {
  // type: 'object',
  // type: User,
  // description: 'my body here descs',
  examples: {
    admin: {
      description: '1455',
      value: UsersService.createMock({
        email: 'admin@admin.com',
        password: 'admin',
        role: UserRoles.admin,
      }),
      summary: 'A sample limit value admin user',
    },
    yuri: {
      description: '2',
      value: UsersService.createMock({
        email: 'visitor@visitor.com',
        password: 'visitor',
        role: UserRoles.visitor,
      }),
      summary: 'A sample limit value visitor user',
    },
    stam1: {
      // $ref: User,
      // $ref: getSchemaPath(User),
      description: '3',
      value: UsersService.createMock({
        email: 'user@user.com',
        role: UserRoles.user,
        // password: 'admin',
      }),
      // $ref: getSchemaPath(Event1Dto),
      // value: Event1Dto,
      summary: 'A sample limit value client user',
    },
    stam: {
      description: '4',
      value: UsersService.createMock({
        email: '{{$randomEmail}}',
        // password: 'admin',
      }),
      summary: 'A sample limit value stam user',
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
        description: 'admin user',
        value: UsersService.createMock({
          email: 'admin@admin.com',
          password: 'admin',
          role: UserRoles.admin,
        }),
        summary: 'A sample limit value admin user',
      },
      yuri: {
        description: 'visitor user',
        value: UsersService.createMock({
          email: 'visitor@visitor.com',
          password: 'visitor',
          role: UserRoles.visitor,
        }),
        summary: 'A sample limit value visitor user',
      },
      stam1: {
        description: '3',
        value: UsersService.createMock({
          email: 'user@user.com',
          role: UserRoles.user,
          // password: 'admin',
        }),
        // $ref: getSchemaPath(Event1Dto),
        // value: Event1Dto,
        summary: 'A sample limit value client user',
      },
      stam: {
        description: '4',
        value: UsersService.createMock({
          email: '{{$randomEmail}}',
          // password: 'admin',
        }),
        summary: 'A sample limit value stam user',
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
    type: PartialType(OmitType(User, ['_id', 'password'])),
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
    type: User,
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
    return this.usersService.findAll(request.query, projection, {
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
  findById(
    @Query('projection') projection: Projection | [Projection] | null,
    @Param('id') id: string // did not work with id of type User['_id'] or custom new
  ) {
    return this.usersService.findById(id, projection);
  }

  @Put(':id')
  @ApiNotFoundResponse({})
  @ApiOkResponse({
    description: 'The resources has been successfully updated',
    type: User,
  })
  update(
    // @Body() body: UpdateUserDto, // todo return validation - added global
    @Body() body: UpdateUserDto,
    @Param('id') id: string
  ) {
    return this.usersService.update(id, body);
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
        // {
        //   description: 'The record has been successfully created 3.',
        //   value: {
        //     email: faker.internet.email(),
        //     name: faker.name.findName,
        //     password: faker.internet.password(),
        //     tenantId: faker.datatype.uuid(),
        //     provider: loginProviders[random(loginProviders.length - 1)],
        //     role: userRoles[random(userRoles.length - 1)],
        //   },
        //   summary: 'stam test',
        //   $ref: getSchemaPath(User),
        // },
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
  post(@Body() createItemDto: CreateUserDto): Promise<User | void> {
    return this.usersService.create(createItemDto);
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
    return this.usersService.delete(id);
  }

  @Delete()
  deleteAll() {
    return this.usersService.deleteMany();
  }
}
