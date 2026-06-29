import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Ground } from '../../../core/models/ground.model';

@Component({
  selector: 'app-ground-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './ground-card.component.html',
  styleUrls: ['./ground-card.component.scss']
})
export class GroundCardComponent {
  @Input() ground!: Ground;
  @Output() bookNow = new EventEmitter<Ground>();

  get stars(): number[] {
    return Array(Math.round(this.ground.rating)).fill(0);
  }

  get emptyStars(): number[] {
    return Array(5 - Math.round(this.ground.rating)).fill(0);
  }

  get facilityIcons(): Record<string, string> {
    return {
      'Flood Lights': 'bi-lightbulb',
      'Parking': 'bi-p-circle',
      'Washroom': 'bi-door-open',
      'Drinking Water': 'bi-droplet',
      'Practice Nets': 'bi-grid-3x3-gap',
      'Changing Room': 'bi-person-badge',
      'Cafeteria': 'bi-cup-hot',
      'First Aid': 'bi-heart-pulse',
      'Locker Room': 'bi-lock',
      'Spectator Seating': 'bi-people',
      'Scoreboard': 'bi-clipboard-data'
    };
  }
}
