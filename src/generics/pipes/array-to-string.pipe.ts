import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class ArrayToStringPipe implements PipeTransform {
  transform(skills: string[], metadata: ArgumentMetadata) {
    if (skills) {
      if (metadata.type === 'body') {
        return skills.join('-').toUpperCase();
      }
      return skills;
    }
    throw new BadRequestException('');
  }
}
