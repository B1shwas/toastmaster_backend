import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  Global,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

interface ErrorResponse {
  status: number;
  error: string | object;
  timestamp: string;
  path: string;
}

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private static readonly INTERNAL_SERVER_ERROR_MESSAGE =
    'Internal Server Error';
  private static readonly UNEXPECTED_ERROR_MESSAGE =
    'An unexpected error occurred';

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    let message: string | object;

    if (exception instanceof HttpException) {
      const res = exception.getResponse();
      message = typeof res === 'string' ? res : res['message'] || res;
    } else if (exception instanceof Error) {
      message = GlobalExceptionFilter.INTERNAL_SERVER_ERROR_MESSAGE;
    } else {
      message = GlobalExceptionFilter.UNEXPECTED_ERROR_MESSAGE;
    }

    response.status(status).json({
      status,
      error: message,
      timestamp: new Date().toISOString(),
      path: request.url,
    } as ErrorResponse);
  }
}
