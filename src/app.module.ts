import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FirstModule } from "./first.module";
import { TestModule } from './test/test.module';
import { TodoModule } from './todo/todo.module';
import { SayHelloService } from './services/say-hello/say-hello.service';
import { CommonModule } from './common/common.module';
import { FirstMiddleware } from "./middleware/first.middleware";
import { secondMiddleware } from "./middleware/functions.middleware";

@Module({
  imports: [TestModule, TodoModule, CommonModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer): any {
    // consumer.apply(FirstMiddleware)
    //   .forRoutes('')
    //   .apply(secondMiddleware)
    //   .forRoutes('test')
  }
}
