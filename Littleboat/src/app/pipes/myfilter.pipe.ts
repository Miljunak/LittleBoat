import { Pipe, PipeTransform } from '@angular/core';
import { Trip } from '../ITrip';


@Pipe({
    name: 'myfilter',
    pure: false
})

export class MyFilterPipe implements PipeTransform {

    transform(items: any[], filter: Trip): any {
        if (!items || !filter) return items;
        return items.filter(item => 
          item.country.indexOf(filter.country) !== -1 &&
          item.price >= filter.price && item.price <= filter.maxAmount && 
          new Date(item.startDate) >= new Date(filter.startDate) &&
          new Date(item.endDate) <= new Date(filter.endDate)
        );
    }
}
