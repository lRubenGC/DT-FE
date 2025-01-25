import { HttpContextToken } from '@angular/common/http';

export interface IError<TBody> {
  Message: string;
  Endpoint: string;
  ErrorCode: number;
  Payload: TBody;
  Status: number | null;
}

export const SKIP_ERRORS_INTERCEPTOR = new HttpContextToken<boolean>(
  () => false,
);
