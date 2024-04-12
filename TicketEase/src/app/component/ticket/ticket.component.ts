import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ApiService } from '../../../lib/api.service';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ticket',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatGridListModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    FlexLayoutModule,
    DashboardComponent,
    MatSelectModule,
    FormsModule,
  ],
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.scss',
})
export class TicketComponent {
  constructor(private api: ApiService) {}
  @Input() complaints: any[] = [];
  selectedFilter: string = '';
  filterOptions: string[] = [
    'ASSIGNED',
    'RESOLVED',
    'UNASSIGNED',
    'UNDER_PROGRESS',
  ];
  ticketStatuses: string[] = [
    'ASSIGNED',
    'RESOLVED',
    'UNASSIGNED',
    'UNDER_PROGRESS',
  ];

  getComplaintsByStatus(status: string): any[] {
    return this.complaints.filter((complaint) => complaint.status === status);
  }
}
