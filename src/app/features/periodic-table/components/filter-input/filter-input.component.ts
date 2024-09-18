import { Component, Inject, OnDestroy } from '@angular/core';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { GLOBAL_STATE } from '../../../../app.config';
import { RxState } from '@rx-angular/state';
import { State } from '../../../../core/types/state';

@Component({
  selector: 'filter-input',
  standalone: true,
  templateUrl: './filter-input.component.html',
  styleUrls: ['./filter-input.component.scss'],
  imports: [MatInputModule, MatFormFieldModule],
})
export class FilterInput implements OnDestroy {
  private searchChanged = new Subject<string>();

  constructor(@Inject(GLOBAL_STATE) private state: RxState<State>) {
    this.searchChanged
      .pipe(distinctUntilChanged(), debounceTime(2000))
      .subscribe((value) => {
        this.state.set({ filter: value });
      });
  }

  ngOnDestroy(): void {
    this.searchChanged.unsubscribe();
  }

  onFilterChange(value: string) {
    this.searchChanged.next(value);
  }

  getValue(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }
}
