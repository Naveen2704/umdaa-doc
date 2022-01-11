import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestagainComponent } from './requestagain.component';

describe('RequestagainComponent', () => {
  let component: RequestagainComponent;
  let fixture: ComponentFixture<RequestagainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestagainComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestagainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
