import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {
  team = [
    { name: 'Arjun Kapoor', role: 'Founder & CEO', avatar: 'https://i.pravatar.cc/120?img=12' },
    { name: 'Sneha Reddy', role: 'Head of Operations', avatar: 'https://i.pravatar.cc/120?img=5' },
    { name: 'Rohit Verma', role: 'Tech Lead', avatar: 'https://i.pravatar.cc/120?img=15' },
    { name: 'Priya Singh', role: 'Customer Success', avatar: 'https://i.pravatar.cc/120?img=9' }
  ];

  milestones = [
    { year: '2021', title: 'Founded', desc: 'BookMyGround was founded with a vision to make cricket ground booking seamless.' },
    { year: '2022', title: '1000+ Bookings', desc: 'Crossed 1000 successful bookings within the first year of operations.' },
    { year: '2023', title: '5 Cities', desc: 'Expanded operations to 5 major cities across India.' },
    { year: '2024', title: '10K+ Users', desc: 'Reached 10,000 happy cricket enthusiasts using our platform.' }
  ];
}
