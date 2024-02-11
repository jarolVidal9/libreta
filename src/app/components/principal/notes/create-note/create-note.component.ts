import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiBackService } from '../../../../core/services/api-back.service';
import { initFlowbite } from 'flowbite';
import { Router, RouterLink } from '@angular/router';

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
  selectedFile?:File;
  preview:string | ArrayBuffer| null = null;
  //form for create note
  formNewNote:FormGroup = this.formBuilder.group({
    title:['',[Validators.required,Validators.max(250)]],
    text: ['',[Validators.required,Validators.max(2000)]],
    image: [''],
    color:['#232427',[Validators.required]]
  })
  //colors
  colors: string[]=['#264D3B', '#472E5B', '#232427', '#6C394F', '#692B17']
  constructor(private apiBackService:ApiBackService, private formBuilder: FormBuilder, private router:Router){}
  onFileSelect(event:any){
    const file = event.target.files[0];
    if(file){
      this.selectedFile = file;
      const reader = new FileReader;
      reader.onload =()=>{
        this.preview = reader.result
      }
      reader.readAsDataURL(file)
    }
  }
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
      //carga el archivo
      if(this.selectedFile) formData.append('image',this.selectedFile, this.selectedFile.name)
      this.apiBackService.createNewNote(formData).subscribe(
        (response)=>{
          alert('La nota se ha creado')
          setTimeout(()=>{
            this.router.navigate(['menu/notes'])
          },1000)
        },
        (error)=>alert('lo sentimos tenemos algunos problemas intentalo mas tarde')
      )
    }else{
      alert('formulario invalido')
    }
  }

  deleteImage() {
    this.selectedFile = undefined;
    this.preview = null;
  }
}
