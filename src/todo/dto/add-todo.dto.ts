import { MaxLength, MinLength } from "class-validator";
import { ErrorMessages } from "../../generics/error-messages.error";

export class AddTodoDto {
  @MinLength(3, {message: ErrorMessages.taille()})
  name: string;
  @MinLength(3,{message: ErrorMessages.taille()})
  @MaxLength(10,{message: ErrorMessages.taille(false)})
  description: string;
}
