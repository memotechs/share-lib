import { Catch } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import type { RpcExceptionFilter as NestRpcExceptionFilter } from '@nestjs/common';
import { throwError } from 'rxjs';
import type { Observable } from 'rxjs';

@Catch(RpcException)
export class RpcExceptionFilter
  implements NestRpcExceptionFilter<RpcException>
{
  catch(exception: RpcException): Observable<any> {
    // TODO: handle grpc error here instead of throwing it inside each service
    return throwError(() => exception.getError());
  }
}
