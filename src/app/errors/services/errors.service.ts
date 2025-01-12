import { Injectable } from '@angular/core';
import { ReplaySubject, Subject } from 'rxjs';
import { IError } from '../models/errors.models';

@Injectable({
  providedIn: 'root',
})
export class ErrorsService {
  public errors = new Subject<IError<any>[]>();

  public add(error: IError<any>) {
    // const newError = new ImpError(
    //   {
    //     ...error,
    //     Message: IMP_ERRORS[error.ErrorCode]
    //       ? (this.typedTranslateService.translation.ERRORS as any)[
    //           IMP_ERRORS[error.ErrorCode]
    //         ].header
    //       : this.typedTranslateService.translation.ERRORS.DEFAULT_ERROR.header,
    //   },
    //   this.errors,
    // );
    // const errorIndex = this.errors.value.findIndex(
    //   (error) => error.ErrorCode === newError.ErrorCode,
    // );
    // if (errorIndex !== -1) {
    //   this.errors.value[errorIndex].Unpin();
    //   this.errors.value.splice(errorIndex, 1);
    // }
    this.errors.next([error]);
  }
}
