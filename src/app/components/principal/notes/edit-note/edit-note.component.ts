import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router, RouterLink } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { ApiBackService } from '../../../../core/services/api-back.service';
import { Note } from '../../../../models/note.model';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-note',
  standalone: true,
  imports: [RouterLink, CommonModule, ReactiveFormsModule],
  templateUrl: './edit-note.component.html',
  styleUrl: './edit-note.component.css'
})
export class EditNoteComponent {
  note!: Note;
  selectedColor:string = ""
  preview:string | ArrayBuffer| null = null;
  colors: string[]=['#264D3B', '#472E5B', '#232427', '#6C394F', '#692B17']
  selectedFile?:File;
  formEditNote:FormGroup = this.formBuilder.group({
    title: ['', Validators.required],
    text: ['', Validators.required],
    image: '',
    color: '',
  })
  
  constructor (
    private activeRoute:ActivatedRoute, 
    private apiBackService:ApiBackService, 
    private formBuilder: FormBuilder, 
    private router:Router
    ){}

  ngOnInit(): void {
    initFlowbite()
    let note_id = ''
    this.activeRoute.params.subscribe(
      params =>{note_id = params['note_id']}
    )
    let dataNote:any
    this.apiBackService.getOneNote(note_id).subscribe(
      (data)=>{ 
        dataNote = data
        this.note = dataNote.note
        this.initForm();
      },
      (error)=> console.error(error)
      )      
  }
  initForm(){
    this.selectedColor = this.note ? this.note.color : '';
    this.preview = this.note ? this.note.images : '';
    this.formEditNote.patchValue({
      title: this.note.title,
      text: this.note.text,
      image: '',
      color: this.note.color,
    })
  }

  selectColor(color: string) {
    this.selectedColor = color;
    this.formEditNote.patchValue({ color });
    console.log(this.selectedColor);
  }

  onSubmitEditNote(){
      if(this.formEditNote.valid){
        const formData = new FormData();
        const formValue = this.formEditNote.value;
        Object.keys(formValue).forEach(key => {
          formData.append(key, formValue[key]);
        });        
        if(this.selectedFile) formData.append('image',this.selectedFile, this.selectedFile.name)
        this.apiBackService.editNote(formData, this.note.note_id).subscribe({
          next: (respose)=>{
            alert('La nota se ha editado')
            setTimeout(()=>{
              this.router.navigate(['menu/notes'])
            },1000)
          }
        }
        )
      }
  }

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
  deleteImage() {
    this.selectedFile = undefined;
    this.preview = null;
  }
}
