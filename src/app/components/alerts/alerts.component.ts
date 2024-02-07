import { Component } from '@angular/core';
import { AlertService } from '../../core/services/alerts.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-alerts',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './alerts.component.html',
  styleUrl: './alerts.component.css'
})
export class AlertsComponent {
  showAlert = false;
  message: any;
  alertColor = '';
  isAlertObject = false;
  timeoutId: any;

  constructor(private alertService: AlertService) { }

  getTypeOfMessage(message: any): void {
    if (typeof message === 'object') {
      this.isAlertObject = true;
    } else {
      this.isAlertObject = false;
    }
  };

  ngOnInit(): void {
    this.alertService.alert$.subscribe((res: any) => {
      this.message = res.message;
      this.alertColor = res.status;

      // servicio para tipificar el mensaje 
      this.getTypeOfMessage(this.message);

      // Cancelar el temporizador existente antes de configurar uno nuevo
      clearTimeout(this.timeoutId);

      // Ocultar la alerta actual y mostrar la nueva alerta
      this.showAlert = false;
      setTimeout(() => { 
        this.showAlert = true;
      }, 100);

      // Configurar el temporizador para ocultar la alerta después del tiempo especificado
      this.timeoutId = setTimeout(() => {
        document.querySelector('.alerta')?.classList.add('hidden');
        this.showAlert = false;
      }, res.time);
    });
  }
}
