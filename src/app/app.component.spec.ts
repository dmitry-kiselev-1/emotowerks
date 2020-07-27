import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { TopBarComponent } from './components/layout/top-bar/top-bar.component';
import { SideBarComponent } from './components/layout/side-bar/side-bar.component';
import { RouterTestingModule } from '@angular/router/testing';
describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent,
        TopBarComponent,
        SideBarComponent
      ],
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
