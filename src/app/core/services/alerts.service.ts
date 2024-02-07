// alert.service.ts
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AlertService {

  private stringStatus = '';
  private message = '';

  private alertSource = new Subject();
  alert$ = this.alertSource.asObservable();

  constructor() { }

  private getStatus(statusCode: number): void {
    if (statusCode >= 100 && statusCode < 200) {
      this.stringStatus = 'info';
    } else if (statusCode >= 200 && statusCode < 300) {
      this.stringStatus = 'success';
    } else if (statusCode >= 300 && statusCode < 400) {
      this.stringStatus = 'warning';
    } else if (statusCode >= 400 && statusCode < 500) {
      this.stringStatus = 'error';
    }
    else if (statusCode >= 500 && statusCode < 600) {
      this.stringStatus = 'error';
      this.message = 'Lo sentimos no eres tú, somos nosotros, intentalo más tarde.'
    }
    else {
      this.stringStatus = 'unknow';
      this.message = 'Error desconocido, intentalo más tarde'
    }
  }

  showAlert(status: number, message: any, time: number = 3000) {
    this.getStatus(status);

    this.alertSource.next({
      status: this.stringStatus,
      message: this.message === '' ? message : this.message,
      time
    })
  }

}
