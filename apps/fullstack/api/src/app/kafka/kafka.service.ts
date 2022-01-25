// import { Type } from 'class-transformer';
// import { Body, Controller, Post, UseGuards, Logger } from '@nestjs/common';
// import {
//   ApiBody,
//   ApiBodyOptions,
//   ApiExtraModels,
//   ApiNotAcceptableResponse,
//   ApiNotFoundResponse,
//   ApiProperty,
//   ApiTags,
//   getSchemaPath,
//   ApiOAuth2,
// } from '@nestjs/swagger';
// // import { PubSubService } from '';
// import { LoginProviders, UserRoles } from '@mussia14/backend/users-api';
// // import { ValidationPipe } from '@mussia14/backend/validations';
// // import { MyLogger } from '../not-userd-examples/a-utils/my-logger/my-logger.service';
// // import { CreatePubsubDto } from './dto/create-pubsub.dto';
// // import { UpdatePubsubDto } from './dto/update-pubsub.dto';
// // type events = 'event1' | 'event2';
// // import { Event1 } from './temp-util/event1';
// // import { Roles } from '../firebase/roles';
// // import { RolesGuard } from '../firebase/auth.guard';
//
// import {
//   IsDefined,
//   IsNotEmpty,
//   IsNumber,
//   IsString,
//   Min,
//   ValidateNested,
// } from 'class-validator';
//
// // todo remove duplicated
// enum myEvents {
//   event1 = 'event1',
//   event2 = 'event2',
// }
//
// @Controller('kafka')
// @ApiTags('kafka')
// export class KafkaController {
//   constructor(
//     private readonly pubsubService: PubSubService // private logger: Logger
//   ) {}
//   // constructor(private readonly pubsubService: PubSubService) {}
//
//   @Post('kafka-topic')
//
//   // new ValidationPipe()
//   publishTopic(@Body() body: any): Promise<any> {
//     const { topic, message } = body;
//     return this.pubsubService.publishTopic(topic, message);
//   }
//
//   @Post('')
//   rrr(@Body() body: any) {
//     // return 'aris';
//     return this.pubsubService.doSomething();
//     // throw new HttpException('Forbidden', HttpStatus.CONFLICT);
//     // throw new HttpException('custom message', HttpStatus.FORBIDDEN);
//     // throw new HttpException(
//     //   {
//     //     status: HttpStatus.FORBIDDEN,
//     //     error: 'this is custom error',
//     //   },
//     //   403
//     // );
//   }
// }
