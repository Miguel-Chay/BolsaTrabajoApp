import { TestBed } from '@angular/core/testing';

import { SubjectAreaService } from './subject-area.service';

describe('SubjectAreaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SubjectAreaService = TestBed.get(SubjectAreaService);
    expect(service).toBeTruthy();
  });
});
