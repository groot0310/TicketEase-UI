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
import {
  MatBottomSheet,
  MatBottomSheetModule,
} from '@angular/material/bottom-sheet';
import { BottomSheetComponent } from '../bottom-sheet/bottom-sheet.component';

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
    MatBottomSheetModule,
  ],
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.scss',
})
export class TicketComponent {
  @Input() complaints: any[] = [];
  @Input() matchingEngineers: any[] = [];
  selectedFilter: string = '';
  selectedStatus: string = '  ';
  statuses: string[] = ['ASSIGNED', 'RESOLVED', 'UNASSIGNED', 'UNDER_PROGRESS'];
  engineerId: string = '';
  filterOptions: string[] = [
    'UNASSIGNED',
    'UNDER_PROGRESS',
    'ASSIGNED',
    'RESOLVED',
  ];
  ticketStatuses: string[] = [
    'UNASSIGNED',
    'ASSIGNED',
    'UNDER_PROGRESS',
    'RESOLVED',
  ];
  constructor(
    private api: ApiService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private _bottomSheet: MatBottomSheet
  ) {}

  getComplaintsByStatus(status: string): any[] {
    return this.complaints.filter((complaint) => complaint.status === status);
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

  openTicketDetails(complaint: any) {
    this._bottomSheet.open(BottomSheetComponent, {
      data: complaint,
    });
  }
}
