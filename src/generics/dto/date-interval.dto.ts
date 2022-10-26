import { IsDate, IsOptional } from "class-validator";
import { Type } from "class-transformer";

export class DateIntervalDto {
  @IsDate()
  @IsOptional()
  @Type(() => Date)
  dateMin: Date;
  @IsDate()
  @IsOptional()
  @Type(() => Date)
  dateMax;
}
