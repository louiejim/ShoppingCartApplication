import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Users } from '../../../shared/model/users.interface';

@Injectable({
  providedIn: 'root'
})
export class UserListService {

  apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<Users[]> {
    return this.http.get<Users[]>(`${this.apiUrl}/users`).pipe(
      map((users: Users[]) => {
        return users.map(user => ({ ...user, editMode: false }));
      }),
      catchError(this.handleError)
    );
  }

  addUser(user: Users): Observable<Users> {
    return this.http.post<Users>(`${this.apiUrl}/users`, user).pipe(
      catchError(this.handleError)
    );
  }

  updateUser(user: Users): Observable<Users> {
    const url = `${this.apiUrl}/users/${user.id}`;
    return this.http.put<Users>(url, user).pipe(
      catchError(this.handleError)
    );
  }

  deleteUser(userId: string): Observable<any> {
    const url = `${this.apiUrl}/users/${userId}`;
    return this.http.delete(url).pipe(
      catchError(this.handleError)
    );
  }

  deactivateUser(userId: string): Observable<any> {
    const url = `${this.apiUrl}/users/${userId}`;
    return this.http.patch(url, { active: false }).pipe(
      catchError(this.handleError)
    );
  }

  activateUser(userId: string): Observable<any> {
    const url = `${this.apiUrl}/users/${userId}`;
    return this.http.patch(url, { active: true }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }

}
