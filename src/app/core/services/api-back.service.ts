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

  // user
  registerNewUser(formData: FormData): Observable<any> {
    return this.http.post(`${environment.apiUrl}/user/register`, formData);
  }
  login(formValue: any):Observable<any>{
    return this.http.post(`${environment.apiUrl}/user/login`, formValue)
  }
  forgotPassword(data: object): Observable<any> {
    return this.http.post(`${environment.apiUrl}/user/forgotPassword`, data)
  }
  resetPassword(data: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/user/resetPassword`, data, { headers: this.createHeaders(data.token) })
  }

  // notes
  getNotesByUser(){
    return this.http.get<Note[]>(`${environment.apiUrl}/note/getNotesByUser`,{headers: this.createHeaders()})
  }
  getImageUser(): Observable<Blob>{
    return this.http.get(`${environment.apiUrl}/user/getImage`,{headers:this.createHeaders(),responseType:'blob'})
  }
  createNewNote(formData: FormData){
    return this.http.post(`${environment.apiUrl}/note/createNote`,formData,{headers:this.createHeaders()})
  }
  deleteNote(note_id:string){
    return this.http.delete(`${environment.apiUrl}/note/deleteNote/`+note_id, {headers:this.createHeaders()})
  }
  getOneNote(note_id:string){
    return this.http.get(`${environment.apiUrl}/note/getOneNote/`+note_id, {headers:this.createHeaders()})
  }
  editNote(formData:FormData, note_id:string){
    return this.http.put(`${environment.apiUrl}/note/editNote/`+note_id, formData,{headers:this.createHeaders()})
  }

  //crear header
  createHeaders(tokenValue=''): HttpHeaders{
    const token = this.cookieService.get('token')? this.cookieService.get('token') : tokenValue;
    return new HttpHeaders({ 'authorization': `Bearer ${token}` });
  }

}
