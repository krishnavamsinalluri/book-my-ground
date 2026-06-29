import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { GroundService } from '../../../core/services/ground.service';

const ALL_FACILITIES = ['Flood Lights','Parking','Washroom','Drinking Water','Practice Nets','Changing Room','Cafeteria','First Aid','Locker Room','Spectator Seating','Scoreboard'];

@Component({
  selector: 'app-edit-ground',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './edit-ground.component.html',
  styleUrls: ['./edit-ground.component.scss']
})
export class EditGroundComponent implements OnInit {
  allFacilities = ALL_FACILITIES;
  selectedFacilities: string[] = [];
  saved = false;
  notFound = false;
  groundId = '';
  form: ReturnType<FormBuilder['group']>;

  constructor(private fb: FormBuilder, private groundService: GroundService, private route: ActivatedRoute, private router: Router) {
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

  ngOnInit() {
    this.groundId = this.route.snapshot.paramMap.get('id')!;
    const ground = this.groundService.getById(this.groundId);
    if (!ground) { this.notFound = true; return; }
    this.selectedFacilities = [...ground.facilities];
    this.form.patchValue({
      name: ground.name, city: ground.city, address: ground.address,
      description: ground.description, image: ground.image,
      pricePerHour: ground.pricePerHour, rating: ground.rating,
      openingTime: ground.openingTime, closingTime: ground.closingTime,
      available: ground.available
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
    const existing = this.groundService.getById(this.groundId)!;
    this.groundService.save({
      ...existing,
      name: v.name!, city: v.city!, address: v.address!,
      description: v.description!, image: v.image!,
      pricePerHour: v.pricePerHour!, rating: v.rating!,
      openingTime: v.openingTime!, closingTime: v.closingTime!,
      available: !!v.available,
      facilities: this.selectedFacilities
    });
    this.saved = true;
    setTimeout(() => this.router.navigate(['/admin/grounds']), 1200);
  }
}
