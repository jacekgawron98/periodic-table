import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PeriodicTable } from './features/periodic-table/components/periodic-table/periodic-table.component';
import { ElementsBaseService } from './core/services/elements/elements-base.service';
import { ElementsMocksService } from './core/services/elements/elements-mock.service';
import { PeriodicElement } from './core/types/periodic-element';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableDataSource } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { FilterInput } from './features/periodic-table/components/filter-input/filter-input.component';

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
  providers: [{ provide: ElementsBaseService, useClass: ElementsMocksService }],
})
export class AppComponent {
  title: string = 'periodic-table';
  isLoading: boolean = true;
  elementsData = new MatTableDataSource<PeriodicElement>();

  constructor(private elementsService: ElementsBaseService) {}

  ngOnInit() {
    this.elementsService.getElements().subscribe((data) => {
      this.elementsData.data = data;
      this.isLoading = false;
    });
  }

  filterData(filter: string) {
    this.elementsData.filter = filter.trim().toLocaleLowerCase();
  }
}
