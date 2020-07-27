import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'app';

  mobileMenuActive: boolean;

  onMobileMenuButton (event) {
    //debugger;
    this.mobileMenuActive = !this.mobileMenuActive;
    event.preventDefault();
  }

  hideMobileMenu(event) {
      this.onMobileMenuButton (event)
      //debugger;
    //this.mobileMenuActive = false;
    event.preventDefault();
  }
}
