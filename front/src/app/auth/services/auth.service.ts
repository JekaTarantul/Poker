import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {LoginModel, SignupModel} from "../../models/auth.models";

@Injectable({providedIn: 'root'})
export class AuthService {

  constructor(private http: HttpClient) {}

  login(loginData: LoginModel): Observable<unknown> {
    return this.http.post(environment.API_URL + 'auth/login', loginData);
  }

  signup(signupData: SignupModel): Observable<unknown> {
    console.log(1)
      return this.http.post(environment.API_URL + 'auth/signup', signupData);
  }
}
