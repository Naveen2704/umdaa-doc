import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiComponent } from './fi.component';

describe('FiComponent', () => {
  let component: FiComponent;
  let fixture: ComponentFixture<FiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
