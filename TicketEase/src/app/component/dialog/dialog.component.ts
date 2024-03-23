import { Component } from '@angular/core';
import { MatNavList } from '@angular/material/list';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [MatNavList, MatDialogModule],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
})
export class DialogComponent {
  constructor(public dialog: MatDialog) {}
}
