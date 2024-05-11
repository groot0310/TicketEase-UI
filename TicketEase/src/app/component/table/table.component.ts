import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Input,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatTableModule, MatTable } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { TableDataSource, TableItem } from './table-datasource';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatSortModule, CommonModule],
})
export class TableComponent {
  @Input() data: any[] = [];
  @Input() dataType: string = '';
  @Input() employeeTicketAssignedCounts: {
    [userId: string]: { [status: string]: number };
  } = {};

  @Input() engineerTicketAssignedCounts: {
    [userId: string]: { [status: string]: number };
  } = {};
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<TableItem>;
  dataSource = new TableDataSource();

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data'] && changes['data'].currentValue.length > 0) {
      this.dataSource.data = this.data;
      this.cdr.detectChanges();
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.table.dataSource = this.dataSource;
    }
  }

  adminTableHeaders = ['ID', 'First Name', 'Last Name', 'Username'];

  employeeTableHeaders = [
    'ID',
    'Name',
    'Username',
    'Ticket Raised',
    'Ticket InProgress',
    'Ticket Resolved',
  ];
  engineerTableHeaders = [
    'ID',
    'Name',
    'Username',
    'Ticket Resolved',
    'Ticket InProgress',
    'Ticket Assigned',
  ];
}
