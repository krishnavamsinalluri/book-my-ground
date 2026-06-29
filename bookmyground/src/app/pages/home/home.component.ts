import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { GroundService } from '../../core/services/ground.service';
import { Ground } from '../../core/models/ground.model';
import { GroundCardComponent } from '../../shared/components/ground-card/ground-card.component';
import { BookingModalComponent } from '../../shared/components/booking-modal/booking-modal.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, GroundCardComponent, BookingModalComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  featuredGrounds: Ground[] = [];
  selectedGround: Ground | null = null;
  showModal = false;

  features = [
    { icon: 'bi-lightning-charge-fill', title: 'Instant Booking', desc: 'Book your ground in seconds with instant WhatsApp confirmation.' },
    { icon: 'bi-patch-check-fill', title: 'Verified Grounds', desc: 'Every ground is physically verified for quality and safety.' },
    { icon: 'bi-currency-rupee', title: 'Affordable Pricing', desc: 'Best prices guaranteed. Starting at just ₹900/hr.' },
    { icon: 'bi-trophy-fill', title: 'Premium Turf', desc: 'Top-grade turf with professional maintenance standards.' }
  ];

  steps = [
    { num: '01', title: 'Choose Ground', desc: 'Browse and select from verified premium grounds near you.', icon: 'bi-search' },
    { num: '02', title: 'Select Slot', desc: 'Pick your preferred date and time slot easily.', icon: 'bi-calendar-check' },
    { num: '03', title: 'Book on WhatsApp', desc: 'Confirm your booking instantly via WhatsApp message.', icon: 'bi-whatsapp' }
  ];

  testimonials = [
    { name: 'Rahul Sharma', city: 'Mumbai', rating: 5, text: 'Amazing experience! Booked Eden Sports Arena for our weekend match. Excellent turf quality and the booking process was super smooth.', avatar: 'https://i.pravatar.cc/80?img=11' },
    { name: 'Priya Mehta', city: 'Delhi', rating: 5, text: 'Royal Cricket Club exceeded our expectations. Well maintained ground with great facilities. Will definitely book again!', avatar: 'https://i.pravatar.cc/80?img=5' },
    { name: 'Arjun Nair', city: 'Bangalore', rating: 5, text: 'Green Pitch Stadium is top-notch. The flood lights made our evening game absolutely fantastic. Highly recommended!', avatar: 'https://i.pravatar.cc/80?img=15' }
  ];

  stats = [
    { value: '50+', label: 'Premium Grounds' },
    { value: '10K+', label: 'Happy Bookings' },
    { value: '8+', label: 'Cities Covered' },
    { value: '4.8★', label: 'Average Rating' }
  ];

  constructor(private groundService: GroundService) {}

  ngOnInit() {
    this.featuredGrounds = this.groundService.getAll()
      .filter(g => g.available)
      .slice(0, 6);
  }

  openBooking(ground: Ground) {
    this.selectedGround = ground;
    this.showModal = true;
    document.body.style.overflow = 'hidden';
  }

  closeModal() {
    this.showModal = false;
    this.selectedGround = null;
    document.body.style.overflow = '';
  }
}
