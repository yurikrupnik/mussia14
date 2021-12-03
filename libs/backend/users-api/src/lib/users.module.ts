import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User, UserSchema } from './entities/users.entity';
import { mongoConfig } from '@mussia14/backend/envs';
// import paginate from 'mongoose-paginate-v2';

@Module({
  imports: [
    MongooseModule.forRoot(mongoConfig().MONGO_URI, {
      // connectionFactory: (connection) => {
      //   connection.plugin(paginate);
      //   return connection;
      // },
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    // HealthModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
