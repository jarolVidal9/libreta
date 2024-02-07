import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { ApiBackService } from '../../../core/services/api-back.service';
import { Note } from '../../../models/note.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-note',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './edit-note.component.html',
  styleUrl: './edit-note.component.css'
})
export class EditNoteComponent {
  note_id:string = ''
  data: any;
  selectedColor:string =""
  colors: string[]=['#264D3B', '#472E5B', '#232427', '#6C394F', '#692B17']
  constructor (private activeRoute:ActivatedRoute, private apiBackService:ApiBackService){}
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    initFlowbite()
    this.activeRoute.params.subscribe(
      params =>{this.note_id = params['note_id']}
    )
    this.apiBackService.getOneNote(this.note_id).subscribe(
      (data)=>{ 
        this.data = data,
        this.selectedColor = this.data.note.color
      }
    )
    
  }
  selectColor(color: string) {
    this.selectedColor = color;
    // this.formNewNote.patchValue({ color });
    console.log(this.selectedColor);
  }
}
