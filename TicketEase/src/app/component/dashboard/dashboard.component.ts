import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTable } from '@angular/material/table';
import { CardComponent } from '../card/card.component';
import { ListComponent } from '../list/list.component';
import { TicketComponent } from '../ticket/ticket.component';
import { ApiService } from '../../../lib/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  standalone: true,
  imports: [
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    CommonModule,
    TicketComponent,
    MatButtonToggleModule,
    ListComponent,
    CardComponent,
  ],
})
export class DashboardComponent {
  constructor(private api: ApiService) {}

  @ViewChild(MatTable)
  table!: MatTable<any>;
  matchingEngineers: any[] = [];
  @Input() data: any[] = [];
  @Input() dataType: string = '';
  @Input() complaints: any[] = [];
  @Input() role: string = '';

  viewType: 'table' | 'card' = 'table';

  displayData: boolean = false;
  displayComplaints: boolean = false;
  employeeTicketAssignedCounts: {
    [userId: string]: { [status: string]: number };
  } = {};
  engineerTicketAssignedCounts: {
    [userId: string]: { [status: string]: number };
  } = {};

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data'] && changes['data'].currentValue.length > 0) {
      this.viewType = 'table';
      this.displayData = true;
      this.displayComplaints = false;
      this.calculateTicketCounts();
    } else if (
      changes['complaints'] &&
      changes['complaints'].currentValue.length > 0
    ) {
      if (this.role === 'ADMIN') {
        this.getEngineers();
      }
      this.displayData = false;
      this.displayComplaints = true;
    } else {
      this.displayData = false;
      this.displayComplaints = false;
    }
  }
  calculateTicketCounts() {
    const engineerTicketCounts: {
      [userId: string]: { [status: string]: number };
    } = {};
    const employeeTicketCounts: {
      [userId: string]: { [status: string]: number };
    } = {};
    this.data.forEach((data) => {
      const userId = data.id.toString();
      engineerTicketCounts[userId] = {
        ASSIGNED: 0,
        RESOLVED: 0,
        UNDER_PROGRESS: 0,
      };
      employeeTicketCounts[userId] = {
        RAISED: 0,
        RESOLVED: 0,
        UNDER_PROGRESS: 0,
      };
      const engineerComplaints = this.complaints.filter(
        (complaint) =>
          complaint.assignedTo && complaint.assignedTo.id.toString() === userId
      );
      const employeeComplaints = this.complaints.filter(
        (complaint) =>
          complaint.raisedBy && complaint.raisedBy.id.toString() === userId
      );
      engineerComplaints.forEach((complaint) => {
        engineerTicketCounts[userId][complaint.status] += 1;
      });
      employeeComplaints.forEach((complaint) => {
        employeeTicketCounts[userId][complaint.status] += 1;
      });
      employeeTicketCounts[userId]['RAISED'] = employeeComplaints.length;
    });
    this.engineerTicketAssignedCounts = engineerTicketCounts;
    this.employeeTicketAssignedCounts = employeeTicketCounts;
  }

  getEngineers() {
    this.api.getEngineerList().subscribe((engineers: any[]) => {
      this.matchingEngineers = engineers;
    });
  }
}
