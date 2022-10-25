import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {AuthService} from "../auth/services/auth.service";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(request)

    // add auth header with jwt if account is logged in and request is to the api url
    let token = this.authService.getToken();

    if (token) {
      console.log(token)
      request = request.clone({

        setHeaders: { Authorization: 'Bearer ' + token.access_token}
      });

    }

    return next.handle(request);
  }
}
