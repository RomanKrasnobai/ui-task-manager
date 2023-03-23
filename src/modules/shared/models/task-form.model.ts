import {FormControl} from "@angular/forms";

export interface TaskFormModel {
  description: FormControl<string | null>;
  completed: FormControl<boolean | null>;
}
