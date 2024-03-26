import { Users } from './../../../shared/model/users.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseUrl = 'http://localhost:3000';
  temp: any;

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get(`${this.baseUrl}/users`);
  }

  getbyUserName(username: any) {
    return this.http.get<Users[]>(`${this.baseUrl}/users?username=${username}`);
  }
  //http://localhost:3000/users?username=user1&email=user1@example.com&mobile=1234567890

  getForgotPassword(username: any, email: any, mobile: any) {
    return this.http.get<Users[]>(
      `${this.baseUrl}/users?username=${username}&email=${email}&mobile=${mobile}`
    );
  }
  // createUser(user: Users) {
  //   return this.http.post(`${this.baseUrl}/users`, user);
  // }

  // updateUser(user: Users, id: number) {
  //   return this.http.put(`${this.baseUrl}/users/${id}`, user);
  // }

  isLogin() {
    return sessionStorage.getItem('username') != null;
  }
}
