import { TestBed } from '@angular/core/testing';

import { ConfirmdailogService } from './confirmdailog.service';

describe('ConfirmdailogService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConfirmdailogService = TestBed.get(ConfirmdailogService);
    expect(service).toBeTruthy();
  });
});
