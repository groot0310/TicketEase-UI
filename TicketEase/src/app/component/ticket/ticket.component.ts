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
import { MatSnackBar } from '@angular/material/snack-bar';
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
  constructor(
    private api: ApiService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
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

  openEngineerSuggestionDialog(complaint: any): void {
    const dialogRef = this.dialog.open(AssignDialogComponent, {
      width: '500px',
      data: {
        engineers: this.matchingEngineers,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      const compId = complaint.id;
      const engineerId = result.id;
      this.assignComplaint(compId, engineerId);
    });
  }

  assignComplaint(complaint: any, status: string) {
    this.api.assignComplaint(complaint, status).subscribe({
      next: (data) => {
        this.snackBar.open(`Complaint Assigned Successfully to ${data}`, '', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'right',
        });
      },
      error: () => {
        this.snackBar.open('Something went wrong...!!', '', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'right',
        });
      },
    });
  }
  deleteComplaint(complaintId: string) {
    this.api.deleteComplaint(complaintId).subscribe({
      next: (data) => {
        this.snackBar.open(`Complaint Deleted Successfully`, '', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'right',
        });
      },
      error: () => {
        this.snackBar.open('Something went wrong...!!', '', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'right',
        });
      },
    });
  }
}
