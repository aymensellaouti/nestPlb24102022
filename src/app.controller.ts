import { Controller, Get, Param } from "@nestjs/common";
import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";


@Controller()
export class AppController {
  @Get("first/:qqeChose?")
  getHello(@Param("qqeChose") qqeChose = "default"): string {
    return qqeChose;
  }

  @Get("obs")
  getObservable() {
    const observable = new Observable<number>(
      (observer) => {
        let i = 5;
        setInterval(() => {
          if (!i) {
            observer.complete();
          }
          observer.next(i--);
        }, 1000);
      });
    observable
      .pipe(
        map(x => x * 3)
      )
      .subscribe((val) => {
      console.log(val);
    });
    return of(1,2,3);
  }
}
