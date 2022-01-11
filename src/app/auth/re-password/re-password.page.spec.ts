import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RePasswordPage } from './re-password.page';

describe('RePasswordPage', () => {
  let component: RePasswordPage;
  let fixture: ComponentFixture<RePasswordPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RePasswordPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RePasswordPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
