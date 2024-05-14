import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogComponent } from '../dialog/dialog.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { ApiService } from '../../../lib/api.service';
import { AssignDialogComponent } from '../dialog/assign-dialog/assign-dialog.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { BottomSheetComponent } from '../bottom-sheet/bottom-sheet.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-default-dashboard',
  standalone: true,
  templateUrl: './default-dashboard.component.html',
  styleUrl: './default-dashboard.component.scss',
  imports: [CommonModule, MatDialogModule, DashboardComponent, FormsModule],
})
export class DefaultDashboardComponent implements OnInit {
  @Input() role: string = '';
  dataType: string = '';
  dialogComplaints: any[] = [];
  showDefaultDashboard: boolean = true;
  matchingEngineers: any[] = [];
  complaintId: string = '';
  data: any[] = [];
  @Input() complaints: any[] = [];
  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private api: ApiService,
    private _bottomSheet: MatBottomSheet
  ) {}
  ngOnInit(): void {
    // this.getComplaints('complaints');
  }
  @ViewChild('dialogTemplate') dialogTemplate!: TemplateRef<any>;

  openDialog(formType: string, heading: string): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: { formType, heading, role: this.role },
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (this.role === 'ADMIN' && result) {
        this.snackBar.open('Successfully added ' + result.username + '!', '', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
        });
      } else if (result) {
        this.snackBar.open('Successfully raised Complaint' + '!', '', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
        });
      }
    });
  }
  getAdmin(): void {
    this.api.getAdminList().subscribe((admin: any) => {
      this.data = admin;
      this.dataType = 'admin';
    });
  }
  getEmployees(): void {
    this.api.getEmployeeList().subscribe((employees: any) => {
      this.data = employees;
      this.dataType = 'employee';
    });
  }
  getEngineer(): void {
    this.api.getEngineerList().subscribe((engineer: any) => {
      this.data = engineer;
      this.dataType = 'engineer';
    });
  }

  getComplaints(complaint: string): void {
    this.api
      .getComplaintsList(this.role.toLowerCase(), complaint)
      .subscribe((complaint: any) => {
        this.complaints = complaint;
      });
  }

  getUnassignedComplaints(): void {
    this.api.getEngineerList().subscribe((engineers: any[]) => {
      this.matchingEngineers = engineers;
    });
    this.api.getUnassignedComplaints().subscribe({
      next: (complaint) => {
        this.dialogComplaints = complaint;
        this.openEngineerSuggestionDialog(complaint);
      },
      error: (error) => {
        this.snackBar.open(error.error.message, '', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'right',
        });
      },
    });
  }

  openEngineerSuggestionDialog(complaint: any): void {
    this.dialog.open(AssignDialogComponent, {
      data: {
        from: 'navigation',
        complaints: this.dialogComplaints,
        engineers: this.matchingEngineers,
      },
      disableClose: true,
    });
  }

  openComplaintSearchBar() {
    this.dialog.open(this.dialogTemplate);
  }

  searchComplaint() {
    this.api.searchComplaintById(this.complaintId).subscribe({
      next: (complaint) => {
        this._bottomSheet.open(BottomSheetComponent, {
          data: { complaint, role: this.role },
        });
      },
      error: (error) => {
        this.snackBar.open(error.error.message, '', {
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'center',
        });
      },
    });
  }
}
