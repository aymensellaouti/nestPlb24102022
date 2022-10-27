import { IsNumber } from "class-validator";

export class AddSkillDto {
  @IsNumber()
  id: number;
}
