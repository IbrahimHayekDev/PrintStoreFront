import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { LoaderService } from '../../shared/services/loader.service';
import { finalize, Observable } from 'rxjs';
import { inject, Injectable } from '@angular/core';

@Injectable()
export class LoaderInterceptorService implements HttpInterceptor {
  constructor(private loaderService: LoaderService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.loaderService.show();
    return next.handle(req).pipe(finalize(() => this.loaderService.hide()));
  }
}

export const LoaderInterceptor: HttpInterceptorFn = (req, next) => {
  const _loaderService = inject(LoaderService);
  _loaderService.show();
  return next(req).pipe(finalize(() => _loaderService.hide()));
};
