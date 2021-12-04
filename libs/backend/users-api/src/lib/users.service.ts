import { Model, Connection } from 'mongoose';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { QueryOptions } from 'mongoose';
import faker from 'faker';
import random from 'lodash/random';
import {
  loginProviders,
  User,
  UserDocument,
  userRoles,
} from './entities/users.entity';
// import {
//   CollectionDto,
//   DocumentCollector,
//   CollectionResponse,
// } from '@fagbokforlaget/nestjs-mongoose-paginate';

@Injectable()
class Apiservice {}

@Injectable()
export class UsersService {
  // private readonly logger = new Logger(UsersService.name);
  // constructor(private myLogger: MyLogger) {
  //   // Due to transient scope, CatsService has its own unique instance of MyLogger,
  //   // so setting context here will not affect other instances in other services
  //   this.myLogger.setContext('CatsService');
  // }
  constructor(
    @InjectModel(User.name) private model: Model<UserDocument>,
    @InjectConnection() private connection: Connection
  ) {}

  // async list(
  //   collectionDto: CollectionDto
  // ): Promise<CollectionResponse<UserDocument>> {
  //   const collector = new DocumentCollector<UserDocument>(this.model);
  //   return collector.find(collectionDto);
  // }

  async findAll(
    query: Partial<User>,
    projection,
    config: QueryOptions
  ): Promise<User[]> {
    return this.model.find(query, projection, config).lean();
  }

  async findOne(id: string, projection): Promise<User> {
    return this.model
      .findById(id, projection)
      .then((res) => {
        if (!res) {
          throw new NotFoundException(`resource with id ${id} not found`);
        }
        return res;
      })
      .catch((err) => {
        throw new NotFoundException(err.message);
      });

    // .lean();
  }

  create(body: User): Promise<User> {
    return new this.model(body).save();
  }

  async update(id: string, body: Partial<User>): Promise<User> {
    return this.model.findOneAndUpdate(
      {
        _id: id,
      },
      body,
      {
        new: true,
        useFindAndModify: false,
      }
    );
  }

  delete(id: string): Promise<string> {
    return this.model.findByIdAndDelete(id).then((res) => {
      if (!res) {
        throw new NotFoundException('Not found item');
      }
      return res._id;
    });
  }

  deleteAll() {
    return this.model.deleteMany();
  }

  static createMock(ojb?: Partial<User>) {
    const mock: User = Object.assign(
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

    console.log('userRoles.length', userRoles.length);
    return mock;
  }
}
