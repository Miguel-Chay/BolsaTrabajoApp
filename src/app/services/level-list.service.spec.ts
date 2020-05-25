import { TestBed } from '@angular/core/testing';

import { LevelListService } from './level-list.service';

describe('LevelListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LevelListService = TestBed.get(LevelListService);
    expect(service).toBeTruthy();
  });
});
