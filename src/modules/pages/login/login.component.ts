import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ErrorStateMatcher} from '@angular/material/core';
import {AuthService} from "../../core/auth/services/auth.service";
import {AuthDataFormModel} from "../../core/auth/models/auth-data-form.model";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
  login: FormGroup = new FormGroup<AuthDataFormModel>({
    email: new FormControl('gena@company.com', Validators.required),
    password: new FormControl('Qwerty!@', Validators.required)
  });

  constructor(private authService: AuthService) {
  }

  // matcher = new MyErrorStateMatcher();

  submit(): void {
    this.authService.login(this.login.value).subscribe();
  }
}
