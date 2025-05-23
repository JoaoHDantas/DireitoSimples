import { TestBed } from '@angular/core/testing';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule, HttpHandler, HttpRequest } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';
import { AuthService } from './auth.service';

describe('AuthInterceptor', () => {
  let authService: AuthService;
  let interceptor: AuthInterceptor;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        AuthInterceptor,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptor,
          multi: true
        },
        AuthService
      ]
    });

    authService = TestBed.inject(AuthService);
    interceptor = TestBed.inject(AuthInterceptor);
  });

  it('deve ser criado', () => {
    expect(interceptor).toBeTruthy();
  });

  it('deve adicionar o header Authorization se houver token', () => {
    spyOn(authService, 'getAuthToken').and.returnValue('fake-token');

    const httpRequest = new HttpRequest('GET', '/test');
    const httpHandler: HttpHandler = {
      handle: (req) => {
        expect(req.headers.has('Authorization')).toBeTrue();
        expect(req.headers.get('Authorization')).toBe('Bearer fake-token');
        return {} as any;
      }
    };

    interceptor.intercept(httpRequest, httpHandler);
  });
});
