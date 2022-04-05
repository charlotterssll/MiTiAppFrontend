import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditlunchComponent } from './editlunch.component';

describe('EditlunchComponent', () => {
  let component: EditlunchComponent;
  let fixture: ComponentFixture<EditlunchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditlunchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditlunchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
