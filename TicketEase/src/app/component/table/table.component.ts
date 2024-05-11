import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Input,
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
export class TableComponent implements AfterViewInit {
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

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name', 'abc'];
  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.dataSource.data = this.data;
      this.cdr.detectChanges();
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.table.dataSource = this.dataSource;
    }, 0);
  }

  adminTableHeaders = ['Name', 'ID', 'Username'];

  employeeTableHeaders = [
    'ID',
    'Name',
    'Username',
    'Ticket Raised',
    'Ticket In-Progress',
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
