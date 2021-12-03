import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
} from '@nestjs/common';

import {
  ApiTags,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiQuery,
  OmitType,
  PartialType,
} from '@nestjs/swagger';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-users.dto';
import { UpdateUserDto } from './dto/update-users.dto';
import { User } from './entities/users.entity';
// import { ValidationPipe } from '@mussia14/backend/validations';

enum Projection {
  name = 'name',
  role = 'role',
  email = 'email',
  tenantId = 'tenantId',
  provider = 'provider',
}

@ApiTags('Users')
// @ApiCookieAuth()
// @ApiOAuth2(['users:write'])
// @ApiBearerAuth()
// @ApiBasicAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  // @ApiQuery({
  //   description: 'Search query',
  //   name: 'search',
  //   required: false,
  //   type: PartialType(OmitType(User, ['_id', 'password'])),
  //   isArray: true,
  //   example: undefined,
  //   // explode: true,
  //   // example: 50,
  // })
  @ApiQuery({
    description: 'Limit of items to fetch',
    name: 'limit',
    required: false,
    example: 10,
    allowEmptyValue: true,
    // style: 'matrix',
    // enumName: 'sa',
  })
  @ApiQuery({
    description: 'A list of projections for mongodb queries',
    name: 'projection',
    required: false,
    isArray: true,
    // schema: {
    //
    // }
    // type: PartialType(OmitType(User, ['_id', 'password'])),
    enum: Projection,
  })
  // @ApiQuery({
  //   description: 'page number',
  //   name: 'page',
  //   required: false,
  //   example: 1,
  //   allowEmptyValue: true,
  // })
  @ApiOkResponse({
    description: 'The resources has been successfully returned',
    type: User,
    isArray: true,
  })
  getData(
    @Query('projection') projection: Projection | [Projection] | null,
    @Query('limit') limit = 0,
    @Query('search') search: Partial<User>
  ) {
    return this.usersService.findAll(search, projection, {
      limit: Number(limit),
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
    @Query('projection') projection: Projection | [Projection] | null,
    @Param('id') id: string
  ) {
    return this.usersService.findOne(id, projection);
  }

  @Put(':id')
  @ApiOkResponse({
    description: 'The resources has been successfully updated',
    type: User,
  })
  update(
    @Body() body: UpdateUserDto, // todo return validation
    // @Body(new ValidationPipe()) body: UpdateUserDto,
    @Param('id') id: string
  ): Promise<User> {
    return this.usersService.update(id, body);
  }

  @Post()
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: User,
  })
  post(
    // @Body(new ValidationPipe()) createItemDto: CreateUserDto
    @Body() createItemDto: CreateUserDto
  ): Promise<User> {
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
}
