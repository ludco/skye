import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SunsignComponent } from './sunsign.component';

describe('SunsignComponent', () => {
  let component: SunsignComponent;
  let fixture: ComponentFixture<SunsignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SunsignComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SunsignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
