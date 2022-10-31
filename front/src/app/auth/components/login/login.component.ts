import {ChangeDetectionStrategy, Component, HostListener} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {Subject, switchMap, tap} from "rxjs";
import {LoadState, LoadStateType} from "../../../utils/load-state.types";
import {wrap} from "../../../utils/load-state";
import {AuthToken, LoginModel} from "../../../models/auth.models";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {

  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  request$ = new Subject<LoadState<AuthToken>>();

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
  ) {
    this.request$.pipe(
      // untilDestroyed(),
    ).subscribe(v => this.listenRequest(v));
  }

  listenRequest(data: LoadState<AuthToken>) {
    switch (data.type) {
      case LoadStateType.SUCCESS:
        return this.onSuccess(data.value);
    }
  }

  @HostListener('window:keydown', ['$event'])
  onSubmit($event?: KeyboardEvent) {
    if (!$event || $event.key === 'Enter') {
      if (this.loginForm.valid) {
        this.onLogin();
      }
    }
  }

  onLogin() {
    const loginData = this.loginForm.value as LoginModel;
    wrap(this.authService.login(loginData))
      .pipe(
        tap(data => this.request$.next(data)),
        switchMap(() => this.authService.getUser()),
      ).subscribe(user => this.authService.setUserData(user));
  }


  private onSuccess(data: AuthToken) {
    this.authService.setToken(data.access_token);
    this.router.navigate(['rooms']);
  }
}
