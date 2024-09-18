import { Component, Input } from '@angular/core';
import { debounceTime, Subject } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'filter-input',
  standalone: true,
  templateUrl: './filter-input.component.html',
  styleUrls: ['./filter-input.component.scss'],
  imports: [MatInputModule, MatFormFieldModule],
})
export class FilterInput {
  @Input() filter!: Function;

  private searchChanged = new Subject<string>();

  constructor() {
    this.searchChanged.pipe(debounceTime(2000)).subscribe((value) => {
      this.filter(value);
    });
  }

  onFilterChange(value: string) {
    this.searchChanged.next(value);
  }

  getValue(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }
}
