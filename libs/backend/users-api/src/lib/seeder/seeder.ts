import { seeder } from 'nestjs-seeder';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../entities/users.entity';
import { UsersSeeder } from './users.seeder';
import { mongoConfig } from '@mussia14/backend/envs';

seeder({
  imports: [
    MongooseModule.forRoot(mongoConfig().MONGO_URI),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
}).run([UsersSeeder]);
