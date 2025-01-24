import { CommonModule } from '@angular/common';
import { Component, forwardRef, Input } from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { DtClickOutsideDirective } from '@shared/directives/click-outside-directive';
import {
  BehaviorSubject,
  combineLatest,
  map,
  Observable,
  ReplaySubject,
  share,
  startWith,
  Subject,
} from 'rxjs';
import { DtButtonComponent } from '../dt-button/dt-button.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'dt-input-dropdown',
  standalone: true,
  imports: [
    CommonModule,
    DtButtonComponent,
    DtClickOutsideDirective,
    FormsModule,
    TranslateModule,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DtInputDropdownComponent),
      multi: true,
    },
  ],
  templateUrl: './dt-input-dropdown.component.html',
  styleUrl: './dt-input-dropdown.component.scss',
})
export class DtInputDropdownComponent implements ControlValueAccessor {
  //#region INPUTS
  @Input({ required: true }) header: string = '';
  @Input() allowNullable: boolean = true;
  @Input() disabled: boolean = false;
  //#endregion INPUTS

  //#region VALUE
  public valueChanges$ = new ReplaySubject<string | number | null>(1);
  public value$: Observable<string | number | null> = this.valueChanges$.pipe(
    map((v) => v ?? ''),
    share(),
  );
  //#endregion VALUE

  //#region OPTIONS
  @Input({ alias: 'options', required: true }) set optionsSetter(
    v: string[] | number[],
  ) {
    if (!v) return;
    this.options.next(v);
  }
  private options = new ReplaySubject<string[] | number[]>(1);
  public filterValue = new Subject<string>();
  public options$ = combineLatest([
    this.options,
    this.filterValue.pipe(startWith('')),
  ]).pipe(
    map(([options, textSearched]) =>
      options.filter((option) =>
        option
          .toString()
          .toLowerCase()
          .includes(String(textSearched).toLowerCase()),
      ),
    ),
  );
  //#endregion OPTIONS

  //#region VISIBILITY
  public dropdownVisibility = new BehaviorSubject<{ visible: boolean }>({
    visible: false,
  });
  public dropdownVisibility$ = this.dropdownVisibility.pipe(share());
  //#endregion VISIBILITY

  //#region CONTROL VALUE ACCESSOR
  private onChange: (value: string | number | null) => void = () => {};
  private onTouched: () => void = () => {};
  public writeValue(v: string): void {
    this.valueChanges$.next(v);
  }
  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  public setDisabledState(isDisabled: boolean): void {}
  //#endregion CONTROL VALUE ACCESSOR

  public onSelect(
    option: string | number | null,
    previousOption: string | number | null,
  ): void {
    if (option === previousOption) return;
    this.valueChanges$.next(option);
    this.dropdownVisibility.next({ visible: false });
    console.log(option);
    this.onChange(option);
    this.onTouched();
  }

  public isString(value: unknown): value is string {
    return typeof value === 'string';
  }
}
