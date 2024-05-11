import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, MatPaginatorModule, MatTableModule],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent {
  // Properties
  @Input() data: any[] = [];
  @Input() dataType: string = '';
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>(this.data);

  @Input() employeeTicketAssignedCounts: {
    [userId: string]: { [status: string]: number };
  } = {};

  @Input() engineerTicketAssignedCounts: {
    [userId: string]: { [status: string]: number };
  } = {};

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  adminTableHeaders = ['Name', 'ID', 'Username'];

  engineerTableHeaders = [
    'ID',
    'Name',
    'Username',
    'Ticket Resolved',
    'Ticket In-Progress',
    'Ticket Assigned',
  ];

  employeeTableHeaders = [
    'ID',
    'Name',
    'Username',
    'Ticket Raised',
    'Ticket In-Progress',
    'Ticket Resolved',
  ];
}
