import { applyDecorators, Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import capitalize from 'lodash/capitalize';

export function ControllerDecorators(name: string) {
  return applyDecorators(Controller(name), ApiTags(capitalize(name)));
}

export function SwaggerGetByIdDecorators(projection: any, response: any) {
  return applyDecorators(
    // Get(':id'),
    ApiQuery({
      description: 'A list of projections for mongodb queries',
      name: 'projection',
      required: false,
      isArray: true,
      enum: projection,
    }),
    ApiOkResponse({
      description: 'The resources has been successfully returned',
      type: response,
    })
  );
}
