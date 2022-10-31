import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {AuthToken, LoginModel, SignupModel, User} from "../../models/auth.models";
import {AUTH_KEY} from "../../utils/constants";

@Injectable({providedIn: 'root'})
export class AuthService {
  private token = this.getToken();
  private _currentUser: User;

  get currentUser(): User {
    return this._currentUser || JSON.parse(localStorage.getItem('currentUserData'));
  }

  constructor(private http: HttpClient) {}

  login(loginData: LoginModel): Observable<AuthToken> {
    return this.http.post<AuthToken>(environment.API_URL + 'auth/login', loginData);
  }

  signup(signupData: SignupModel): Observable<AuthToken> {
      return this.http.post<AuthToken>(environment.API_URL + 'auth/signup', signupData);
  }

  setToken(token: string) {
    this.token = token;
    localStorage.setItem(AUTH_KEY, this.token);
  }

  setUserData(data: User) {
    this._currentUser = data;
    localStorage.setItem('currentUserData', JSON.stringify(data));
  }

  getUser(): Observable<any> {
    return this.http.get(environment.API_URL + 'user');
  }

  getToken(): string | null {
    return this.token || localStorage.getItem(AUTH_KEY);
  }
}
