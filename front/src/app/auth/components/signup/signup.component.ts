import {Component, isDevMode, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators} from "@angular/forms";
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

  constructor(private fBuilder: FormBuilder, private authService: AuthService) {
    this.signupForm = this.fBuilder.group({
      // password: new FormControl( '', [Validators.required]),
      // repeatPassword: new FormControl('', [Validators.required, this.passwordConfirming]),
      username: this.fBuilder.control('', [Validators.required]),
      password: ['', [Validators.required]],
      repeatPassword: ['', [Validators.required]],
    }, {validator: this.repeatPassValidator})
  }

  onSignup() {
    const signupData = this.signupForm.value;

    this.authService.signup({...signupData, repeatPassword: null}).subscribe(
      data => console.log(data)
    )
  }


  ngOnInit(): void {
  }

  private repeatPassValidator: ValidatorFn = (group: AbstractControl) => {
    const password = group.get('password')?.value;
    const repeatPassword = group.get('repeatPassword')?.value;
    return password === repeatPassword ? null : {missmatch: true};
  };
}
