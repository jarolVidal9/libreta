import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiBackService {

  constructor(private http: HttpClient) { }

  registerNewUser(userData: any): Observable<any> {
      return this.http.post(`${environment.apiUrl}/user/register`, userData);
    }

}
