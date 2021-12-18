import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection, LeanDocument, Query } from 'mongoose';
import { CreateFriendDto } from './dto/create-friend.dto';
import { UpdateFriendDto } from './dto/update-friend.dto';
import { Friend, FriendDocument } from './entities/friend.entity';
import { handleError } from '@mussia14/backend/errors';

@Injectable()
export class FriendsService {
  constructor(
    @InjectModel(Friend.name) private model: Model<FriendDocument>,
    @InjectConnection() private connection: Connection
  ) {}

  create(createFriendDto: CreateFriendDto): Promise<FriendDocument> {
    return new this.model(createFriendDto).save();
  }

  findAll() {
    return this.model.find({}, [], {}).lean();
  }

  findOne(id: string): Promise<LeanDocument<FriendDocument>> {
    return this.model
      .findById(id, [])
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
    return (
      this.model
        .findByIdAndUpdate(id, updateFriendDto, {
          new: true,
          useFindAndModify: false,
        })
        .lean()
        // .then((res) => {
        //   if (!res) {
        //     throw new NotFoundException(`resource with id ${id} not found`);
        //   }
        //   return res;
        // })
        .catch(handleError)
    );
  }

  remove(id: string) {
    return this.model
      .findByIdAndDelete(id)
      .lean()
      .then((res) => {
        if (!res) {
          throw new NotFoundException('Not found item');
        }
        return res._id;
      })
      .catch(handleError);
  }
}
