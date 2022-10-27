import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Type } from "class-transformer";

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
  @IsString()
  @IsNotEmpty()
  path: string;
}
