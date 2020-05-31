import { TestBed } from '@angular/core/testing';

import { JobOpeningService } from './job-opening.service';

describe('JobOpeningService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: JobOpeningService = TestBed.get(JobOpeningService);
    expect(service).toBeTruthy();
  });
});
