import { TestBed } from '@angular/core/testing';

import { EstudodiarioService } from './estudodiario.service';

describe('EstudodiarioService', () => {
  let service: EstudodiarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EstudodiarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
