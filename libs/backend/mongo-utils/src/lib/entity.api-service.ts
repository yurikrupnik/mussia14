import { Document, FilterQuery, QueryOptions } from 'mongoose';
import { EntityRepository } from './entity.repository';

export class CrudApiService<
  T extends Document,
  CreateDto,
  UpdateDto,
  Entity extends EntityRepository<T, CreateDto, UpdateDto>
> {
  constructor(private readonly repository: Entity) {}

  findAll(query: FilterQuery<T>, projection: any, config: QueryOptions) {
    return this.repository.findAll(query, projection, config);
  }

  findById(id: string, projection: any) {
    return this.repository.findById(id, { projection });
  }

  create(body: CreateDto): Promise<T> {
    return this.repository.create(body);
  }

  update(id: string, body: UpdateDto) {
    return this.repository.findOneAndUpdate(id, body);
  }

  delete(id: string): Promise<string> {
    return this.repository.deleteOne(id);
  }

  deleteMany() {
    // this.repository.pago
    return this.repository.deleteMany({});
  }
}
