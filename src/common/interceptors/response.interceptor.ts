import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

export interface ResponseFormat<T> {
  data: T;
  statusCode: number;
  timestamp: string;
}

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept<T>(context: ExecutionContext, next: CallHandler): Observable<any> {
    const httpContext = context.switchToHttp();
    const response = httpContext.getResponse();

    return next.handle().pipe(
      map((data: T) => {
        return {
          data,
          statusCode: response.statusCode,
          timestamp: new Date().toISOString(),
        } as ResponseFormat<T>;
      }),
    );
  }
}
