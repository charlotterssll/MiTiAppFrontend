import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatelunchComponent } from './createlunch.component';

describe('CreatelunchComponent', () => {
  let component: CreatelunchComponent;
  let fixture: ComponentFixture<CreatelunchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatelunchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatelunchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
