import {
  Document,
  FilterQuery,
  Model,
  QueryOptions,
  LeanDocument,
  HydratedDocument,
} from 'mongoose';

import { NotFoundException } from '@nestjs/common';
import { handleError } from '@mussia14/backend/errors';

export abstract class EntityRepository<
  T extends Document,
  CreateDto,
  UpdateDto
> {
  constructor(protected readonly entityModel: Model<T>) {}

  findById(
    id: string,
    // projection?: Record<string, unknown>,
    config: QueryOptions
  ): Promise<HydratedDocument<T, any, void>> {
    return (
      this.entityModel
        .findById(id, config)
        // .lean() // todo failing types
        .then((res) => {
          if (!res) {
            throw new NotFoundException(`resource with id ${id} not found`);
          }
          return res;
        })
        .catch(handleError)
    );
  }

  findAll(
    query: FilterQuery<T>,
    projection,
    config: QueryOptions
  ): Promise<LeanDocument<HydratedDocument<T>>[]> {
    return this.entityModel
      .find(query, projection, config)
      .lean()
      .catch(handleError);
  }

  create(createEntityData: CreateDto): Promise<T> {
    const entity = new this.entityModel(createEntityData);
    return entity.save().catch(handleError);
  }

  findOneAndUpdate(id: string, updateEntityData: UpdateDto): Promise<T> {
    return this.entityModel
      .findByIdAndUpdate(id, updateEntityData, {
        new: true,
        useFindAndModify: false,
      })
      .catch(handleError);
  }

  deleteMany(entityFilterQuery: FilterQuery<T>): Promise<boolean> {
    return this.entityModel
      .deleteMany(entityFilterQuery)
      .then((deleteResult) => {
        return deleteResult.deletedCount >= 1;
      })
      .catch(handleError);
  }

  deleteOne(id: string): Promise<string> {
    return this.entityModel
      .findByIdAndDelete(id)
      .then((res) => {
        if (!res) {
          throw new NotFoundException('Not found item');
        }
        return res._id;
      })
      .catch(handleError);
  }

  createMock() {
    // return new this.entityModel({});
  }
}
