import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ApiBackService } from '../../../core/services/api-back.service';
import { CommonModule } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { initFlowbite } from 'flowbite';
import { AlertService } from '../../../core/services/alerts.service';


@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterLink, RouterOutlet, CommonModule, RouterLinkActive],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  imgUrl: any
  constructor(private apiBackService:ApiBackService, private cookieService:CookieService, private router:Router, private alertService:AlertService){}
  ngOnInit(): void {
      initFlowbite()
      this.apiBackService.getImageUser().subscribe(
        (blob: Blob) => {
          this.imgUrl = URL.createObjectURL(blob);
        },
        (error)=>this.alertService.showAlert(500,'')
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

}
