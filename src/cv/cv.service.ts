import { Injectable } from '@nestjs/common';
import { CreateCvDto } from './dto/create-cv.dto';
import { UpdateCvDto } from './dto/update-cv.dto';
import { Repository } from "typeorm";
import { Skill } from "../skill/entities/skill.entity";
import { CrudService } from "../generics/service/crud.service";
import { Cv } from "./entities/cv.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { CvEvents } from "../generics/listeners/cv.events";

@Injectable()
export class CvService extends CrudService<Cv>{
  constructor(
    @InjectRepository(Cv)
    private readonly cvRepository: Repository<Cv>,
    private eventEmitter: EventEmitter2
    ) {
    super(cvRepository);
  }

  async create(addDto): Promise<Cv> {
    const cv = await super.create(addDto);
    this.eventEmitter.emit(CvEvents.ADD_CV, cv);
    return cv;
  }
}
