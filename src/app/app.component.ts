import { Component, Inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PeriodicTable } from './features/periodic-table/components/periodic-table/periodic-table.component';
import { ElementsBaseService } from './core/services/elements/elements-base.service';
import { ElementsMocksService } from './core/services/elements/elements-mock.service';
import { PeriodicElement } from './core/types/periodic-element';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableDataSource } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { FilterInput } from './features/periodic-table/components/filter-input/filter-input.component';
import { RxState } from '@rx-angular/state';
import { State } from './core/types/state';
import { endWith, map, Observable, startWith } from 'rxjs';
import { GLOBAL_STATE } from './app.config';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    PeriodicTable,
    MatProgressSpinnerModule,
    FilterInput,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [
    RxState,
    { provide: ElementsBaseService, useClass: ElementsMocksService },
  ],
})
export class AppComponent {
  title: string = 'periodic-table';
  isLoading$: Observable<boolean> = this.state.select('loading');
  filter$: Observable<string> = this.state.select('filter');
  tableDataSource$ = this.state.select(
    map(({ elementsData, filter }) => {
      const source = new MatTableDataSource<PeriodicElement>();
      source.data = elementsData;
      source.filter = filter;
      return source;
    })
  );

  constructor(
    @Inject(GLOBAL_STATE) private state: RxState<State>,
    private elementsService: ElementsBaseService
  ) {
    this.state.connect(
      this.elementsService.getElements().pipe(
        map((elementsData) => ({ elementsData })),
        startWith({ loading: true }),
        endWith({ loading: false })
      )
    );
  }
}
