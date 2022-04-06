import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewlunchComponent } from './viewlunch.component';

describe('ViewlunchComponent', () => {
  let component: ViewlunchComponent;
  let fixture: ComponentFixture<ViewlunchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewlunchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewlunchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
