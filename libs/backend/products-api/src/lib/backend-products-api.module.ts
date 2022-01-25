import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { mongoConfig } from '@mussia14/backend/envs';
import { Product, ProductSchema } from './entities/products.entity';
import { BackendProductsApiController } from './backend-products-api.controller';
import { BackendProductsApiService } from './backend-products-api.service';
import { ProductRepository } from './products.repository';

@Module({
  imports: [
    MongooseModule.forRoot(mongoConfig().MONGO_URI, {}),
    // MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeatureAsync([
      {
        name: Product.name,
        useFactory: () => {
          const schema = ProductSchema;
          // schema.plugin(mongoosePaginate);
          // console.log('schema', schema);
          schema.pre('save', function () {
            console.log('Hello from pre save');
            // return new Promise((resolve, reject) => {
            //   reject(new Error('something went wrong'));
            // });
            // return;
          });
          schema.post('save', function (doc) {
            console.log('%s has been saved', doc._id);
            // return new Promise((resolve, reject) => {
            //   reject(new Error('something went wrong'));
            // });
            // return;
          });
          schema.post('init', function (doc) {
            console.log('%s has been initialized from the db', doc._id);
          });
          schema.post('validate', function (doc) {
            // console.log('doc', doc);
            console.log('%s has been validated (but not saved yet)', doc._id);
          });
          schema.post('remove', function (doc) {
            console.log('%s has been removed', doc._id);
          });
          schema.post('delete', function (doc) {
            console.log('%s has been delete', doc._id);
          });
          return schema;
        },
      },
    ]),
    // HealthModule,
  ],
  controllers: [BackendProductsApiController],
  providers: [BackendProductsApiService, ProductRepository],
})
export class BackendProductsApiModule {}
