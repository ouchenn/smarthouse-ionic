import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenServiceService } from './services/token-service.service';

@Injectable()
export class Interceptor implements HttpInterceptor {
  constructor(private tokenService: TokenServiceService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.tokenService.getToken()}`,
      },
    });
    return next.handle(request);
  }
}
