import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IsString, IsEmail, IsOptional, IsMongoId } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { Factory } from 'nestjs-seeder';

export type UserDocument = User & Document;

export type UserRoles = 'viewer' | 'editor' | 'finance' | 'admin';
export const userRoles: UserRoles[] = ['viewer', 'editor', 'finance', 'admin'];

export type LoginProviders = 'local' | 'google' | 'github';
export const loginProviders: LoginProviders[] = ['local', 'google', 'github'];

@Schema({ timestamps: true })
export class User {
  @Prop() readonly createdAt?: Date;
  @Prop() readonly updatedAt?: Date;

  @ApiProperty({
    description: `User id`,
    example: 'some id',
    readOnly: true,
    required: false,
  })
  @IsOptional()
  @IsMongoId()
  readonly _id?: string;
  // readonly _id?: S.Types.ObjectId;

  @Prop()
  @ApiProperty({
    description: `User's name`,
    // example: 'your name',
    examples: {
      aris: {
        value: 'aris',
        summary: 'A sample limit value  # Optional description',
      },
      yuri: {
        value: 'yuri',
        summary: 'A sample limit value  # Optional description',
      },
    },
    // examples: {
    //   doir: 'my name',
    //   adas: 'my namead',
    // },
    // readOnly: true,
    example: 'nir',
    // default: 'sjt',
    // required: true,
  })
  @IsString()
  @IsOptional()
  @Factory((faker) => faker.name.findName()) // todo check again and fix
  name: string;
  //
  @Prop({
    index: true,
    required: true,
  })
  @ApiProperty({
    description: `User email`,
    example: 'a@a.com',
    // readOnly: true,
    required: true,
  })
  @IsEmail()
  email: string;

  @Prop({ index: true })
  @ApiProperty({
    description: `User's password`,
    example: '12345',
    // readOnly: true,
  })
  password?: string;

  @Prop({ index: true })
  @ApiProperty({
    description: `User's tenantId`,
    example: 'tenantid-1234-1244',
    // readOnly: true,
  })
  tenantId: string;

  @Prop({ type: String, enum: loginProviders, default: loginProviders[0] })
  @ApiProperty({
    description: `User's provider`,
    example: loginProviders[0],
    enum: loginProviders,
    default: loginProviders[0],
    required: true,
  })
  provider: LoginProviders;

  @Prop({ type: String, enum: userRoles, default: userRoles[0] })
  @ApiProperty({
    description: `User's role`,
    example: 'admin',
    enum: userRoles,
    default: userRoles[0],
    required: true,
  })
  role: UserRoles;
}

export const UserSchema = SchemaFactory.createForClass(User);
