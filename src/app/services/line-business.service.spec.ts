import { TestBed } from '@angular/core/testing';

import { LineBusinessService } from './line-business.service';

describe('LineBusinessService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LineBusinessService = TestBed.get(LineBusinessService);
    expect(service).toBeTruthy();
  });
});
