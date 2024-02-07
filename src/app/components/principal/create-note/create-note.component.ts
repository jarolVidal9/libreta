import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiBackService } from '../../../core/services/api-back.service';
import { initFlowbite } from 'flowbite';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-create-note',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,RouterLink],
  templateUrl: './create-note.component.html',
  styleUrl: './create-note.component.css'
})
export class CreateNoteComponent {
  //list note 
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
    initFlowbite()
  }
  ngOnDestroy(): void {}
  selectColor(color: string) {
    this.selectedColor = color;
    this.formNewNote.patchValue({ color });
    console.log(this.selectedColor);
  }

  onSubmitCreateNote(){
    if(this.formNewNote.valid){
      const formData = new FormData();
      const formValue = this.formNewNote.value;
      Object.keys(formValue).forEach(key => {
        formData.append(key, formValue[key]);
      });
      this.apiBackService.createNewNote(formData).subscribe(
        (response)=>alert('La nota se ha creado')
      )
    }else{
      alert('formulario invalido')
    }
  }

}
