import { Component, Input, ViewChild } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'table-cell',
  standalone: true,
  templateUrl: './table-cell.component.html',
  styleUrls: ['./table-cell.components.scss'],
  imports: [
    MatMenuModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
})
export class TableCell {
  @Input() element!: string;
  @ViewChild(MatMenuTrigger) trigger!: MatMenuTrigger;

  data: string = '';
  elementControl: FormControl = new FormControl('');

  ngOnInit() {
    this.data = this.element;
    this.elementControl.setValue(this.element);
  }

  updateValue() {
    this.data = this.elementControl.value;
    this.trigger.closeMenu();
  }
}
