import { Injectable } from '@nestjs/common';
import { LoggerService } from "../logger.service";

@Injectable()
export class SayHelloService {
  constructor(private loggerService: LoggerService) {
  }
  sayHello() {
    this.loggerService.logger('Hello le monde');
  }
}
