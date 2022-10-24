import { Controller, Get, Param } from "@nestjs/common";


@Controller()
export class AppController {
  @Get('first/:qqeChose?')
  getHello(@Param('qqeChose') qqeChose = 'default'): string {
    return qqeChose;
  }
}
