import { Global, Module } from "@nestjs/common";
import {v4 as uuidV4} from 'uuid';


const UUID_PROVIDER = {
  provide: 'uuid',
  useValue: uuidV4
}
@Global()
@Module({
  providers: [UUID_PROVIDER],
  exports: [UUID_PROVIDER]
})
export class CommonModule {}
