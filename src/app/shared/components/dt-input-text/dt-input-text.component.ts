import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  Output,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ReplaySubject } from 'rxjs';
import { DT_ICONS, DtButtonComponent } from '../dt-button/dt-button.component';

export type InputType = 'text' | 'password' | 'email';

@Component({
  selector: 'dt-input-text',
  standalone: true,
  imports: [CommonModule, DtButtonComponent],
  templateUrl: './dt-input-text.component.html',
  styleUrl: './dt-input-text.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DtInputTextComponent),
      multi: true,
    },
  ],
})
export class DtInputTextComponent implements ControlValueAccessor {
  //#region INPUTS
  @Input({ required: true }) header: string = '';
  @Input() bgColorClass: string = 'bg-white';
  @Input() infoIcon: DT_ICONS | null = 'arrow-right';
  @Input() required: boolean = false;
  @Input() pattern: string | null = null;
  @Input() allowNullable: boolean = true;
  //#endregion INPUTS

  //#region OUTPUTS
  @Output() keydownEnter = new EventEmitter<void>();
  //#endregion OUTPUTS

  //#region TYPE
  @Input({ required: true, alias: 'type' }) set typeSetter(v: InputType) {
    this.type$.next(v);
    this.typeToUse$.next(v);
  }
  public type$ = new ReplaySubject<InputType>(1);
  public typeToUse$ = new ReplaySubject<InputType>(1);
  //#endregion TYPE

  //#region CONTROL VALUE ACCESSOR
  public writeValue(v: string): void {}

  public registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
  private onChange = (value: string) => {};
  private onTouched = () => {};
  private disabled = false;
  //#endregion CONTROL VALUE ACCESSOR

  public onInput(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const value = inputElement.value;
    this.onChange(value);
    this.onTouched();
  }
}
