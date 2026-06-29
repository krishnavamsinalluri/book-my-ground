import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { GroundService } from '../../../core/services/ground.service';

const ALL_FACILITIES = ['Flood Lights','Parking','Washroom','Drinking Water','Practice Nets','Changing Room','Cafeteria','First Aid','Locker Room','Spectator Seating','Scoreboard'];

@Component({
  selector: 'app-add-ground',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './add-ground.component.html',
  styleUrls: ['./add-ground.component.scss']
})
export class AddGroundComponent {
  allFacilities = ALL_FACILITIES;
  selectedFacilities: string[] = [];
  saved = false;
  form: ReturnType<FormBuilder['group']>;

  constructor(private fb: FormBuilder, private groundService: GroundService, private router: Router) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      city: ['', Validators.required],
      address: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(20)]],
      image: ['', Validators.required],
      pricePerHour: [1200, [Validators.required, Validators.min(100)]],
      rating: [4.5, [Validators.required, Validators.min(1), Validators.max(5)]],
      openingTime: ['06:00 AM', Validators.required],
      closingTime: ['10:00 PM', Validators.required],
      available: [true]
    });
  }

  toggleFacility(f: string) {
    const idx = this.selectedFacilities.indexOf(f);
    idx >= 0 ? this.selectedFacilities.splice(idx, 1) : this.selectedFacilities.push(f);
  }

  isFacilitySelected(f: string) { return this.selectedFacilities.includes(f); }

  submit() {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    const v = this.form.value;
    this.groundService.save({
      id: this.groundService.generateId(),
      name: v.name!, city: v.city!, address: v.address!,
      description: v.description!, image: v.image!,
      pricePerHour: v.pricePerHour!, rating: v.rating!,
      openingTime: v.openingTime!, closingTime: v.closingTime!,
      available: !!v.available,
      facilities: this.selectedFacilities,
      createdAt: Date.now()
    });
    this.saved = true;
    setTimeout(() => this.router.navigate(['/admin/grounds']), 1200);
  }
}
