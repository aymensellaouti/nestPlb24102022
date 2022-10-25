import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  HttpStatus,
  Param,
  ParseArrayPipe,
  ParseIntPipe, Post
} from "@nestjs/common";
import { TestBodyDto } from "./dto/test-body.dto";
import { ArrayToStringPipe } from "../generics/pipes/array-to-string.pipe";

@Controller('test')
export class TestController {
  @Post(':id?')
  test(@Param('id', new DefaultValuePipe(10),
    new ParseIntPipe({errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE}
  )) id: number,
       @Body('skills',
         new ParseArrayPipe({items: String}),
         ArrayToStringPipe
       ) skills: string[]
       ) {
    return skills;
  }
}
