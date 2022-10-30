import {Component, HostBinding, HostListener, isDevMode, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {switchMap, tap} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router
    ) {
    const devAccountLogin = 'JekaTarantul';
    const devAccoutPassword = 'privet123';

    this.loginForm = new FormGroup<any>({
      username: new FormControl(isDevMode() ? devAccountLogin : ''),
      password: new FormControl(isDevMode() ? devAccoutPassword : '')
    })
  }

  ngOnInit(): void {

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
    const loginData = this.loginForm.value;
    this.authService.login(loginData)
      .pipe(
        tap(token => this.authService.setToken(token)),
        switchMap(() => this.authService.getUser())
      )
      .subscribe(
      data => {
        this.authService.setUserData(data)
        console.log(this.authService.currentUser)
        this.router.navigate(['rooms'])
      }
    );
  }

}
