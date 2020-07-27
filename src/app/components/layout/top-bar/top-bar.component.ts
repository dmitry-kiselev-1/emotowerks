import { Component } from '@angular/core';
import {AppComponent} from '../../../app.component';

@Component({
    selector: 'app-topbar',
    templateUrl: './top-bar.component.html'
})
export class TopBarComponent {

  constructor(public app: AppComponent) {}

}
