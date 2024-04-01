import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rangeFilter',
})
export class RangeFilterPipe implements PipeTransform {
  transform(items: any[], minValue: number, maxValue: number): any[] {
    if (!items || minValue === null || maxValue === null) {
      return items;
    }

    return items.filter((item) => {
      const value = item.price;
      return value >= minValue && value <= maxValue;
    });
  }
}
