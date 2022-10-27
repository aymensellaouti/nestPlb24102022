import { IsNumber, IsOptional, MinLength } from "class-validator";

export class AddSkillDto {
  @IsNumber()
  @IsOptional()
  id: number;

  @IsOptional()
  @MinLength(10)
  designation: string;
}
