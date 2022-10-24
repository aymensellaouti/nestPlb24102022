import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FirstModule } from "./first.module";
import { TestModule } from './test/test.module';
import { TodoModule } from './todo/todo.module';

@Module({
  imports: [TestModule, FirstModule,  TodoModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
