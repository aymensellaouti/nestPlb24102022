import { Body, Controller, DefaultValuePipe, Get, HttpStatus, Param, ParseIntPipe } from "@nestjs/common";
import { TestBodyDto } from "./dto/test-body.dto";

@Controller('test')
export class TestController {
  @Get(':id?')
  test(@Param('id', new DefaultValuePipe(10),
    new ParseIntPipe({errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE}
  )) id: number,
       @Body() testBodyDto: TestBodyDto
       ) {
    return `test value : ${id}`;
  }
}
