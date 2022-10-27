import { IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { Skill } from "../../skill/entities/skill.entity";
import { CreateSkillDto } from "../../skill/dto/create-skill.dto";
import { AddSkillDto } from "../../skill/dto/add-skill.dto";

export class CreateCvDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  age: number;
  @IsString()
  @IsNotEmpty()
  job: string;
  path: string;
  @Type(() => AddSkillDto )
  @IsOptional()
  skills: Skill[];
}
