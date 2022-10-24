import { TodoStatusEnum } from "../todo.model";

export class UpdateTodoDto {
  name?: string;
  description?: string;
  status?: TodoStatusEnum;
}
