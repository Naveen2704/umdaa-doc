import { TestBed } from '@angular/core/testing';

import { GbusinessService } from './gbusiness.service';

describe('GbusinessService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GbusinessService = TestBed.get(GbusinessService);
    expect(service).toBeTruthy();
  });
});
