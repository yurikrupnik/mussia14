import {
  BadRequestException,
  Controller,
  Get,
  HttpStatus,
  Req,
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiOAuth2,
  ApiOkResponse,
  ApiSecurity,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Request } from 'express';
import { FirebaseAuthService } from './firebase.service';
import { RolesGuard } from '../firebase/auth.guard';

@ApiTags('Auth')
@ApiBearerAuth()
@ApiOAuth2(['pets:write'])
@ApiSecurity('firebase')
@ApiSecurity('basic')
@UseGuards(RolesGuard)
@Controller()
export class AuthController {
  constructor(private authService: FirebaseAuthService) {}

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

    return this.authService.authenticate(authToken);
  }
  // @ApiBearerAuth('access-token')
  // @UseGuards(RolesGuard)
  @Get('stam')
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
  public async stam(@Req() req: Request): Promise<any> {
    const authToken = req.headers.authorization;
    console.log('authToken', authToken);

    if (!authToken) {
      throw new BadRequestException('MISSING_AUTH_HEADER');
    }
    try {
      const { uid, email, role } = await this.authService.authenticate(
        authToken
      );
      // return { uid, email, role, status: HttpStatus.OK };
      return {};
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }
}
