import {
  BadRequestException,
  Controller,
  Get,
  HttpStatus,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Request } from 'express';
// import { FirebaseAuthService } from './firebase.service';

@ApiBearerAuth('access-token')
@ApiTags('Auth')
@Controller()
export class AuthController {
  // constructor(private authService: FirebaseAuthService) {}

  @Get('authenticate')
  @ApiBadRequestResponse({
    schema: {
      example: {
        statusCode: 400,
        message: 'MISSING_AUTH_HEADER',
        error: 'Bad Request',
      },
    },
  })
  @ApiUnauthorizedResponse({
    schema: {
      example: {
        statusCode: 401,
        message: 'INVALID_AUTH_TOKEN',
        error: 'Unauthorized',
      },
    },
  })
  @ApiOkResponse({ schema: { example: { isAuthenticate: true, status: 200 } } })
  public async authenticate(@Req() req: Request): Promise<any> {
    const authToken = req.headers.authorization;

    if (!authToken) {
      throw new BadRequestException('MISSING_AUTH_HEADER');
    }
    try {
      // const { uid, email, role } = await this.authService.authenticate(
      //   authToken
      // );
      // return { uid, email, role, status: HttpStatus.OK };
      return {};
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }
}
