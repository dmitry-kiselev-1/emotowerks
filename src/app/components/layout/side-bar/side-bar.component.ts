import { Component } from '@angular/core';
import {AppComponent} from '../../../app.component';

@Component({
    selector: 'app-sidebar',
    templateUrl: './side-bar.component.html'
})
export class SideBarComponent {

  constructor(public app: AppComponent) {}

}
