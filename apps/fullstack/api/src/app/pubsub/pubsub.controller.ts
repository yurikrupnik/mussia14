import { Type } from 'class-transformer';
import { IsNumber, IsOptional, Min, ValidateNested } from 'class-validator';
import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
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
} from '@nestjs/swagger';
import { PubSubService } from './pubsub.service';
import { User } from '@mussia14/backend/users-api';
import { ValidationPipe } from '@mussia14/backend/validations';
import { MyLogger } from '../a-utils/my-logger/my-logger.service';
// import { CreatePubsubDto } from './dto/create-pubsub.dto';
// import { UpdatePubsubDto } from './dto/update-pubsub.dto';
type events = 'event1' | 'event2';
import { Event1 } from './temp-util/event1';
// todo remove duplicated
enum myEvents {
  event1,
  event2,
}

class Event2 extends Event1 {}

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
    example: 0,
    // readOnly: true,
    // required: false,
  })
  limit: number;
}

class Event1Dto {
  @ApiProperty({
    default: 'event1',
    // type: myEvents,
    enum: myEvents,
    // type: ['event1', 'event2'],
  })
  topic: myEvents;

  @ValidateNested({ each: true })
  @Type(() => Event1)
  @ApiProperty({ type: () => Event1 })
  message: Event1;
}

class Event2Dto {
  @ApiProperty({
    default: 'event2',
    enum: myEvents,
  })
  topic: myEvents;

  @ValidateNested({ each: true })
  @Type(() => Event2)
  @ApiProperty({ type: Event2 })
  message: Event2;
}

type EventsBodies = Event1Dto | Event2Dto;

const bodySchema: ApiBodyOptions = {
  // type: 'object',
  examples: {
    event1: {
      value: Event1Dto,
      summary: 'Event1 event',
      // $ref: Event1Dto
      description: 'This is event1 example',
    },
    event2: {
      value: Event2Dto,
      summary: 'Event2 event',
      description: 'This is event2 example',
    },
  },
  schema: {
    // examples: {
    //   aris: {
    //     value: Event1Dto,
    //     summary: 'arus here',
    //   },
    //   arsis: {
    //     value: Event2Dto,
    //     summary: 'das',
    //   },
    // },
    //   examples: {
    //     aris: {
    //       value: {
    //         topic: 'event1',
    //         message: PaginationParams
    //       },
    //       summary: 'A samplessss limit value  # Optional description',
    //     },
    //     yuri: {
    //       value: {
    //         topic: 'event2',
    //         message: PaginationParams
    //       },
    //     },
    //     summary: 'A sample limit value  # Optional description',
    //   },
    // },
    oneOf: [
      {
        // example: Event1Dto,
        $ref: getSchemaPath(Event1Dto),
      },
      {
        // example: Event2Dto,
        $ref: getSchemaPath(Event2Dto),
      },
      // {
      //   type: getSchemaPath(Event3Dto),
      // },
      // { type: getSchemaPath(Event4) },
    ],
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
@ApiExtraModels(Event1Dto)
@ApiExtraModels(Event2Dto)
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
  publishTopic(@Body() body: EventsBodies): Promise<any> {
    const { topic, message } = body;
    return this.pubsubService.publishTopic(topic, message);
  }

  @Post('/rrr')
  @ApiBasicAuth()
  rrr() {
    // return 'aris';
    this.pubsubService.doSomething();
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
