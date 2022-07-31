import { TestBed } from '@angular/core/testing';

import { LevelServiceService } from './level-service.service';

describe('LevelServiceService', () => {
  let service: LevelServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LevelServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
