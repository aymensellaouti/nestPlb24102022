import { NestFactory } from "@nestjs/core";
import { AppModule } from "../app.module";
import { SkillService } from "../skill/skill.service";
import { Skill } from "../skill/entities/skill.entity";
import {
  randEmail,
  randFullName,
  randJobTitle,
  randNumber,
  randPassword,
  randSkill,
  randUserName
} from "@ngneat/falso";
import { User } from "../user/entities/user.entity";
import { UserService } from "../user/user.service";
import { CvService } from "../cv/cv.service";
import { Cv } from "../cv/entities/cv.entity";
async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);	// Todo :  Do What you want

  // Todo 1 Seed des skills
  const skillService = app.get(SkillService);
  // Todo 2 Seed des users
  const skills: Skill[] = [];
  for (let i = 0; i <10 ; i++) {
    let skill = new Skill();
    skill.designation = randSkill();
    skills[i] = await skillService.create(skill);
  }
  // Todo 2 Seed des User
  const userService = app.get(UserService);
  const users: User[] = [];
  for (let i = 0; i <10 ; i++) {
    let user = new User();
    user.username = randUserName();
    user.email = randEmail();
    user.password = randPassword();
    users[i] = await userService.create(user);
  }
  // Todo 3 Seed des Cvs
  const cvService = app.get(CvService);
  for (let i = 0; i <10 ; i++) {
    let cv = new Cv();
    cv.job = randJobTitle();
    cv.age = randNumber({min:18, max:65});
    cv.name = randFullName();
    cv.path = '';
    cv.user = users[i];
    cv.skills = [];
    for (let j = 0; j < 3 ; j++) {
      cv.skills.push(skills[j]);
    }
    await cvService.create(cv);
  }
  await app.close();
}

bootstrap();
