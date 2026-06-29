import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { Booking } from '../models/booking.model';

const BOOKINGS_KEY = 'bmg_bookings';

@Injectable({ providedIn: 'root' })
export class BookingService {
  constructor(private storage: StorageService) {}

  getAll(): Booking[] {
    return this.storage.get<Booking[]>(BOOKINGS_KEY) || [];
  }

  save(booking: Booking): void {
    const bookings = this.getAll();
    bookings.unshift(booking);
    this.storage.set(BOOKINGS_KEY, bookings);
  }

  generateId(): string {
    return 'BK' + Date.now().toString(36).toUpperCase();
  }

  generateSlots(openingTime: string, closingTime: string): string[] {
    const slots: string[] = [];
    const toMinutes = (t: string) => {
      const [time, period] = t.split(' ');
      let [h, m] = time.split(':').map(Number);
      if (period === 'PM' && h !== 12) h += 12;
      if (period === 'AM' && h === 12) h = 0;
      return h * 60 + m;
    };
    const toLabel = (mins: number) => {
      const h = Math.floor(mins / 60) % 24;
      const m = mins % 60;
      const period = h >= 12 ? 'PM' : 'AM';
      const display = h === 0 ? 12 : h > 12 ? h - 12 : h;
      return `${display.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')} ${period}`;
    };
    let start = toMinutes(openingTime);
    const end = toMinutes(closingTime);
    while (start + 60 <= end) {
      slots.push(`${toLabel(start)} - ${toLabel(start + 60)}`);
      start += 60;
    }
    return slots;
  }
}
