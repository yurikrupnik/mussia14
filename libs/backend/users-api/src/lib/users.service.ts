import { Injectable } from '@nestjs/common';
import faker from 'faker';
import {
  LoginProviders,
  User,
  UserDocument,
  UserRoles,
} from './entities/users.entity';
import { UsersRepository } from './users.repository';
import { CreateUserDto } from './dto/create-users.dto';
import { UpdateUserDto } from './dto/update-users.dto';
import { CrudApiService } from '@mussia14/backend/mongo-utils';
import { randomEnum } from '@mussia14/shared/ts-utils';

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
    return Object.assign(
      {},
      {
        email: faker.internet.email(),
        name: faker.name.findName(),
        password: faker.internet.password(),
        tenantId: faker.datatype.uuid(),
        provider: randomEnum(LoginProviders),
        role: randomEnum(UserRoles),
      },
      ojb
    );
  }
}
