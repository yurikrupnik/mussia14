import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IsOptional, IsMongoId, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { Factory } from 'nestjs-seeder';

export type FriendDocument = Friend & Document;

@Schema({})
export class Friend {
  @ApiProperty({
    description: `${Friend.name} id in MongoDB`,
    example: 'some id',
    readOnly: true,
    required: false,
  })
  @IsOptional()
  @IsMongoId()
  @IsString()
  readonly _id?: string;

  @Prop({})
  @ApiProperty({
    description: `User's name`,
    examples: {
      empty: {
        value: '',
        summary: 'Empty value',
      },
      aris: {
        value: 'Product1',
        summary: 'Product1 example',
      },
      yuri: {
        value: 'Product2',
        summary: 'Product2 example',
      },
    },
  })
  @IsString()
  @Factory((faker) => faker.name.findName()) // todo check again and fix
  /**
   * Product Name
   */
  name: string;

  @Prop({})
  @IsString()
  @ApiProperty({})
  /**
   * Product's description
   */
  description: string;
}

export const FriendSchema = SchemaFactory.createForClass(Friend);
