import { MaxLength, MinLength, ValidateNested } from "class-validator";
import { ErrorMessages } from "../../generics/error-messages.error";
import { Owner } from "../model/owner.model";
import { Type } from "class-transformer";

export class AddTodoDto {
  @MinLength(3, {message: ErrorMessages.taille()})
  name: string;
  @MinLength(3,{message: ErrorMessages.taille()})
  @MaxLength(10,{message: ErrorMessages.taille(false)})
  description: string;
  @ValidateNested()
  @Type(() => Owner)
  owner: Owner;

  userId: number;
}
