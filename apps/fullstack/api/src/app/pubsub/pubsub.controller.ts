import { Type } from 'class-transformer';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import {
  ApiBody,
  ApiBodyOptions,
  ApiExtraModels,
  ApiNotAcceptableResponse,
  ApiNotFoundResponse,
  ApiProperty,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { PubSubService } from './pubsub.service';
import { LoginProviders, UserRoles } from '@mussia14/backend/users-api';
// import { ValidationPipe } from '@mussia14/backend/validations';
import { MyLogger } from '../a-utils/my-logger/my-logger.service';
// import { CreatePubsubDto } from './dto/create-pubsub.dto';
// import { UpdatePubsubDto } from './dto/update-pubsub.dto';
// type events = 'event1' | 'event2';
import { Event1 } from './temp-util/event1';
import { Roles } from '../firebase/roles';
import { RolesGuard } from '../firebase/auth.guard';

import {
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
  ValidateNested,
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
  // @ApiProperty({
  //   default: 'event1',
  //   enum: myEvents,
  //   required: true,
  // })
  // // @Type(() => String)
  // @IsNotEmpty()
  // @IsString()
  // @IsEmpty()
  // @IsDefined()
  // topic: myEvents;
}

class Event1Dto {
  @ApiProperty({
    default: 'event1',
    enum: myEvents,
    required: true,
  })
  @Type(() => String)
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  topic: myEvents;

  @ValidateNested({ each: true })
  @Type(() => Event1 || Event2 || PaginationParams)
  @ApiProperty({
    type: () => Event1 || Event2 || PaginationParams,
    required: true,
  })
  @IsNotEmpty()
  message: Event1 | Event2 | PaginationParams;
}

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
        topic: 'event2',
        message: {
          stringField: 'my message for 23',
          intField: 33,
          tenantId: '333',
        },
      },
      summary: 'Event3 event',
      description: 'This is event3 example',
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
        enum: Object.values(myEvents),
        description: 'PubSub topic name',
        example: myEvents.event1,
        default: myEvents.event2,
      },
      message: {
        oneOf: [
          {
            $ref: getSchemaPath(Event1),
          },
          {
            $ref: getSchemaPath(Event2),
          },
          {
            $ref: getSchemaPath(PaginationParams),
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
@ApiExtraModels(PaginationParams)
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
    schema: {
      example: {
        statusCode: 123,
        error: 'error log',
        message: 'error mesage',
      },
    },
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

  @Post('')
  @UseGuards(RolesGuard)
  @Roles(UserRoles.admin, UserRoles.visitor)
  // @ApiOAuth2()
  // @ApiBasicAuth()
  // @ApiBearerAuth()
  rrr(@Body() body: any) {
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
