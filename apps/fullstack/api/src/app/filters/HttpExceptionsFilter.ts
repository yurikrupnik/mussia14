import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
// import { HttpAdapterHost } from '@nestjs/core';
import { Request, Response } from 'express';
import { Logger } from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger = new Logger(HttpExceptionFilter.name)) {}
  // constructor(private readonly httpAdapterHost: HttpAdapterHost) {}
  // private logger = new Logger(HttpExceptionFilter.name);

  catch(exception: HttpException, host: ArgumentsHost) {
    // console.log('host', host);
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    // this.logger.log('status', status);
    // this.logger.error(`${request.method} ${request.url}`);
    // this.logger.warn('warn', {
    //   statusCode: status,
    //   timestamp: new Date().toISOString(),
    //   path: request.url,
    //   body: request.body,
    //   query: request.query,
    //   message: exception.getResponse(),
    //   stack: exception.stack,
    //   // body: request.body,
    // });
    // console.log('exception.message', exception.message);
    // console.log('exception.stack', exception.stack);
    // logger.log('dam', ctx);
    // response.status(status).json(exception.getResponse());
    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      body: request.body,
      query: request.query,
      message: exception.getResponse(),
      stack: exception.stack,
      // body: request.body,
    });
  }

  // catch(exception: unknown, host: ArgumentsHost): void {
  //   // In certain situations `httpAdapter` might not be available in the
  //   // constructor method, thus we should resolve it here.
  //   const { httpAdapter } = this.httpAdapterHost;
  //
  //   const ctx = host.switchToHttp();
  //
  //   const httpStatus =
  //     exception instanceof HttpException
  //       ? exception.getStatus()
  //       : HttpStatus.INTERNAL_SERVER_ERROR;
  //
  //   const responseBody = {
  //     statusCode: httpStatus,
  //     timestamp: new Date().toISOString(),
  //     path: httpAdapter.getRequestUrl(ctx.getRequest()),
  //   };
  //
  //   httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  // }
}
