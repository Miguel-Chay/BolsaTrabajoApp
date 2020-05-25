import { TestBed } from '@angular/core/testing';

import { LanguageListService } from './language-list.service';

describe('LanguageListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LanguageListService = TestBed.get(LanguageListService);
    expect(service).toBeTruthy();
  });
});
