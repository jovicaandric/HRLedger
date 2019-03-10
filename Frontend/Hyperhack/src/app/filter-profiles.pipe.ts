import { Pipe, PipeTransform } from '@angular/core';
import { Profile } from './models';

@Pipe({
  name: 'filterProfiles'
})
export class FilterProfilesPipe implements PipeTransform {

  transform( profiles: Profile[], filter: string): any {
    if (filter !== '') {
      const f = filter.toLowerCase();
      return profiles.filter(x => {
        return (
          (x.firstName.toLowerCase().indexOf(f) !== -1) ||
          (x.lastName.toLowerCase().indexOf(f) !== -1) ||
          ((x.firstName.toLowerCase() + ' ' + x.lastName.toLowerCase()).indexOf(f) !== -1) ||
          (x.address.toLowerCase().indexOf(f) !== -1) ||
          (x.email.toLocaleLowerCase().indexOf(f) !== -1)
        );

      });
    } else {
      return profiles;
    }
  }

}
