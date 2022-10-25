import { Global, MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import {v4 as uuidV4} from 'uuid';
import { T1Middleware, T3Middleware, T4Middleware } from "../middleware/functions.middleware";


const UUID_PROVIDER = {
  provide: 'uuid',
  useValue: uuidV4
}
@Global()
@Module({
  providers: [UUID_PROVIDER],
  exports: [UUID_PROVIDER]
})
export class CommonModule implements NestModule{
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(T4Middleware)
      .forRoutes('')
    consumer.apply(T3Middleware)
      .forRoutes('')
  }
}{}
