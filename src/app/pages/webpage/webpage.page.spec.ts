import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebpagePage } from './webpage.page';

describe('WebpagePage', () => {
  let component: WebpagePage;
  let fixture: ComponentFixture<WebpagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebpagePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebpagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
