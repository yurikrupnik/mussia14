import { Injectable } from '@nestjs/common';
import faker from 'faker';
import random from 'lodash/random';
import {
  LoginProviders,
  User,
  UserDocument,
  UserRoles,
} from './entities/users.entity';
import { UsersRepository } from './users.repository';
import { CreateUserDto } from './dto/create-users.dto';
import { UpdateUserDto } from './dto/update-users.dto';
import { CrudApiService } from './db/entity.api-service';
// import { CrudApiService } from '@mussia14/backend/mongo-utils';

@Injectable()
export class UsersService extends CrudApiService<
  UserDocument,
  CreateUserDto,
  UpdateUserDto,
  UsersRepository
> {
  constructor(private readonly usersRepository: UsersRepository) {
    super(usersRepository);
  }

  static createMock(ojb?: Partial<User>): User {
    const loginProviders = Object.values(LoginProviders);
    const userRoles = Object.values(UserRoles);
    return Object.assign(
      {},
      {
        email: faker.internet.email(),
        name: faker.name.findName(),
        password: faker.internet.password(),
        tenantId: faker.datatype.uuid(),
        provider: loginProviders[random(loginProviders.length - 1)],
        role: userRoles[random(userRoles.length - 1)],
      },
      ojb
    );
  }
}
