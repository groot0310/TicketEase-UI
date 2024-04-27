import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent {
  @Input() data: any[] = [];
  @Input() dataType: string = '';

  @Input() employeeTicketAssignedCounts: {
    [userId: string]: { [status: string]: number };
  } = {};

  @Input() engineerTicketAssignedCounts: {
    [userId: string]: { [status: string]: number };
  } = {};

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
