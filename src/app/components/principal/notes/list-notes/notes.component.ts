import { Component } from '@angular/core';
import { ApiBackService } from '../../../../core/services/api-back.service';
import { Note } from '../../../../models/note.model';
import { CommonModule } from '@angular/common';
import { initFlowbite } from 'flowbite';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AlertService } from '../../../../core/services/alerts.service';
import { TimeAgoPipe } from '../../../../pipes/time-ago.pipe';
import { CutTextPipe } from '../../../../pipes/cut-text.pipe';

@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [CommonModule,RouterLink, RouterOutlet, TimeAgoPipe, CutTextPipe],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.css'
})
export class NotesComponent { 
  public listNote:Note[] = []
  selectedColor: string ="#232427";
  //colors
  constructor(private apiBackService:ApiBackService, private alertService:AlertService){}

  ngOnInit(): void {
    initFlowbite();
    this.apiBackService.getNotesByUser().subscribe( 
      (data)=>this.listNote = data,
      (error)=>this.alertService.showAlert(500,''))
  }
  ngOnDestroy(): void {}
  
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
