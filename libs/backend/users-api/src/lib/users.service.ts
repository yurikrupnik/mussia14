import { Injectable } from '@nestjs/common';
import faker from 'faker';
// import random from 'lodash/random';
// import sample from 'lodash/sample';
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
// import { randomEnum } from '@mussia14/shared/ts-utils';
// import { randomEnum } from '@mussia14/shared/ts-utils-buildable';
function randomEnum<T>(anEnum: T): T[keyof T] {
  const enumValues = Object.values(anEnum) as unknown as T[keyof T][];
  const randomIndex = Math.floor(Math.random() * enumValues.length);
  return enumValues[randomIndex];
}

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
    // const loginProviders = Object.values(LoginProviders);
    // const userRoles = Object.values(UserRoles);
    return Object.assign(
      {},
      {
        email: faker.internet.email(),
        name: faker.name.findName(),
        password: faker.internet.password(),
        tenantId: faker.datatype.uuid(),
        provider: randomEnum(LoginProviders),
        // provider: loginProviders[random(loginProviders.length - 1)],
        role: randomEnum(UserRoles),
      },
      ojb
    );
  }
}
