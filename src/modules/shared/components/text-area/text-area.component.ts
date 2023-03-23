import {ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, Input} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
  selector: 'app-text-area',
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextAreaComponent),
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextAreaComponent implements ControlValueAccessor {
  value: string | undefined;

  private onChange!: (value: string) => void;
  private onTouched!: () => void;

  @Input() placeholder = 'Add note';

  constructor(private cd: ChangeDetectorRef) { }

  onInputValueChange(event: Event): void {
    const targetElement = event.target as HTMLTextAreaElement;
    const value = targetElement.value;

    this.onChange(value);
  }

  writeValue(value: string): void {
    this.value = value;
    this.cd.detectChanges();
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}
