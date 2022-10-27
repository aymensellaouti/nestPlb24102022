import { Injectable } from '@nestjs/common';
import { CrudService } from "../generics/service/crud.service";
import { Skill } from "./entities/skill.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../user/entities/user.entity";

@Injectable()
export class SkillService extends CrudService<Skill>{
  constructor(
    @InjectRepository(Skill)
    private readonly skillRepository: Repository<Skill>) {
    super(skillRepository);
  }
}
