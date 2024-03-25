import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from '../../../lib/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  loggerName = '';
  hasLoggedIn: boolean = false;

  constructor(
    private snackBar: MatSnackBar,
    private api: ApiService,
    private router: Router
  ) {}
  ngOnInit(): void {}
  public user = {
    username: '',
    password: '',
  };

  async formSubmit() {
    if (this.user.username == '' || this.user.username == null) {
      this.snackBar.open('Username is required', '', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right',
      });
    } else if (this.user.password == '' || this.user.password == null) {
      this.snackBar.open('Password is required', '', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right',
      });
    } else {
      this.api.login(this.user).subscribe({
        next: (data) => {
          console.log(data);
          this.hasLoggedIn = true;
          this.router.navigate(['/admin', { loggerName: data.firstName }]);
          this.snackBar.open(data.userName, '', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'right',
          });
        },
        error: (error) => {
          this.snackBar.open('Something went wrong...!!', '', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'right',
          });
        },
      });
    }
  }
}
