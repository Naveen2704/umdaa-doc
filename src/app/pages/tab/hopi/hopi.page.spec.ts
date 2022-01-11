import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HopiPage } from './hopi.page';

describe('HopiPage', () => {
  let component: HopiPage;
  let fixture: ComponentFixture<HopiPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HopiPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HopiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
