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
  createNewNote(formData: FormData){
    return this.http.post(`${environment.apiUrl}/note/createNote`,formData,{headers:this.createheaders()})
  }
  deleteNote(note_id:string){
    return this.http.delete(`${environment.apiUrl}/note/deleteNote/`+note_id, {headers:this.createheaders()})
  }
  getOneNote(note_id:string){
    return this.http.get(`${environment.apiUrl}/note/getOneNote/`+note_id, {headers:this.createheaders()})
  }
  editNote(formData:FormData, note_id:string){
    return this.http.put(`${environment.apiUrl}/note/editNote/`+note_id, formData,{headers:this.createheaders()})
  }

  //crear header
  createheaders(){
    const token = this.cookieService.get('token')
    return new HttpHeaders({ 'authorization': `Bearer ${token}` });
  }

}
