import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeleslottimingsComponent } from './teleslottimings.component';

describe('TeleslottimingsComponent', () => {
  let component: TeleslottimingsComponent;
  let fixture: ComponentFixture<TeleslottimingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeleslottimingsComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeleslottimingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
