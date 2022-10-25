import { MinLength } from "class-validator";

export class AddTodoDto {
  @MinLength(3)
  name: string;
  @MinLength(6)
  description: string;
}
