import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HEPage } from './he.page';

describe('HEPage', () => {
  let component: HEPage;
  let fixture: ComponentFixture<HEPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HEPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HEPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
