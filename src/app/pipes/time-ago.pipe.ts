import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeAgo',
  standalone: true
})
export class TimeAgoPipe implements PipeTransform {

  transform(value: Date): string {
    const ahora = new Date();
    if (!(value instanceof Date)) {
      value = new Date(value);
    }
    const diferencia = ahora.getTime() - value.getTime();
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

}
