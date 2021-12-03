import { Model, Connection } from 'mongoose';
import { Injectable } from '@nestjs/common';
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
export class UsersService {
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
    // console.log('query', query);
    // console.log('projection', projection);
    // console.log('config', config);
    // return this.model.paginate();
    return this.model.find(query, projection, config).lean();
  }

  async findOne(id: string, projection): Promise<User> {
    return this.model.findById(id, projection).lean();
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
    return this.model.findByIdAndDelete(id).then((res) => res._id);
  }

  deleteAll() {
    return this.model.deleteMany();
    // this.model.pag
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
