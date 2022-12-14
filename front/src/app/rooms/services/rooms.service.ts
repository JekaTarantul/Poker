import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";

@Injectable({providedIn: 'root'})
export class RoomsService {

  constructor(private http: HttpClient) {}

  getRooms(): Observable<any> {
    return this.http.get(environment.API_URL + 'room/rooms', {});
  }

  getRoom(code: string): Observable<any> {
    return this.http.get(environment.API_URL + 'room/' + code);
  }

  createRoom(): Observable<any> {
    return this.http.post(environment.API_URL + 'room/create', {})
  }
}
