import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class ListUsersService {
  private apiUrl = `${environment.apiUrl}/users`; // Adjust the URL as needed

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<any> {
    const token = localStorage.getItem('token'); // Retrieve the token from localStorage
    console.log("Token " , token)
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(this.apiUrl, {headers});
  }

  logout(): Observable<any> {
    const token = localStorage.getItem('token'); // Retrieve the token from localStorage
    console.log("Token " , token)
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<any>(this.apiUrl + '/logout',{},  { headers })
  }
}
