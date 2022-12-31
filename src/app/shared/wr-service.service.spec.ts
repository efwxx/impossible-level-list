import { TestBed } from '@angular/core/testing';

import { WrServiceService } from './wr-service.service';

describe('WrServiceService', () => {
  let service: WrServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WrServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
