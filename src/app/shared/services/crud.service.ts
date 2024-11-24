import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';

type CurdHttpOptions = {};

type FrontResponse<T> = FrontDefaultResponse<T> | FrontErrorResponse;
interface FrontDefaultResponse<T> {
  ok: true;
  data: T;
}
interface FrontErrorResponse {
  ok: false;
  errors: number[];
}

type BackResponse<T> = BackDefaultResponse<T> | BackErrorResponse;
interface BackDefaultResponse<T> {
  ok: true;
  data: T;
}
interface BackErrorResponse {
  ok: false;
  errors: { error: number; msg: string }[];
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
      map<any, FrontResponse<TResponse>>((response: BackResponse<TResponse>) =>
        response.ok
          ? { ok: true, data: response.data }
          : {
              ok: false,
              errors: response.errors.reduce<number[]>(
                (acc, { error }) => [...acc, error],
                []
              ),
            }
      ),
      catchError<any, Observable<FrontErrorResponse>>((error) =>
        of({ ok: false, errors: [error] })
      )
    );
  }
}
