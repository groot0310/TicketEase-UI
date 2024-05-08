import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AsyncPipe, CommonModule } from '@angular/common';
import {
  Component,
  inject,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { ApiService } from '../../../lib/api.service';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { DefaultDashboardComponent } from '../defaultDashboard/default-dashboard.component';
import { AssignDialogComponent } from '../dialog/assign-dialog/assign-dialog.component';
import { DialogComponent } from '../dialog/dialog.component';
import { TicketComponent } from '../ticket/ticket.component';
import { BottomSheetComponent } from '../bottom-sheet/bottom-sheet.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    AsyncPipe,
    DashboardComponent,
    MatExpansionModule,
    MatTooltipModule,
    MatButtonToggleModule,
    MatDialogModule,
    MatMenuModule,
    TicketComponent,
    DefaultDashboardComponent,
    FormsModule,
  ],
})
export class NavigationComponent implements OnInit {
  loggerName: string = '';
  role: string = '';
  hasLoggedIn: boolean = true;
  data: any[] = [];
  dataType: string = '';
  complaints: any[] = [];
  dialogComplaints: any[] = [];

  showDefaultDashboard: boolean = true;
  matchingEngineers: any[] = [];
  complaintId: string = '';
  constructor(
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private api: ApiService,
    private router: Router,
    private snackBar: MatSnackBar,
    private _bottomSheet: MatBottomSheet
  ) {}
  private breakpointObserver = inject(BreakpointObserver);
  @ViewChild('dialogTemplate') dialogTemplate!: TemplateRef<any>;

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.loggerName =
        (params['loggerFirst'] || '').toUpperCase() +
        ' ' +
        (params['loggerLast'] || '').toUpperCase();
      this.role = params['loggerRole'] || '';
    });
  }

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
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => true),
      shareReplay()
    );

  logout() {
    this.api.logout().subscribe({
      next: (data) => {
        this.hasLoggedIn = false;
        this.router.navigate([
          '/login',
          { loggerFirst: data.firstName, loggerLast: data.lastName },
        ]);
        this.snackBar.open('Logged out successfully!', '', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'right',
        });
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

  getAdmin(): void {
    this.api.getAdminList().subscribe((admin: any) => {
      this.data = admin;
      this.dataType = 'admin';
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
