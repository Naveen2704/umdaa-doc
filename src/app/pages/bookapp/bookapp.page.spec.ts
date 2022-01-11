import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookappPage } from './bookapp.page';

describe('BookappPage', () => {


  let component: BookappPage;
  let fixture: ComponentFixture<BookappPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookappPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookappPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
