import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { Note } from '../../models/note.model';

@Injectable({
  providedIn: 'root'
})
export class ApiBackService {

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  registerNewUser(formData: FormData): Observable<any> {
    return this.http.post(`${environment.apiUrl}/user/register`, formData);
  }
  login(formValue: any):Observable<any>{
    return this.http.post(`${environment.apiUrl}/user/login`, formValue)
  }
  getNotesByUser(){
    return this.http.get<Note[]>(`${environment.apiUrl}/note/getNotesByUser`,{headers: this.createheaders()})
  }
  getImageUser(): Observable<Blob>{
    return this.http.get(`${environment.apiUrl}/user/getImage`,{headers:this.createheaders(),responseType:'blob'})
  }

  //crear header
  createheaders(){
    const token = this.cookieService.get('token')
    return new HttpHeaders({ 'authorization': `Bearer ${token}` });
  }

}
