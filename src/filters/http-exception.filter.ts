import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

export interface ApiResponse<T> {
  error: boolean;
  msg: string;
  data: T | null;
}

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    const exceptionResponse = exception.getResponse() as any;

    console.log('exceptionResponse', exceptionResponse);

    const msg =
      typeof exceptionResponse === 'string'
        ? exceptionResponse
        : typeof exceptionResponse.message === 'string'
          ? exceptionResponse.message
          : typeof exceptionResponse.message[0] === 'string'
            ? exceptionResponse.message[0]
            : 'An error occurred';

    const errorResponse: ApiResponse<null> = {
      error: true,
      msg: msg || 'An error occurred',
      data: null,
    };

    response.status(status).json(errorResponse);
  }
}
