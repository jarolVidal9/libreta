import { Component } from '@angular/core';
import { ApiBackService } from '../../../core/services/api-back.service';
import { Note } from '../../../models/note.model';
import { CommonModule } from '@angular/common';
import { initFlowbite } from 'flowbite';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AlertService } from '../../../core/services/alerts.service';


@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [CommonModule,RouterLink, RouterOutlet],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.css'
})
export class NotesComponent {
  //list note 
  public listNote:Note[] = []
  //selected
  selectedColor: string ="#232427";
  //form for create note

  //colors
  constructor(private apiBackService:ApiBackService, private alertService:AlertService){}

  ngOnInit(): void {
    initFlowbite();
    this.apiBackService.getNotesByUser().subscribe( 
      (data)=>this.listNote = data,
      (error)=>this.alertService.showAlert(500,''))
  }
  ngOnDestroy(): void {}
  tiempoTranscurrido(fecha: Date): string {
    const ahora = new Date();
    if (!(fecha instanceof Date)) {
      fecha = new Date(fecha);
    }
    const diferencia = ahora.getTime() - fecha.getTime();
    const minutos = Math.floor(diferencia / (1000 * 60));
    const horas = Math.floor(minutos / 60);
    const dias = Math.floor(horas / 24);

    if (dias > 0) {
      return `${dias} día(s)`;
    } else if (horas > 0) {
      return `${horas} hora(s)`;
    } else {
      return `${minutos} minuto(s)`;
    }
  }
  
  deleteNote( note_id: string){
    if(confirm("Seguro que quiere eliminar la nota?")){
      this.apiBackService.deleteNote(note_id).subscribe(
        (response)=>{
          this.listNote = this.listNote.filter((item) => item.note_id !== note_id);
          this.alertService.showAlert(200,'La nota se ha eliminado')
        })
    }
  }
}
