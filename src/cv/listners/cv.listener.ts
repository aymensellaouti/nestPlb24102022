import { Cv } from "../entities/cv.entity";
import { CvEvents } from "../../generics/listeners/cv.events";
import { OnEvent } from "@nestjs/event-emitter";

export class CvListener {

  @OnEvent(CvEvents.ADD_CV)
  logAddedCv(addedCv: Cv) {
    console.log('Logged From Listener', addedCv);
  }
}
