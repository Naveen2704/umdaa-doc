import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DailogComponent } from './dailog.component';

describe('DailogComponent', () => {
  let component: DailogComponent;
  let fixture: ComponentFixture<DailogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DailogComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DailogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
