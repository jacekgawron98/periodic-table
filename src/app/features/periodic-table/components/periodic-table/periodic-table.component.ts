import { Component, Input } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { PeriodicElement } from '../../../../core/types/periodic-element';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TableCell } from '../table-cell/table-cell.component';

@Component({
  selector: 'periodic-table',
  standalone: true,
  templateUrl: './periodic-table.component.html',
  styleUrls: ['./periodic-table.component.scss'],
  imports: [
    MatTableModule,
    MatMenuModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    TableCell,
  ],
})
export class PeriodicTable {
  @Input() dataSource!: MatTableDataSource<PeriodicElement>;
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
}
