import { Injectable } from '@nestjs/common';
import { CreateCvDto } from './dto/create-cv.dto';
import { UpdateCvDto } from './dto/update-cv.dto';
import { Repository } from "typeorm";
import { Skill } from "../skill/entities/skill.entity";
import { CrudService } from "../generics/service/crud.service";
import { Cv } from "./entities/cv.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class CvService extends CrudService<Cv>{
  constructor(
    @InjectRepository(Cv)
    private readonly cvRepository: Repository<Cv>) {
    super(cvRepository);
  }
}
