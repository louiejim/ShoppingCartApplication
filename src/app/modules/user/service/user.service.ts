import { Users } from './../../../shared/model/users.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getbyUserName(username: any) {
    return this.http.get<Users[]>(`${this.baseUrl}/users?username=${username}`);
  }

  getForgotPassword(username: any, email: any, mobile: any) {
    return this.http.get<Users[]>(
      `${this.baseUrl}/users?username=${username}&email=${email}&mobile=${mobile}`
    );
  }
  //getting All users

  getAll() {
    return this.http.get(`${this.baseUrl}/users`);
  }

  // geting list of roles

  gerRole() {
    return this.http.get(`${this.baseUrl}/role`);
  }
  //  Update User:
  updateUser(input: any, id: any) {
    return this.http.put(`${this.baseUrl}/users/${id}`, input);
  }

  // Getting user by Id
  getbyUserById(id: any): Observable<Users[]> {
    return this.http.get<Users[]>(`${this.baseUrl}/users?id=${id}`);
  }

  isLogin(): boolean {
    return (
      sessionStorage.getItem('username') != null &&
      sessionStorage.getItem('active') != 'false'
    );
  }

  getUserRole() {
    return sessionStorage.getItem('') != ''
      ? sessionStorage.getItem('role')?.toString()
      : '';
  }
}
