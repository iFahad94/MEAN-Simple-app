import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}

  private apiLoginUrl = `${environment.apiUrl}/users`; // Adjust the URL as needed

  login(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post<any>(this.apiLoginUrl + '/login', credentials);
  }

  logout(): Observable<any> {
    return this.http.post<any>(this.apiLoginUrl + '/logout', "");
  }
}
