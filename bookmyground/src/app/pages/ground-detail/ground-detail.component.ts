import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { GroundService } from '../../core/services/ground.service';
import { Ground } from '../../core/models/ground.model';
import { BookingModalComponent } from '../../shared/components/booking-modal/booking-modal.component';

@Component({
  selector: 'app-ground-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, BookingModalComponent],
  templateUrl: './ground-detail.component.html',
  styleUrls: ['./ground-detail.component.scss']
})
export class GroundDetailComponent implements OnInit {
  ground: Ground | null = null;
  showModal = false;
  notFound = false;

  facilityIcons: Record<string, string> = {
    'Flood Lights': 'bi-lightbulb-fill',
    'Parking': 'bi-p-circle-fill',
    'Washroom': 'bi-door-open-fill',
    'Drinking Water': 'bi-droplet-fill',
    'Practice Nets': 'bi-grid-3x3-gap-fill',
    'Changing Room': 'bi-person-badge-fill',
    'Cafeteria': 'bi-cup-hot-fill',
    'First Aid': 'bi-heart-pulse-fill',
    'Locker Room': 'bi-lock-fill',
    'Spectator Seating': 'bi-people-fill',
    'Scoreboard': 'bi-clipboard-data-fill'
  };

  constructor(private route: ActivatedRoute, private groundService: GroundService) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.ground = this.groundService.getById(id) || null;
    if (!this.ground) this.notFound = true;
  }

  get stars(): number[] { return this.ground ? Array(Math.round(this.ground.rating)).fill(0) : []; }

  openBooking() {
    this.showModal = true;
    document.body.style.overflow = 'hidden';
  }

  closeModal() {
    this.showModal = false;
    document.body.style.overflow = '';
  }
}
