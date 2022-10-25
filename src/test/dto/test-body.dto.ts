import { IsNumber, MinLength, ValidationArguments } from "class-validator";
import { Type } from "class-transformer";

export class TestBodyDto {
  // @Type(TypeVersLequelOnTransforme => Number)
  @IsNumber({
  }, {
    message: (validationArgs: ValidationArguments) => {
      return `la ${validationArgs.value} de la propriété ${validationArgs.property} de la 
      classe ${validationArgs.targetName} doit valider ${validationArgs.constraints[0]}`
    }
  })
  age: number;

  skills: string[];
}
