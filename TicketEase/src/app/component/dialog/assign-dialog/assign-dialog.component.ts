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

@Component({
  selector: 'app-assign-dialog',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatDialogModule,
    CommonModule,
    FormsModule,
    MatListModule,
  ],
  templateUrl: './assign-dialog.component.html',
  styleUrl: './assign-dialog.component.scss',
})
export class AssignDialogComponent {
  searchTerm: string = '';
  engineers: any[] = [];
  suggestedEngineers: any[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<AssignDialogComponent>
  ) {
    this.engineers = data.engineers;
    this.suggestedEngineers = this.engineers;
  }
  searchEngineers(): void {
    // Filter engineers based on the searchTerm
    this.suggestedEngineers = this.engineers.filter(
      (engineer) =>
        engineer.firstName
          .toLowerCase()
          .includes(this.searchTerm.toLowerCase()) ||
        engineer.lastName
          .toLowerCase()
          .includes(this.searchTerm.toLowerCase()) ||
        engineer.username.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
  selectEngineer(engineer: any): void {
    this.dialogRef.close(engineer);
  }
}
