import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Ground } from '../../../core/models/ground.model';
import { BookingService } from '../../../core/services/booking.service';

@Component({
  selector: 'app-booking-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './booking-modal.component.html',
  styleUrls: ['./booking-modal.component.scss']
})
export class BookingModalComponent implements OnChanges {
  @Input() ground: Ground | null = null;
  @Input() visible = false;
  @Output() close = new EventEmitter<void>();

  form!: FormGroup;
  slots: string[] = [];
  today = new Date().toISOString().split('T')[0];

  constructor(private fb: FormBuilder, private bookingService: BookingService) {
    this.form = this.fb.group({
      customerName: ['', [Validators.required, Validators.minLength(2)]],
      phone: ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]],
      date: ['', Validators.required],
      slot: ['', Validators.required],
      players: [6, [Validators.required, Validators.min(2), Validators.max(22)]],
      message: ['']
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['ground'] && this.ground) {
      this.slots = this.bookingService.generateSlots(this.ground.openingTime, this.ground.closingTime);
      this.form.reset({ players: 6 });
    }
  }

  get f() { return this.form.controls; }

  confirmBooking() {
    if (this.form.invalid || !this.ground) { this.form.markAllAsTouched(); return; }
    const v = this.form.value;
    const booking = {
      id: this.bookingService.generateId(),
      groundId: this.ground.id,
      groundName: this.ground.name,
      city: this.ground.city,
      customerName: v.customerName,
      phone: v.phone,
      date: v.date,
      slot: v.slot,
      players: v.players,
      message: v.message || '',
      price: this.ground.pricePerHour,
      createdAt: Date.now()
    };
    this.bookingService.save(booking);

    const msg = encodeURIComponent(
      `Hello,\n\nI would like to book a cricket ground.\n\n` +
      `Ground: ${this.ground.name}\nDate: ${v.date}\nSlot: ${v.slot}\n` +
      `Price: ₹${this.ground.pricePerHour}\nCustomer: ${v.customerName}\n` +
      `Phone: ${v.phone}\nPlayers: ${v.players}\n\nPlease confirm my booking.`
    );
    window.open(`https://wa.me/919573660370?text=${msg}`, '_blank');
    this.close.emit();
  }
}
