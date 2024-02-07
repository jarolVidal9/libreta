import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { AlertService } from './core/services/alerts.service';
import { AlertsComponent } from './components/alerts/alerts.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet , AlertsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'libreta';

  constructor(private alertService: AlertService) { }

  ngOnInit(): void {

    initFlowbite();
  }
}
