import {
  HttpErrorResponse,
  HttpInterceptorFn,
  HttpResponse,
} from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { CacheService } from '../../shared/services/cache.service';
import { inject } from '@angular/core';
import { SnackBarService } from '../services/snack-bar.service';
import { SharedService } from '../../shared/services/shared.service';

export const AddHeaderInterceptor: HttpInterceptorFn = (req, next) => {
  const _snackBar = inject(SnackBarService);
  const _sharedService = inject(SharedService);
  const userToken = CacheService.getToken();
  const authReq = req.clone({
    headers: req.headers.set('Authorization', `Bearer ${userToken}`),
  });
  return next(authReq).pipe(
    tap((event) => {
      if (event instanceof HttpResponse) {
        _snackBar.handleApiMessage(event);
      }
    }),
    catchError((error: HttpErrorResponse) => {
      let errorMsg = '';
      if (error.error instanceof ErrorEvent) {
        errorMsg = error.error.message;
        _snackBar.showMessageString(errorMsg, ['error-snack']);
      } else {
        if (error.status == 401) {
          _snackBar.showMessageString('Unauthorized!', ['error-snack']);
          _sharedService.postLogout();
        } else if (error.error != null && error.error.errors != null) {
          _snackBar.showMessageError(error.error, ['error-snack']);
        } else if (error.statusText == 'Unknown Error') {
          _snackBar.showMessageString(
            'A server error happened, please try again later.',
            ['error-snack']
          );
        }
      }
      console.log(errorMsg);
      return throwError(errorMsg);
    })
  );
};
