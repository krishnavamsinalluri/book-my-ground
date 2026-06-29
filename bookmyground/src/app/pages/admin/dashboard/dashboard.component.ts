import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { GroundService } from '../../../core/services/ground.service';
import { BookingService } from '../../../core/services/booking.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  totalGrounds = 0;
  availableGrounds = 0;
  unavailableGrounds = 0;
  totalBookings = 0;
  revenueEstimate = 0;
  recentGrounds: any[] = [];
  recentBookings: any[] = [];

  constructor(private groundService: GroundService, private bookingService: BookingService) {}

  ngOnInit() {
    const grounds = this.groundService.getAll();
    const bookings = this.bookingService.getAll();
    this.totalGrounds = grounds.length;
    this.availableGrounds = grounds.filter(g => g.available).length;
    this.unavailableGrounds = grounds.filter(g => !g.available).length;
    this.totalBookings = bookings.length;
    this.revenueEstimate = bookings.reduce((sum, b) => sum + b.price, 0);
    this.recentGrounds = grounds.slice(-4).reverse();
    this.recentBookings = bookings.slice(0, 5);
  }
}
