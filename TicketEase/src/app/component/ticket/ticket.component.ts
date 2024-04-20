import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { ApiService } from '../../../lib/api.service';
import { DashboardComponent } from '../dashboard/dashboard.component';
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

  matchingEngineers: any[] = [];
  selectedFilter: string = '';
  selectedStatus: string = '  ';
  statuses: string[] = ['ASSIGNED', 'RESOLVED', 'UNASSIGNED', 'UNDER_PROGRESS'];
  engineerId: string = '';
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
    this.dialog.open(AssignDialogComponent, {
      data: {
        from: 'ticket',
        complaintId: complaint.id,
        engineers: this.matchingEngineers,
      },
      disableClose: true,
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
