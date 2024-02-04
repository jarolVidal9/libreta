import { Component } from '@angular/core';
import { ApiBackService } from '../../../core/services/api-back.service';
import { Note } from '../../../models/note.model';
import { CommonModule } from '@angular/common';
import { Modal } from 'flowbite';


@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.css'
})
export class NotesComponent {
  constructor(private apiBackService:ApiBackService){}
  public listNote:Note[] = []
  selectedColor: string = '';
  ngOnInit(): void {
    this.apiBackService.getNotesByUser().subscribe( 
      (data)=>this.listNote = data,
      (error)=>console.error(error))
  }
  selectColor(color: string): void {
    this.selectedColor = color;
  }
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
}
