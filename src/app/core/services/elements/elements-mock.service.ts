import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { PeriodicElement } from '../../types/periodic-element';
import { ElementsBaseService } from './elements-base.service';
import { ELEMENT_DATA } from '../../consts/periodic-elements';

@Injectable({
  providedIn: 'root',
})
export class ElementsMocksService extends ElementsBaseService {
  override getElements(): Observable<PeriodicElement[]> {
    return of(ELEMENT_DATA).pipe(delay(2000));
  }
}
