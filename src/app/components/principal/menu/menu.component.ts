import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { ApiBackService } from '../../../core/services/api-back.service';
import { CommonModule } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { initFlowbite } from 'flowbite';


@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterLink, RouterOutlet, CommonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  imgUrl: any
  lastClick = 'notes';
  constructor(private apiBackService:ApiBackService, private cookieService:CookieService, private router:Router){}
  ngOnInit(): void {
      initFlowbite()
      this.apiBackService.getImageUser().subscribe(
        (blob: Blob)=>{
          this.imgUrl = URL.createObjectURL(blob);
        },
        (error)=>console.error(error)
      )
  }
  logout(){
    try {
      this.cookieService.delete('token');
      this.router.navigate(['login'])
    } catch (error) {
      console.error(error);
    }
  }
  lastClickOption( last: string){
    this.lastClick = last
  }
}
