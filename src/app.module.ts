import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TestModule } from './test/test.module';
import { TodoModule } from './todo/todo.module';
import { CommonModule } from './common/common.module';
import { ConfigModule, ConfigService } from "@nestjs/config";
import { devConfig } from "./config/dev.config";
import { preprodConfig } from "./config/preprod.config";
import { getConfig } from "./generics/get-config.config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PersonneEntity } from "./test/entity/personne.entity";
import { TodoEntity } from "./todo/entity/todo.entity";
import { SkillModule } from './skill/skill.module';
import { CvModule } from './cv/cv.module';
import { UserModule } from './user/user.module';
import { MulterModule } from "@nestjs/platform-express";
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TestModule,
    TodoModule,
    CommonModule,
    ConfigModule.forRoot({
      isGlobal:true,
      load:[getConfig()]
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        return {
          type: 'mysql',
          host:  configService.get('DB.HOST'),
          username:  configService.get('DB.USER') ,
          password:  configService.get('DB.PASSWORD'),
          database:  configService.get('DB.NAME'),
          port: +configService.get('DB.PORT'),
          autoLoadEntities: true,
          logging: true,
          synchronize: true
        }
      },
      inject: [ConfigService]
    }),
    SkillModule,
    CvModule,
    UserModule,
    MulterModule.register(),
    AuthModule
  ],
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
