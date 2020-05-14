import { TestBed } from '@angular/core/testing';

import { StatusEducationService } from './status-education.service';

describe('StatusEducationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StatusEducationService = TestBed.get(StatusEducationService);
    expect(service).toBeTruthy();
  });
});
