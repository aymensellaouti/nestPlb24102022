import { ValidationArguments } from "class-validator/types/validation/ValidationArguments";

export const ErrorMessages = {
  'status': `Le statut n'est pas correct`,
  'taille': sizeMessageError
}

function sizeMessageError(isMin = true) {

  return (validationArguments: ValidationArguments): string => {
    return `la taille ${isMin ? 'minimale' : 'maximale' } de ${validationArguments.property} est de ${validationArguments.constraints[0]}`
  }
}
