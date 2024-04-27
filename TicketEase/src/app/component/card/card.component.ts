import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, MatGridListModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  @Input() data: any[] = [];
  @Input() dataType: string = '';

  @Input() employeeTicketAssignedCounts: {
    [userId: string]: { [status: string]: number };
  } = {};

  @Input() engineerTicketAssignedCounts: {
    [userId: string]: { [status: string]: number };
  } = {};
}
