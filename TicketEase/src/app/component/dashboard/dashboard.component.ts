import { Component, Input, SimpleChanges, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTable, MatTableModule } from '@angular/material/table';
import { TicketComponent } from '../ticket/ticket.component';
import { FlexLayoutModule } from '@angular/flex-layout';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  standalone: true,
  imports: [
    MatGridListModule,
    FlexLayoutModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    CommonModule,
    MatTableModule,
    TicketComponent,
  ],
})
export class DashboardComponent {
  @ViewChild(MatTable)
  table!: MatTable<any>;

  @Input() data: any[] = [];
  @Input() complaints: any[] = [];

  viewType: 'table' | 'card' = 'table';
  displayData: boolean = false;
  displayComplaints: boolean = false;
  ngOnChanges(changes: SimpleChanges) {
    if (changes['data'] && changes['data'].currentValue.length > 0) {
      this.viewType = 'table';
      this.displayData = true;
      this.displayComplaints = false;
    } else if (
      changes['complaints'] &&
      changes['complaints'].currentValue.length > 0
    ) {
      this.displayData = false;
      this.displayComplaints = true;
    } else {
      this.displayData = false;
      this.displayComplaints = false;
    }
  }
}
