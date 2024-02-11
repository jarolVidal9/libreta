import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cutText',
  standalone: true
})
export class CutTextPipe implements PipeTransform {

  transform(value: string): string {
    if(value.length > 300){
      return value.substring(0,300)+'...';
    }
    return value;
  }

}
