import { TestBed } from '@angular/core/testing';

import { JobOpeningStatusService } from './job-opening-status.service';

describe('JobOpeningStatusService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: JobOpeningStatusService = TestBed.get(JobOpeningStatusService);
    expect(service).toBeTruthy();
  });
});
