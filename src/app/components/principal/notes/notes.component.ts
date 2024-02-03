import { Component } from '@angular/core';
import { ApiBackService } from '../../../core/services/api-back.service';
import { Note } from '../../../models/note.model';
import { CommonModule } from '@angular/common';


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
  ngOnInit(): void {
    this.apiBackService.getNotesByUser().subscribe(
      data=>{
        this.listNote = data
        console.log(data)
        
      }
      ,
      (error)=>console.error(error)
    )
  }
}
