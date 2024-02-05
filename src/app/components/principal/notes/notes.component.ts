import { Component } from '@angular/core';
import { ApiBackService } from '../../../core/services/api-back.service';
import { Note } from '../../../models/note.model';
import { CommonModule } from '@angular/common';
import { initFlowbite } from 'flowbite';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,RouterLink, RouterOutlet],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.css'
})
export class NotesComponent {
  //list note 
  public listNote:Note[] = []
  //selected
  selectedColor: string ="#232427";
  //form for create note
  formNewNote:FormGroup = this.formBuilder.group({
    title:['',[Validators.required]],
    text: ['',[Validators.required]],
    Image: [''],
    color:['',[Validators.required]]
  })
  //colors
  colors: string[]=['#264D3B', '#472E5B', '#232427', '#6C394F', '#692B17']
  constructor(private apiBackService:ApiBackService, private formBuilder: FormBuilder){}

  ngOnInit(): void {
    initFlowbite();
    this.apiBackService.getNotesByUser().subscribe( 
      (data)=>this.listNote = data,
      (error)=>console.error(error))
  }
  ngOnDestroy(): void {}
  selectColor(color: string) {
    this.selectedColor = color;
    this.formNewNote.patchValue({ color });
    console.log(this.selectedColor);
    
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
  onSubmitCreateNote(){
    if(this.formNewNote.valid){
      const formData = new FormData();
      const formValue = this.formNewNote.value;
      Object.keys(formValue).forEach(key => {
        formData.append(key, formValue[key]);
      });
      this.apiBackService.createNewNote(formData).subscribe(
        (response)=>console.log(response)
        
      )
    }else{
      alert('formulario invalido')
    }
  }
  deleteNote( note_id: string){
    if(confirm("Seguro que quiere eliminar la nota?")){
      this.apiBackService.deleteNote(note_id).subscribe(
        (response)=>{
          this.listNote = this.listNote.filter((item) => item.note_id !== note_id);
        })
    }
  }
}
