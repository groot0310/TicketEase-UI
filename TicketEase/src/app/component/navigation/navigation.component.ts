import { Component, inject, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AsyncPipe } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { ApiService } from '../../../lib/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
  standalone: true,
  imports: [
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
  ],
})
export class NavigationComponent implements OnInit {
  loggerName: string = '';
  loggerData: string = '';
  hasLoggedIn: boolean = true;

  constructor(
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private api: ApiService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}
  private breakpointObserver = inject(BreakpointObserver);

  ngOnInit(): void {
    this.loggerName =
      (this.route.snapshot.paramMap.get('loggerFirst') || '').toUpperCase() +
      ' ' +
      (this.route.snapshot.paramMap.get('loggerLast') || '').toUpperCase();
  }
  openDialog() {
    this.dialog.open(DialogComponent);
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
        console.log(data);
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
