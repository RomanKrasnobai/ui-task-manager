import {FormControl} from "@angular/forms";

export interface AuthDataFormModel {
  email: FormControl<string | null>;
  password: FormControl<string | null>;
}
