import { Component, Inject, OnInit } from '@angular/core';
import { MatNavList } from '@angular/material/list';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatError, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ApiService } from '../../../lib/api.service';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatNavList,
    MatDialogModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatError,
  ],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
})
export class DialogComponent implements OnInit {
  adminForm!: FormGroup;
  hide: boolean = true;
  formType!: string;
  heading: string = '';
  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { formType: string; heading: string },
    private fb: FormBuilder,
    private api: ApiService
  ) {
    this.formType = data.formType;
    this.heading = data.heading;
  }
  ngOnInit(): void {
    this.adminForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  onSubmit(): void {
    if (this.formType === 'admin') {
      if (this.adminForm.valid) {
        const formData = this.adminForm.value;
        this.api.createAdmin(formData).subscribe({
          next: (data) => {
            console.log(data);
          },
        });
        console.log(formData);
        this.dialogRef.close(formData);
      }
    }
  }

  togglePasswordVisibility(): void {
    this.hide = !this.hide;
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
