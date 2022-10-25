import {Component, isDevMode, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

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

  onLogin() {
    const loginData = this.loginForm.value;

    this.authService.login(loginData).subscribe(
      token => {
        this.authService.setToken(token);
        this.router.navigate(['rooms'])
      }
    );
  }

}
