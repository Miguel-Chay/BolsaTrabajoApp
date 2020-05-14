import { TestBed } from '@angular/core/testing';

import { StudyProgrammeService } from './study-programme.service';

describe('StudyProgrammeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StudyProgrammeService = TestBed.get(StudyProgrammeService);
    expect(service).toBeTruthy();
  });
});
