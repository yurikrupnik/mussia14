import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsOptional,
  IsMongoId,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { Factory } from 'nestjs-seeder';

export type UserDocument = User & Document;

// export type UserRoles = 'viewer' | 'editor' | 'finance' | 'admin';
// export const userRoles: UserRoles[] = ['viewer', 'editor', 'finance', 'admin'];

// export type LoginProviders = 'local' | 'google' | 'github';

export enum UserRoles {
  admin = 'admin',
  user = 'user',
  visitor = 'visitor',
  // editor = 'editor',
  // finance = 'finance',
}

export enum LoginProviders {
  local = 'local',
  google = 'google',
  github = 'github',
}

// export const loginProviders: LoginProviders[] = ['local', 'google', 'github'];

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

  @Prop({})
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
  // @IsNotEmpty()
  email: string;

  @Prop()
  @ApiProperty({
    description: `User's password`,
    examples: {
      letters: {
        value: 'qweasd',
        description: 'Password letters',
        summary: 'Password 6 letters',
      },
      numbers: {
        value: '12345',
        description: 'Password numbers',
        summary: 'Password 6 numbers',
      },
    },
    // readOnly: true,
  })
  password?: string;

  @Prop({ index: true })
  @ApiProperty({
    description: `User's tenantId`,
    // example: 'tenantid-1234-1244',
    // readOnly: true,
    example: 'example',
    default: 'example',
    examples: {
      letters: {
        value: 'qweasd',
        description: 'tenantId letters',
        summary: 'tenantId 6 letters',
      },
      numbers: {
        value: '12345',
        description: 'tenantId numbers',
        summary: 'tenantId 6 numbers',
      },
    },
  })
  tenantId: string;

  @Prop({
    type: String,
    enum: LoginProviders,
    default: LoginProviders.local,
  })
  @ApiProperty({
    description: `User's provider`,
    example: '',
    enum: LoginProviders,
    default: LoginProviders.local,
    required: true,
  })
  provider: LoginProviders;

  @Prop({ type: String, enum: UserRoles, default: UserRoles.admin })
  @ApiProperty({
    description: `User's role`,
    example: '',
    enum: UserRoles,
    default: UserRoles.visitor,
    required: true,
  })
  role: UserRoles;

  // @Prop({
  //   type: String,
  //   enum: LoginProvidersEnum,
  //   default: LoginProvidersEnum.google,
  // })
  // @ApiProperty({
  //   description: `User's role stam exanple`,
  //   example: LoginProvidersEnum.google,
  //   enum: LoginProvidersEnum,
  //   // default: LoginProvidersEnum.google,
  //   required: true,
  // })
  // stam: LoginProvidersEnum;
}

export const UserSchema = SchemaFactory.createForClass(User);
