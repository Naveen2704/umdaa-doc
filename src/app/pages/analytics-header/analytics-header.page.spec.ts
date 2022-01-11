import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyticsHeaderPage } from './analytics-header.page';

describe('AnalyticsHeaderPage', () => {
  let component: AnalyticsHeaderPage;
  let fixture: ComponentFixture<AnalyticsHeaderPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalyticsHeaderPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalyticsHeaderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
