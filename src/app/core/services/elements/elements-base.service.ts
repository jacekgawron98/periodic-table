import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PeriodicElement } from '../../types/periodic-element';

@Injectable({
  providedIn: 'root',
})
export abstract class ElementsBaseService {
  constructor() {}
  abstract getElements(): Observable<PeriodicElement[]>;
}
