import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FBsigninComponent } from './fbsignin.component';

describe('FBsigninComponent', () => {
  let component: FBsigninComponent;
  let fixture: ComponentFixture<FBsigninComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FBsigninComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FBsigninComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
