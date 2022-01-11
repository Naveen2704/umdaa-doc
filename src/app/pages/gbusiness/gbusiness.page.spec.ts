import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GbusinessPage } from './gbusiness.page';

describe('GbusinessPage', () => {
  let component: GbusinessPage;
  let fixture: ComponentFixture<GbusinessPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GbusinessPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GbusinessPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
