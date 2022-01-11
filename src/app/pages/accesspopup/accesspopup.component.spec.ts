import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccesspopupComponent } from './accesspopup.component';

describe('AccesspopupComponent', () => {
  let component: AccesspopupComponent;
  let fixture: ComponentFixture<AccesspopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccesspopupComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccesspopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
