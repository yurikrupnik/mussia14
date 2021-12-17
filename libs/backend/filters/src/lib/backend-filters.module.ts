import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
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
}
