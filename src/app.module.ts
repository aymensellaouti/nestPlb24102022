import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FirstModule } from "./first.module";
import { TestModule } from './test/test.module';
import { TodoModule } from './todo/todo.module';
import { SayHelloService } from './services/say-hello/say-hello.service';
import { CommonModule } from './common/common.module';

@Module({
  imports: [TestModule,  TodoModule, CommonModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
