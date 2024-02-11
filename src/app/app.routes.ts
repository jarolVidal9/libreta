import { Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { MenuComponent } from './components/principal/menu/menu.component';
import { loginGuard } from './guards/login.guard';
import { NotesComponent } from './components/principal/notes/list-notes/notes.component';
import { RemindersComponent } from './components/principal/reminders/reminders.component';
import { CheckListComponent } from './components/principal/check-list/check-list.component';
import { CreateNoteComponent } from './components/principal/notes/create-note/create-note.component';
import { EditNoteComponent } from './components/principal/notes/edit-note/edit-note.component';

export const routes: Routes = [
    {   path: 'menu', 
    component:MenuComponent, 
        canActivate:[loginGuard],
        children:[
            {
                path:'notes',
                component:NotesComponent,
            },
            {
                path:'createNote',
                component: CreateNoteComponent
            },{
                path:'editNote/:note_id',
                component: EditNoteComponent
            },
            {
                path:'reminders',
                component:RemindersComponent
            },
            {
                path:'check-list',
                component: CheckListComponent
            }
        ]
    },
    { path: 'login', component: LoginComponent},
    { path: 'register', component: RegisterComponent},
    { path: '', redirectTo:'/menu/notes', pathMatch:'full'},

];
