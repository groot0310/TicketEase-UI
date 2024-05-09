import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './test.component.html',
  styleUrl: './test.component.scss',
})
export class TestComponent {
  jobs = [
    {
      title: 'Software Engineer',
      company: 'Axiom Corp.',
      time: '1 day ago',
      type: 'Full-Time',
      location: 'San Francisco, CA',
      salary: '$120,000/yr',
      category: 'Technology',
      imgSrc: 'https://bootdey.com/img/Content/avatar/avatar5.png',
    },
    {
      title: 'Marketing & Communication Supervisor',
      company: 'AxiomUI LLC',
      time: '2 days ago',
      type: 'Part-Time',
      location: 'New York, US',
      salary: '$60/hr',
      category: 'Marketing',
      imgSrc: 'https://bootdey.com/img/Content/avatar/avatar2.png',
    },
    // Add more job objects as needed
  ];
}
