import { CommonModule } from '@angular/common';
import { Component, Inject, Input } from '@angular/core';
import {
  MAT_BOTTOM_SHEET_DATA,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { ApiService } from '../../../lib/api.service';
import { AssignDialogComponent } from '../dialog/assign-dialog/assign-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-bottom-sheet',
  standalone: true,
  imports: [MatListModule, MatIconModule, CommonModule],
  templateUrl: './bottom-sheet.component.html',
  styleUrl: './bottom-sheet.component.scss',
})
export class BottomSheetComponent {
  matchingEngineers: any[] = [];
  @Input() role: string = '';
  constructor(
    private bottomSheetRef: MatBottomSheetRef<BottomSheetComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA)
    public data: { complaint: any; role: string },
    private api: ApiService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

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
}
