import { Type } from 'class-transformer';
import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { internet, name, datatype } from 'faker';
import random from 'lodash/random';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiExtraModels,
  ApiNotAcceptableResponse,
  ApiTags,
  ApiProperty,
  getSchemaPath,
  ApiBodyOptions,
  ApiBasicAuth,
  ApiNotFoundResponse,
  ApiBearerAuth,
  ApiOAuth2,
  PickType,
} from '@nestjs/swagger';
import { PubSubService } from './pubsub.service';
import { LoginProviders, User, UserRoles } from '@mussia14/backend/users-api';
// import { ValidationPipe } from '@mussia14/backend/validations';
import { MyLogger } from '../a-utils/my-logger/my-logger.service';
// import { CreatePubsubDto } from './dto/create-pubsub.dto';
// import { UpdatePubsubDto } from './dto/update-pubsub.dto';
// type events = 'event1' | 'event2';
import { Event1 } from './temp-util/event1';

import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
  ValidateNested,
  IsDefined,
  IsEmpty,
  IsIn,
} from 'class-validator';

// todo remove duplicated
enum myEvents {
  event1 = 'event1',
  event2 = 'event2',
}

class Event2 extends Event1 {
  static createMock(ojb?: Partial<Event2>) {
    const loginProviders = Object.values(LoginProviders);
    const userRoles = Object.values(UserRoles);
    const mock: Event2 = Object.assign(
      {},
      {
        stringField: 'asd',
        intField: 12,
        tenantId: 'asddfsd',
        // email: internet.email(),
        // name: name.findName(),
        // password: internet.password(),
        // tenantId: datatype.uuid(),
        // provider: loginProviders[random(loginProviders.length - 1)],
        // role: userRoles[random(userRoles.length - 1)],
      },
      ojb
    );

    return mock;
  }
}

class PaginationParams {
  // @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @ApiProperty({
    description: `Skil number`,
    example: 0,
    // readOnly: true,
    // required: false,
  })
  skip: number;

  // @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @ApiProperty({
    description: `Skil number`,
    example: 10,
    // readOnly: true,
    // required: false,
  })
  limit: number;

  // testing stam string
  @Type(() => String)
  @IsString()
  // @Min(1)
  @ApiProperty({
    description: `Stam string`,
    example: 'my example string',
    required: true,
    // readOnly: true,
    // required: false,
  })
  stam: string;
}

class TopicName {
  @ApiProperty({
    default: 'event1',
    enum: myEvents,
    required: true,
  })
  // @Type(() => String)
  @IsNotEmpty()
  @IsString()
  @IsEmpty()
  @IsDefined()
  topic: myEvents;
}

class Event1Dto extends TopicName {
  @ValidateNested({ each: true })
  @Type(() => Event1 || Event2)
  @ApiProperty({ type: () => Event1 || Event2, required: true })
  @IsNotEmpty()
  message: Event1 | Event2;
}

class Event2Dto {
  @ApiProperty({
    default: 'event2',
    enum: myEvents,
    required: true,
  })
  @Type(() => String)
  @IsString()
  topic: myEvents;

  @ValidateNested({ each: true })
  @Type(() => Event2)
  @ApiProperty({ type: Event2, required: true })
  message: Event2;
}

type EventsBodies = Event1Dto | Event2Dto;

// class S implements EventsBodies {
//   constructor() {
//   }
// }

const bodySchema: ApiBodyOptions = {
  // type: 'object',
  examples: {
    test1: {
      value: {
        topic: 'test1',
        message: {
          string: 'real data',
          number: 2,
        },
      },
      summary: 'Real topic',
      // $ref: Event1Dto
      description: 'Real gcp topic example',
    },
    event1: {
      value: {
        topic: 'event1',
        message: {
          stringField: 'my string',
          intField: 2,
          tenantId: 'dasddgdfsg',
        },
      },
      summary: 'Event1 event',
      // $ref: Event1Dto
      description: 'This is event1 example',
    },
    event2: {
      value: {
        topic: 'event2',
        message: {
          stringField: 'my message for 2',
          intField: 22,
          tenantId: '2',
        },
      },
      summary: 'Event2 event',
      description: 'This is event2 example',
    },
    event3: {
      value: {
        event: 'event2',
        message: {
          stringField: 'my message for 23',
          intField: 33,
          tenantId: '333',
        },
      },
      summary: 'Event2 event',
      description: 'This is event2 example',
    },
  },
  // type: {
  //   name
  // },
  schema: {
    // $ref: getSchemaPath(Event1Dto),
    properties: {
      topic: {
        type: 'string',
        enum: myEvents,
        // $ref: getSchemaPath(myEvents),
        // enum: Object.values(myEvents),
        // type: TopicName,
        // $ref: getSchemaPath(PickType(TopicName, ['topic'])),
        // description: 'top',
        // default: myEvents.event2,
        // example: myEvents.event2,
      },
      message: {
        oneOf: [
          {
            // example: Event1Dto,
            $ref: getSchemaPath(Event1),
          },
          {
            // example: Event2Dto,
            $ref: getSchemaPath(Event2),
          },
        ],
      },
    },
  },
};

class Er {
  @ApiProperty()
  message: string;
  @ApiProperty()
  status: number;
}

@Controller('pubsub')
@ApiTags('PubSub')
@ApiExtraModels(TopicName)
@ApiExtraModels(Event1Dto)
@ApiExtraModels(Event2)
export class PubSubController {
  constructor(
    private readonly pubsubService: PubSubService,
    private logger: MyLogger
  ) {
    this.logger.setContext(PubSubController.name);
  }
  // constructor(private readonly pubsubService: PubSubService) {}

  @Post('publish-topic')
  // @ApiCreatedResponse({
  //   description: 'The topic has been successfully sent message',
  //   type: String,
  // })
  @ApiNotAcceptableResponse({
    description: 'Topic schema validation error',
    // type: Er,
    // content: {},
    // links: {},
  })
  @ApiNotFoundResponse({
    description: 'Topic name is not defined in the cloud',
  })
  @ApiBody(bodySchema)
  // new ValidationPipe()
  publishTopic(@Body() body: Event1Dto): Promise<any> {
    const { topic, message } = body;
    return this.pubsubService.publishTopic(topic, message);
  }

  @Post('/rrr')
  // @ApiOAuth2()
  @ApiBasicAuth()
  @ApiBearerAuth()
  rrr(@Body() body: Event1Dto) {
    // return 'aris';
    return this.pubsubService.doSomething();
    // throw new HttpException('Forbidden', HttpStatus.CONFLICT);
    // throw new HttpException('custom message', HttpStatus.FORBIDDEN);
    // throw new HttpException(
    //   {
    //     status: HttpStatus.FORBIDDEN,
    //     error: 'this is custom error',
    //   },
    //   403
    // );
  }
}
