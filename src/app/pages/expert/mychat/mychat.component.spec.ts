import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MychatComponent } from './mychat.component';

describe('MychatComponent', () => {
  let component: MychatComponent;
  let fixture: ComponentFixture<MychatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MychatComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MychatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
