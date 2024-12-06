import { CommonModule } from '@angular/common';
import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import {
  combineLatest,
  debounceTime,
  map,
  merge,
  Observable,
  ReplaySubject,
  startWith,
  Subject,
  tap,
} from 'rxjs';

@Component({
  selector: 'dt-dropdown',
  standalone: true,
  imports: [CommonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DtDropdownComponent),
      multi: true,
    },
  ],
  templateUrl: './dt-dropdown.component.html',
  styleUrl: './dt-dropdown.component.scss',
})
export class DtDropdownComponent implements ControlValueAccessor {
  //#region INPUTS
  @Input({ required: true }) header: string = '';
  @Input({ alias: 'options', required: true }) set optionsSetter(
    v: string[] | number[]
  ) {
    if (!v) return;
    this.options.next(v);
  }
  private options = new ReplaySubject<string[] | number[]>(1);
  //#endregion INPUTS

  //#region TEXT INPUT
  public onTextChange = new Subject<Event>();
  private onTextChange$: Observable<string> = this.onTextChange.pipe(
    debounceTime(300),
    map((event) => (event.target as HTMLInputElement).value),
    tap((v) => console.log('value', v)),
    startWith('')
  );
  //#endregion TEXT INPUT

  //#region OPTIONS
  public options$ = combineLatest([this.options, this.onTextChange$]).pipe(
    map(([options, textSearched]) =>
      options.filter((option) =>
        option.toString().toLowerCase().includes(textSearched.toLowerCase())
      )
    )
  );
  //#endregion OPTIONS

  //#region VALUE CHANGES
  private onFnChange = new Subject();
  private onFnChange$: Observable<string> = this.onFnChange.pipe(
    tap((a) => console.log(a)),
    map(() => '')
  );
  private valueChange$ = new Subject<string | number>();
  //#endregion VALUE CHANGES

  //#region VALUE
  public value$: Observable<string | number> = merge(
    this.valueChange$,
    this.onFnChange$
  );
  //#region VALUE

  onSelect(option: string | number): void {
    this.valueChange$.next(option);
    this.onChange(option);
    this.onTouched();
  }

  //#region DEFAULT ANGULAR FNS
  private onChange: (value: string | number) => void = () => {};
  private onTouched: () => void = () => {};
  public writeValue(v: string): void {
    this.valueChange$.next(v);
  }
  public registerOnChange(fn: any): void {
    // this.onFnChange.next(fn);
    this.onChange = fn;
  }
  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  public setDisabledState(isDisabled: boolean): void {}
  //#endregion DEFAULT ANGULAR FNS
}
