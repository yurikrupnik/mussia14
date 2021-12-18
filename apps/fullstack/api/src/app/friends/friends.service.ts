import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { CreateFriendDto } from './dto/create-friend.dto';
import { UpdateFriendDto } from './dto/update-friend.dto';
import { Friend, ProductDocument } from './entities/friend.entity';
import { handleError } from '@mussia14/backend/errors';

@Injectable()
export class FriendsService {
  constructor(
    @InjectModel(Friend.name) private model: Model<ProductDocument>,
    @InjectConnection() private connection: Connection
  ) {}
  create(createFriendDto: CreateFriendDto) {
    return new this.model(createFriendDto).save();
  }

  findAll() {
    return this.model.find({}, [], {});
  }

  findOne(id: string) {
    return this.model
      .findById(id)
      .lean()
      .then((res) => {
        if (!res) {
          throw new NotFoundException(`resource with id ${id} not found`);
        }
        return res;
      })
      .catch(handleError);
  }

  update(id: string, updateFriendDto: UpdateFriendDto) {
    return `This action updates a #${id} friend`;
  }

  remove(id: string) {
    return this.model
      .findByIdAndDelete(id)
      .then((res) => {
        if (!res) {
          throw new NotFoundException('Not found item');
        }
        return res._id;
      })
      .catch(handleError);
  }
}
