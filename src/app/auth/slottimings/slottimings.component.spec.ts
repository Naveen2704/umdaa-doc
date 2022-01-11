import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlottimingsComponent } from './slottimings.component';

describe('SlottimingsComponent', () => {
  let component: SlottimingsComponent;
  let fixture: ComponentFixture<SlottimingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlottimingsComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlottimingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
