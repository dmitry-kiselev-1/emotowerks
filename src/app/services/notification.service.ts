import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class NotificationService {

  /*
  lang$: BehaviorSubject<Language> = new BehaviorSubject<Language>(DEFAULT_LANG);
  setLang(lang: Language) {
    this.lang$.next(lang);
  }
  */

  /*
  private subscriptions: Subscription[] = [];
  ngOnInit() {
    const langSub = this.configService.lang$
      .subscribe(() => {
        // ...
      });
    this.subscriptions.push(langSub);
  }
  ngOnDestroy() {
    this.subscriptions
      .forEach(s => s.unsubscribe());
  }
  */
}
