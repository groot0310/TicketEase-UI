import { Component, Input, OnInit } from '@angular/core';
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
import { MatListModule } from '@angular/material/list';
import { MatDialog } from '@angular/material/dialog';
import { AssignDialogComponent } from '../dialog/assign-dialog/assign-dialog.component';
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
    MatListModule,
    AssignDialogComponent,
  ],
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.scss',
})
export class TicketComponent {
  @Input() complaints: any[] = [];
  @Input() engineers: any[] = [];

  matchingEngineers: any[] = [];
  selectedFilter: string = '';
  selectedStatus: string = '  ';
  statuses: string[] = ['ASSIGNED', 'RESOLVED', 'UNASSIGNED', 'UNDER_PROGRESS'];
  engineerId: string = '';
  filterOptions: string[] = [
    'ASSIGNED',
    'RESOLVED',
    'UNASSIGNED',
    'UNDER PROGRESS',
  ];
  ticketStatuses: string[] = [
    'ASSIGNED',
    'RESOLVED',
    'UNASSIGNED',
    'UNDER_PROGRESS',
  ];
  constructor(private api: ApiService, private dialog: MatDialog) {
    this.getEngineers();
  }

  getComplaintsByStatus(status: string): any[] {
    return this.complaints.filter((complaint) => complaint.status === status);
  }

  getEngineers() {
    this.api.getEngineerList().subscribe((engineers: any[]) => {
      this.matchingEngineers = engineers;
    });
  }

  openEngineerSuggestionDialog(): void {
    const dialogRef = this.dialog.open(AssignDialogComponent, {
      width: '500px',
      data: {
        engineers: this.matchingEngineers,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('++++++++++++++++++++++`', result);
    });
  }
}
