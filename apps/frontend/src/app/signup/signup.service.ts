import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  private apiUrl = `${environment.apiUrl}/users`; // Adjust the URL as needed

  constructor(private http: HttpClient) {}

  signup(signupData: { username: string; email: string; password: string }): Observable<any> {
    return this.http.post<any>(this.apiUrl, signupData);
  }
}
