import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  UseGuards, Req
} from "@nestjs/common";
import { CvService } from './cv.service';
import { CreateCvDto } from './dto/create-cv.dto';
import { UpdateCvDto } from './dto/update-cv.dto';
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { filename } from "../generics/upload/get-filename.upload";
import { AuthGuard } from "@nestjs/passport";

@Controller('cv')
@UseGuards(AuthGuard('jwt'))
export class CvController {
  constructor(private readonly cvService: CvService) {}

  @Post()

  @UseInterceptors(FileInterceptor(
    'file',
    {
      storage: diskStorage(
        {
          destination: 'public/uploads',
          filename
        }
      )
    }
  ))
  create(
    @Body() createCvDto: CreateCvDto,
    @UploadedFile() file: Express.Multer.File,
    @Req() request
  ) {
    console.log('user', request.user);
    console.log(createCvDto);
    console.log(file);
    if (file) {
      createCvDto.path = 'upload/' + file.filename;
    }
    return this.cvService.create(createCvDto);
  }

  @Get()
  findAll() {
    return this.cvService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cvService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCvDto: UpdateCvDto) {
    return this.cvService.update(+id, updateCvDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cvService.remove(+id);
  }
}
