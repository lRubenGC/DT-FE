import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ErrorType } from '@shared/services/crud/crud.service';
import { catchError, throwError } from 'rxjs';
import { DT_ERRORS } from '../models/errors.constants';
import { ErrorsService } from '../services/errors.service';

export const errorsInterceptor: HttpInterceptorFn = (req, next) => {
  const errorsService = inject(ErrorsService);
  const { url, body, context } = req;

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      // if (!context.get(SKIP_ERRORS_INTERCEPTOR)) {
      error.error.errors.forEach((e: ErrorType) =>
        errorsService.add({
          Message: e.msg ?? DT_ERRORS[1],
          Endpoint: url,
          ErrorCode: e.error ?? 0,
          Payload: body,
          Status: error.status ?? null,
        }),
      );
      // }
      return throwError(() => error);
    }),
  );
};
