import { TestBed } from '@angular/core/testing';

import { UpdateserviceService } from './updateservice.service';

describe('UpdateserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UpdateserviceService = TestBed.get(UpdateserviceService);
    expect(service).toBeTruthy();
  });
});
