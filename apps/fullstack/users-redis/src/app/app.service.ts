import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '@mussia14/backend/users-api';
import {
  Connection,
  FilterQuery,
  HydratedDocument,
  LeanDocument,
  Model,
  QueryOptions,
} from 'mongoose';
import { handleError } from '@mussia14/backend/errors';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(User.name) private model: Model<UserDocument>,
    @InjectConnection() private connection: Connection // private logger: Logger
  ) {}
  getData(): { message: string } {
    return { message: 'Welcome to users-service!' };
  }
  findAll(
    query: FilterQuery<UserDocument>,
    projection: any,
    config: QueryOptions
  ): Promise<LeanDocument<HydratedDocument<UserDocument>>[]> {
    return this.model.find(query, projection, config).lean().catch(handleError);
  }

  create(createEntityData: Partial<User>): Promise<User> {
    const entity = new this.model(createEntityData);
    return entity.save().catch(handleError);
  }
}
