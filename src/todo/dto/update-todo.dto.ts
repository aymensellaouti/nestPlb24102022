import { TodoStatusEnum } from "../todo.model";
import { IsEnum, IsOptional, MaxLength, MinLength } from "class-validator";
import { ErrorMessages } from "../../generics/error-messages.error";

export class UpdateTodoDto {
  @MinLength(3, {message: ErrorMessages.taille()})
  @IsOptional()
  name: string;
  @MinLength(3,{message: ErrorMessages.taille()})
  @MaxLength(10,{message: ErrorMessages.taille(false)})
  @IsOptional()
  description: string;
  @IsOptional()
  @IsEnum(TodoStatusEnum, {message: ErrorMessages.status})
  status: TodoStatusEnum;
}
