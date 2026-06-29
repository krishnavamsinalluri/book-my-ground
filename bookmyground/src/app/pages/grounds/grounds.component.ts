import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GroundService } from '../../core/services/ground.service';
import { Ground } from '../../core/models/ground.model';
import { GroundCardComponent } from '../../shared/components/ground-card/ground-card.component';
import { BookingModalComponent } from '../../shared/components/booking-modal/booking-modal.component';

@Component({
  selector: 'app-grounds',
  standalone: true,
  imports: [CommonModule, FormsModule, GroundCardComponent, BookingModalComponent],
  templateUrl: './grounds.component.html',
  styleUrls: ['./grounds.component.scss']
})
export class GroundsComponent implements OnInit {
  allGrounds: Ground[] = [];
  filtered: Ground[] = [];
  selectedGround: Ground | null = null;
  showModal = false;

  search = '';
  cityFilter = '';
  availableOnly = false;
  minRating = 0;
  sortBy = 'newest';

  cities: string[] = [];

  constructor(private groundService: GroundService) {}

  ngOnInit() {
    this.allGrounds = this.groundService.getAll();
    this.cities = [...new Set(this.allGrounds.map(g => g.city))];
    this.applyFilters();
  }

  applyFilters() {
    let result = [...this.allGrounds];
    if (this.search.trim()) {
      const q = this.search.toLowerCase();
      result = result.filter(g => g.name.toLowerCase().includes(q) || g.city.toLowerCase().includes(q) || g.address.toLowerCase().includes(q));
    }
    if (this.cityFilter) result = result.filter(g => g.city === this.cityFilter);
    if (this.availableOnly) result = result.filter(g => g.available);
    if (this.minRating) result = result.filter(g => g.rating >= this.minRating);
    switch (this.sortBy) {
      case 'price_asc': result.sort((a, b) => a.pricePerHour - b.pricePerHour); break;
      case 'price_desc': result.sort((a, b) => b.pricePerHour - a.pricePerHour); break;
      case 'rating': result.sort((a, b) => b.rating - a.rating); break;
      default: result.sort((a, b) => b.createdAt - a.createdAt);
    }
    this.filtered = result;
  }

  clearFilters() {
    this.search = ''; this.cityFilter = ''; this.availableOnly = false; this.minRating = 0; this.sortBy = 'newest';
    this.applyFilters();
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
