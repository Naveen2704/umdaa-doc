import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeinfoPage } from './seinfo.page';

describe('SeinfoPage', () => {
  let component: SeinfoPage;
  let fixture: ComponentFixture<SeinfoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeinfoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeinfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
