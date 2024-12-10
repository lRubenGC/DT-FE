import { CommonModule } from '@angular/common';
import { Component, forwardRef, Input } from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { ClickOutsideDirective } from '@shared/directives/click-outside-directive';
import {
  BehaviorSubject,
  combineLatest,
  debounceTime,
  map,
  merge,
  Observable,
  ReplaySubject,
  share,
  startWith,
  Subject,
  tap,
} from 'rxjs';
import { DtButtonComponent } from '../dt-button/dt-button.component';

@Component({
  selector: 'dt-dropdown',
  standalone: true,
  imports: [
    CommonModule,
    DtButtonComponent,
    ClickOutsideDirective,
    FormsModule,
  ],
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
  @Input() allowNullable: boolean = true;
  //#endregion INPUTS

  //#region VALUE
  public valueChanges$ = new ReplaySubject<string | number | null>(1);
  public value$: Observable<string | number | null> = this.valueChanges$.pipe(
    map((v) => v ?? ''),
    share()
  );
  //#endregion VALUE

  //#region FILTER
  public onFilterChange = new Subject<Event>();
  public filterValue = new Subject<string>();
  private onFilterChange$: Observable<string | number | null> = merge(
    this.onFilterChange.pipe(
      map((event) => (event.target as HTMLInputElement).value)
    ),
    this.filterValue.pipe(tap((v) => console.log(v)))
  );
  //#endregion FILTER

  //#region OPTIONS
  @Input({ alias: 'options', required: true }) set optionsSetter(
    v: string[] | number[]
  ) {
    if (!v) return;
    this.options.next(v);
  }
  private options = new ReplaySubject<string[] | number[]>(1);
  public options$ = combineLatest([
    this.options,
    this.onFilterChange$.pipe(startWith('')),
  ]).pipe(
    map(([options, textSearched]) =>
      options.filter((option) =>
        option
          .toString()
          .toLowerCase()
          .includes(String(textSearched).toLowerCase())
      )
    )
  );
  //#endregion OPTIONS

  //#region VISIBILITY
  public dropdownVisibility = new BehaviorSubject<{ visible: boolean }>({
    visible: false,
  });
  public dropdownVisibility$ = this.dropdownVisibility.pipe(share());
  //#endregion VISIBILITY

  //#region DEFAULT ANGULAR FNS
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
  //#endregion DEFAULT ANGULAR FNS

  public onSelect(option: string | number | null): void {
    this.valueChanges$.next(option);
    this.dropdownVisibility.next({ visible: false });
    this.onChange(option);
    this.onTouched();
  }
}
