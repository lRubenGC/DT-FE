export interface IError<TBody> {
  Message: string;
  Endpoint: string;
  ErrorCode: number;
  Payload: TBody;
  Status: number | null;
}
