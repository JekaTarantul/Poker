import {Component, isDevMode, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {environment} from "../../../../environments/environment";
import {SignupModel} from "../../../models/auth.models";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;

  constructor(private authService: AuthService) {
    this.signupForm = new FormGroup({
      login: new FormControl(''),
      password: new FormControl( ''),
      nickname: new FormControl('')
    })
  }

  onSignup() {
    const signupData = this.signupForm.value;

    this.authService.signup(signupData).subscribe(
      data => console.log(data)
    )
  }


  ngOnInit(): void {
  }

}
