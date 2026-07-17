import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatIban',
})
export class FormatIbanPipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }
}
