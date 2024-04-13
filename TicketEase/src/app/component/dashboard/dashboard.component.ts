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
  @Input() dataType: string = '';
  @Input() complaints: any[] = [];

  viewType: 'table' | 'card' = 'table';
  displayData: boolean = false;
  displayComplaints: boolean = false;
  ticketAssignedCounts: { [userId: string]: { [status: string]: number } } = {};

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data'] && changes['data'].currentValue.length > 0) {
      this.viewType = 'table';
      this.displayData = true;
      this.displayComplaints = false;
      this.calculateTicketCounts();
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
  calculateTicketCounts() {
    const ticketCounts: { [userId: string]: { [status: string]: number } } = {};
    this.data.forEach((employee) => {
      console.log(employee);

      const userId = employee.id.toString();
      ticketCounts[userId] = {
        ASSIGNED: 0,
        RESOLVED: 0,
        UNDER_PROGRESS: 0,
      };
      const userComplaints = this.complaints.filter(
        (complaint) =>
          complaint.assignedTo && complaint.assignedTo.id.toString() === userId
      );
      userComplaints.forEach((complaint) => {
        ticketCounts[userId][complaint.status] += 1;
      });
    });
    this.ticketAssignedCounts = ticketCounts;
  }
}
