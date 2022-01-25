import { Injectable } from '@nestjs/common';
import {
  Connection,
  FilterQuery,
  HydratedDocument,
  LeanDocument,
  Model,
  QueryOptions,
} from 'mongoose';
import { User, UserDocument } from '@mussia14/backend/users-api';
import { handleError } from '@mussia14/backend/errors';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(User.name) private model: Model<UserDocument>,
    @InjectConnection() private connection: Connection // private logger: Logger
  ) {}

  findAll(
    query: FilterQuery<UserDocument>,
    projection: any,
    config: QueryOptions
  ) {
    return this.model
      .find(query, projection, config)
      .lean()
      .then((r) => {
        console.log('r', r);
        return r;
      })
      .catch(handleError);
  }

  create(createEntityData: Partial<User>): Promise<User> {
    const entity = new this.model(createEntityData);
    return entity.save().catch(handleError);
  }
}
