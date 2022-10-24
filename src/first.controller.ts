import { Controller, Get } from "@nestjs/common";

@Controller()
export class FirstController {
  @Get('test')
  test() {
    return 'test in First';
  }
}
