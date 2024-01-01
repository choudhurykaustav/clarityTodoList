import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'todoFilterByStatus',
  pure: false
})
export class TodoFilterByStatusPipe implements PipeTransform {

  transform(values: any[], arg: string): any[] {
    let test = values.filter(v => v.status === arg);
    return values.filter(v => v.status === arg);
  }

}
