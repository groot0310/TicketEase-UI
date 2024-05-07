import { CommonModule } from '@angular/common';
import { Component, Inject, Input } from '@angular/core';
import {
  MAT_BOTTOM_SHEET_DATA,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from '../../../lib/api.service';
import { AssignDialogComponent } from '../dialog/assign-dialog/assign-dialog.component';

@Component({
  selector: 'app-bottom-sheet',
  standalone: true,
  imports: [
    MatListModule,
    MatIconModule,
    CommonModule,
    MatButtonModule,
    MatMenuModule,
  ],
  templateUrl: './bottom-sheet.component.html',
  styleUrl: './bottom-sheet.component.scss',
})
export class BottomSheetComponent {
  matchingEngineers: any[] = [];
  @Input() role: string = '';
  statusOptions: string[] = [
    'UNASSIGNED',
    'ASSIGNED',
    'UNDER_PROGRESS',
    'RESOLVED',
  ];

  constructor(
    private bottomSheetRef: MatBottomSheetRef<BottomSheetComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA)
    public data: { complaint: any; role: string },
    private api: ApiService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.role = data.role;
  }

  assignTo() {
    this.api.getEngineerList().subscribe((engineers: any[]) => {
      this.matchingEngineers = engineers;
      this.openEngineerSuggestionDialog();
    });
  }

  openEngineerSuggestionDialog(): void {
    const dialogRef = this.dialog.open(AssignDialogComponent, {
      data: {
        from: 'ticket',
        complaintId: this.data.complaint.id,
        engineers: this.matchingEngineers,
      },
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.bottomSheetRef.dismiss();
    });
  }
  deleteComplaint(complaintId: string) {
    this.api.deleteComplaint(complaintId).subscribe({
      next: (data) => {
        this.bottomSheetRef.dismiss();
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
          panelClass: ['red-snack-bar'],
        });
      },
    });
  }

  updateStatus(complaintId: string, newStatus: string): void {
    this.api.updateComplaintStatus(complaintId, newStatus).subscribe({
      next: (data) => {
        this.bottomSheetRef.dismiss();
        this.snackBar.open(`Complaint Updated Successfully`, '', {
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
          panelClass: ['red-snack-bar'],
        });
      },
    });
  }
}
