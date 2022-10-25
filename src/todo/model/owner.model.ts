import { IsNotEmpty, MinLength } from "class-validator";
import { ErrorMessages } from "../../generics/error-messages.error";
import { Type } from "class-transformer";

export class Owner {
  @MinLength(3, {message: ErrorMessages.taille()})
  name: string;
  @Type(() => Number)
  @IsNotEmpty()
  age: number;
}
