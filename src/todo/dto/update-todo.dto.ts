import { TodoStatusEnum } from "../todo.model";
import { IsEnum, IsNotEmpty, IsOptional, MaxLength, MinLength } from "class-validator";
import { ErrorMessages } from "../../generics/error-messages.error";
import { PartialType } from "@nestjs/mapped-types";
import { AddTodoDto } from "./add-todo.dto";

export class UpdateTodoDto extends PartialType(AddTodoDto) {
  @IsOptional()
  @IsEnum(TodoStatusEnum, {message: ErrorMessages.status})
  status: TodoStatusEnum;
}
