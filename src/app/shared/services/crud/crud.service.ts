import {
  HttpClient,
  HttpContext,
  HttpHeaders,
  HttpParams,
  HttpParamsOptions,
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { SKIP_ERRORS_INTERCEPTOR } from 'src/app/errors/models/errors.models';

type HttpHeaderOptions = string | { [name: string]: string | string[] };
type ResponseTypes = 'arraybuffer' | 'blob' | 'json' | 'text';
type CrudHttpOptions = {
  headers?: HttpHeaderOptions;
  params?: HttpParamsOptions;
  responseType?: ResponseTypes;
  observe?: 'body' | 'events' | 'response';
  reportProgress?: boolean;
  skipErrorsInterceptor?: boolean;
};

export type FrontResponse<T> = FrontDefaultResponse<T> | FrontErrorResponse;
interface FrontDefaultResponse<T> {
  ok: true;
  data: T;
}
export type ErrorType = { error: number; msg: string };
interface FrontErrorResponse {
  ok: false;
  errors: ErrorType[];
}

type BackResponse<T> = BackDefaultResponse<T> | BackErrorResponse;
interface BackDefaultResponse<T> {
  ok: true;
  data: T;
}
interface BackErrorResponse {
  ok: false;
  errors: ErrorType[];
}

@Injectable({
  providedIn: 'root',
})
export class CrudService {
  private readonly http = inject(HttpClient);

  public post<TBody = any, TResponse = any>(
    url: string,
    body: TBody,
    options: CrudHttpOptions = {},
  ): Observable<FrontResponse<TResponse>> {
    const absoluteUrl = url.startsWith('/') ? url : `/${url}`;
    return this.http
      .post(absoluteUrl, body, {
        ...(options as any),
        headers: new HttpHeaders(options.headers),
        params: new HttpParams(options.params),
        context: new HttpContext().set(
          SKIP_ERRORS_INTERCEPTOR,
          options.skipErrorsInterceptor,
        ),
      })
      .pipe(
        catchError<any, Observable<FrontErrorResponse>>((res) =>
          of({
            ok: false,
            errors: res.error.errors.reduce(
              (acc: ErrorType[], curr: ErrorType) => [
                ...acc,
                {
                  error: curr.error,
                  msg: curr.msg,
                },
              ],
              [],
            ),
          }),
        ),
        map((response: BackResponse<TResponse>) =>
          response.ok
            ? { ok: true, data: response.data }
            : { ok: false, errors: response.errors },
        ),
      );
  }
}
