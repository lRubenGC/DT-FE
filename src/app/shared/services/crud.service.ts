import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';

type CurdHttpOptions = {};

type FrontResponse<T> = FrontDefaultResponse<T> | FrontErrorResponse;
interface FrontDefaultResponse<T> {
  ok: true;
  data: T;
}
type ErrorType = { error: number; msg: string };
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
    options: CurdHttpOptions = {}
  ): Observable<FrontResponse<TResponse>> {
    const absoluteUrl = url.startsWith('/') ? url : `/${url}`;
    return this.http.post(absoluteUrl, body).pipe(
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
            []
          ),
        })
      ),
      map((response: BackResponse<TResponse>) =>
        response.ok
          ? { ok: true, data: response.data }
          : { ok: false, errors: response.errors }
      )
    );
  }
}
