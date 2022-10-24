import {Component, isDevMode, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private authService: AuthService) {
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

    console.log(loginData)
    this.authService.login(loginData).subscribe(
      data => console.log(data)
    );
  }

}
