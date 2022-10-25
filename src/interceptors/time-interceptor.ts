import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, tap } from "rxjs";
import { map } from "rxjs/operators";

@Injectable()
export class TimeInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const startDate = new Date();
    return next.handle().pipe(
      tap(
        () => {
          console.log(`Duration: = ${new Date().getTime() - startDate.getTime()} ms`);
        }
      ),
      map( reponse => {
        return reponse ?? ''
      }),
      map( data => ({data}))
    );
  }
}
