import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { Ground } from '../models/ground.model';

const GROUNDS_KEY = 'bmg_grounds';

const SAMPLE_GROUNDS: Ground[] = [
  {
    id: '1',
    name: 'Eden Sports Arena',
    city: 'Mumbai',
    address: 'Andheri West, Mumbai, Maharashtra',
    description: 'Premium cricket ground with international standard turf, flood lights, and full amenities. Perfect for tournaments and practice sessions.',
    pricePerHour: 1200,
    rating: 4.8,
    facilities: ['Flood Lights', 'Parking', 'Washroom', 'Drinking Water', 'Practice Nets', 'Changing Room', 'Cafeteria', 'First Aid'],
    available: true,
    openingTime: '06:00 AM',
    closingTime: '10:00 PM',
    image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&q=80',
    createdAt: Date.now() - 86400000 * 30
  },
  {
    id: '2',
    name: 'Royal Cricket Club',
    city: 'Delhi',
    address: 'Dwarka Sector 12, New Delhi',
    description: 'World-class cricket facility with professional-grade pitch, spectator seating and scoreboard. Ideal for competitive matches.',
    pricePerHour: 1500,
    rating: 4.7,
    facilities: ['Flood Lights', 'Parking', 'Washroom', 'Drinking Water', 'Changing Room', 'Spectator Seating', 'Scoreboard', 'First Aid'],
    available: true,
    openingTime: '06:00 AM',
    closingTime: '10:00 PM',
    image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800&q=80',
    createdAt: Date.now() - 86400000 * 25
  },
  {
    id: '3',
    name: 'Green Pitch Stadium',
    city: 'Bangalore',
    address: 'Whitefield, Bangalore, Karnataka',
    description: 'Sprawling cricket ground with lush green turf and modern facilities. Surrounded by beautiful landscaping for a refreshing experience.',
    pricePerHour: 1000,
    rating: 4.5,
    facilities: ['Flood Lights', 'Parking', 'Washroom', 'Drinking Water', 'Practice Nets', 'Cafeteria', 'Locker Room'],
    available: true,
    openingTime: '06:00 AM',
    closingTime: '09:00 PM',
    image: 'https://images.unsplash.com/photo-1624526267942-ab0ff8a3e972?w=800&q=80',
    createdAt: Date.now() - 86400000 * 20
  },
  {
    id: '4',
    name: 'Champions Turf',
    city: 'Chennai',
    address: 'OMR Road, Chennai, Tamil Nadu',
    description: 'State-of-the-art cricket turf with imported grass, night play facility and dedicated coaching area. Home of champions.',
    pricePerHour: 1100,
    rating: 4.6,
    facilities: ['Flood Lights', 'Parking', 'Washroom', 'Drinking Water', 'Practice Nets', 'Changing Room', 'First Aid', 'Scoreboard'],
    available: true,
    openingTime: '05:00 AM',
    closingTime: '11:00 PM',
    image: 'https://images.unsplash.com/photo-1562077981-4d7eafd44932?w=800&q=80',
    createdAt: Date.now() - 86400000 * 15
  },
  {
    id: '5',
    name: 'Victory Cricket Ground',
    city: 'Hyderabad',
    address: 'Gachibowli, Hyderabad, Telangana',
    description: 'Premium cricket venue with all modern amenities, covered spectator stands and top-notch playing surface.',
    pricePerHour: 1300,
    rating: 4.9,
    facilities: ['Flood Lights', 'Parking', 'Washroom', 'Drinking Water', 'Changing Room', 'Cafeteria', 'Spectator Seating', 'Scoreboard', 'Locker Room'],
    available: true,
    openingTime: '06:00 AM',
    closingTime: '10:00 PM',
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80',
    createdAt: Date.now() - 86400000 * 10
  },
  {
    id: '6',
    name: 'Sunrise Sports Complex',
    city: 'Pune',
    address: 'Hinjewadi Phase 2, Pune, Maharashtra',
    description: 'Multi-facility sports complex with dedicated cricket ground, professional coaching staff and modern clubhouse.',
    pricePerHour: 900,
    rating: 4.4,
    facilities: ['Flood Lights', 'Parking', 'Washroom', 'Drinking Water', 'Practice Nets', 'Changing Room', 'Cafeteria'],
    available: true,
    openingTime: '06:00 AM',
    closingTime: '09:00 PM',
    image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&q=80',
    createdAt: Date.now() - 86400000 * 8
  },
  {
    id: '7',
    name: 'Metro Cricket Hub',
    city: 'Kolkata',
    address: 'Salt Lake City, Kolkata, West Bengal',
    description: 'Iconic cricket ground in the heart of the city. Features international-grade pitch and extensive spectator facilities.',
    pricePerHour: 1000,
    rating: 4.3,
    facilities: ['Flood Lights', 'Parking', 'Washroom', 'Drinking Water', 'Spectator Seating', 'First Aid', 'Scoreboard'],
    available: false,
    openingTime: '07:00 AM',
    closingTime: '09:00 PM',
    image: 'https://images.unsplash.com/photo-1611523658822-385aa008324c?w=800&q=80',
    createdAt: Date.now() - 86400000 * 5
  },
  {
    id: '8',
    name: 'Skyline Cricket Academy',
    city: 'Ahmedabad',
    address: 'SG Highway, Ahmedabad, Gujarat',
    description: 'Premier cricket academy and ground with cutting-edge training equipment, bowling machines and video analysis facility.',
    pricePerHour: 1400,
    rating: 4.7,
    facilities: ['Flood Lights', 'Parking', 'Washroom', 'Drinking Water', 'Practice Nets', 'Changing Room', 'Cafeteria', 'Locker Room', 'First Aid', 'Scoreboard'],
    available: true,
    openingTime: '05:30 AM',
    closingTime: '10:30 PM',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80',
    createdAt: Date.now() - 86400000 * 2
  }
];

@Injectable({ providedIn: 'root' })
export class GroundService {
  constructor(private storage: StorageService) {
    if (!this.storage.get<Ground[]>(GROUNDS_KEY)) {
      this.storage.set(GROUNDS_KEY, SAMPLE_GROUNDS);
    }
  }

  getAll(): Ground[] {
    return this.storage.get<Ground[]>(GROUNDS_KEY) || [];
  }

  getById(id: string): Ground | undefined {
    return this.getAll().find(g => g.id === id);
  }

  save(ground: Ground): void {
    const grounds = this.getAll();
    const idx = grounds.findIndex(g => g.id === ground.id);
    if (idx >= 0) grounds[idx] = ground;
    else grounds.push(ground);
    this.storage.set(GROUNDS_KEY, grounds);
  }

  delete(id: string): void {
    this.storage.set(GROUNDS_KEY, this.getAll().filter(g => g.id !== id));
  }

  generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).slice(2);
  }
}
