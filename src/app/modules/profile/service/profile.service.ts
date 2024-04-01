import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Users } from '../../../shared/model/users.interface';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getUserById(id: any) {
    return this.http.get<Users[]>(`${this.baseUrl}/users?id=${id}`);
  }
  //  Update User:
  updateUser(input: any, id: any) {
    console.log('input', input);
    console.log('id', id);
    return this.http.put(`${this.baseUrl}/users/${id}`, input);
  }
}
