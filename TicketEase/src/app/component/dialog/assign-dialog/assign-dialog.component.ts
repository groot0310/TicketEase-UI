import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { ApiService } from '../../../../lib/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-assign-dialog',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatDialogModule,
    CommonModule,
    FormsModule,
    MatListModule,
    MatButtonModule,
    MatRadioModule,
  ],
  templateUrl: './assign-dialog.component.html',
  styleUrl: './assign-dialog.component.scss',
})
export class AssignDialogComponent {
  searchTermEngineer: string = '';
  searchTermComplaint: string = '';
  from = '';
  engineers: any[] = [];
  complaints: any[] = [];
  suggestedEngineers: any[] = [];
  suggestedComplaints: any[] = [];
  selectedComplaint = '';
  selectedEngineer = '';
  complaintId = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private api: ApiService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<AssignDialogComponent>
  ) {
    this.complaintId = data.complaintId;
    this.from = data.from;
    this.engineers = data.engineers;
    this.complaints = data.complaints;
    this.suggestedEngineers = this.engineers;
    this.suggestedComplaints = this.complaints;
  }

  searchEngineers(): void {
    this.suggestedEngineers = this.engineers.filter(
      (engineer) =>
        engineer.firstName
          .toLowerCase()
          .includes(this.searchTermEngineer.toLowerCase()) ||
        engineer.lastName
          .toLowerCase()
          .includes(this.searchTermEngineer.toLowerCase()) ||
        engineer.username
          .toLowerCase()
          .includes(this.searchTermEngineer.toLowerCase())
    );
  }
  selectEngineer(engineerId: any): void {
    this.selectedEngineer = engineerId;
  }

  searchComplaints(): void {
    this.suggestedComplaints = this.complaints.filter((complaint) => {
      const titleMatches = complaint.title
        ?.toLowerCase()
        .includes(this.searchTermComplaint.toLowerCase());
      const usernameMatches = complaint.raisedBy?.username
        ?.toLowerCase()
        .includes(this.searchTermComplaint.toLowerCase());
      return titleMatches || usernameMatches;
    });
  }

  selectComplaint(complaintId: any): void {
    this.selectedComplaint = complaintId;
  }
  close(): void {
    this.dialogRef.close();
  }
  onSubmit(from: string): void {
    if (from === 'navigation') {
      this.dialogRef.close(
        this.assignComplaint(this.selectedComplaint, this.selectedEngineer)
      );
    } else if (from === 'ticket') {
      this.dialogRef.close(
        this.assignComplaint(this.complaintId, this.selectedEngineer)
      );
    }
  }
  assignComplaint(complaintId: any, engineerId: any) {
    this.api.assignComplaint(complaintId, engineerId).subscribe({
      next: (data) => {
        this.snackBar.open(
          `Complaint Assigned Successfully to ${data.assignedTo.firstName} ${data.assignedTo.lastName}`,
          '',
          {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'right',
          }
        );
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
