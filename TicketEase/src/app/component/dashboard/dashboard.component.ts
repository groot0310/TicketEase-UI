import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  standalone: true,
  imports: [
    MatGridListModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    CommonModule,
    MatTableModule,
  ],
})
export class DashboardComponent {
  @Input() data: any[] = [];
  // @Input() complaints: any[] = [
  //   {
  //     title: 'third ticket',
  //     description: 'third ticket',
  //     status: 'UNASSIGNED',
  //     remarks: 'No Remarks Added.',
  //     raised_On: '06/04/2024 20:23:45',
  //     last_Updated_On: '06/04/2024 20:23:45',
  //     raisedBy: {
  //       firstName: 'Aayush',
  //       username: '1234',
  //       id: 18,
  //       lastName: 'aayush',
  //     },
  //     assignedTo: null,
  //     id: 'coEjua$18',
  //   },
  //   {
  //     title: 'ticket',
  //     description: 'first ticket',
  //     status: 'ASSIGNED',
  //     remarks: 'No Remarks Added.',
  //     raised_On: '06/04/2024 20:21:01',
  //     last_Updated_On: '06/04/2024 20:21:01',
  //     raisedBy: {
  //       firstName: 'Aayush',
  //       username: '1234',
  //       id: 18,
  //       lastName: 'aayush',
  //     },
  //     assignedTo: null,
  //     id: 'rD912f$18',
  //   },
  //   {
  //     title: 'second ticket',
  //     description: 'second ticket',
  //     status: 'RESOLVED',
  //     remarks: 'No Remarks Added.',
  //     raised_On: '06/04/2024 20:23:36',
  //     last_Updated_On: '06/04/2024 20:23:36',
  //     raisedBy: {
  //       firstName: 'Aayush',
  //       username: '1234',
  //       id: 18,
  //       lastName: 'aayush',
  //     },
  //     assignedTo: null,
  //     id: 'Spek3j$18',
  //   },
  //   {
  //     title: 'fourth ticket',
  //     description: 'fourth ticket',
  //     status: 'UNDER_PROGRESS',
  //     remarks: 'No Remarks Added.',
  //     raised_On: '06/04/2024 20:23:55',
  //     last_Updated_On: '06/04/2024 20:23:55',
  //     raisedBy: {
  //       firstName: 'Aayush',
  //       username: '1234',
  //       id: 18,
  //       lastName: 'aayush',
  //     },
  //     assignedTo: null,
  //     id: 'XCNvVG$18',
  //   },
  // ];
  viewType: 'table' | 'card' = 'table';

  // filteredComplaints(status: string): any[] {
  //   return this.complaints.filter((complaint) => complaint.status === status);
  // }
}
