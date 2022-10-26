import { TodoStatusEnum } from "../todo.model";
import { IsEnum, IsOptional, IsString } from "class-validator";

export class SearchTodoDto {
  @IsOptional()
  @IsString()
  search: string;
  @IsOptional()
  @IsEnum(TodoStatusEnum)
  status: TodoStatusEnum;
}
