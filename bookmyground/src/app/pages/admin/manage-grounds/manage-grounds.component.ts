import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { GroundService } from '../../../core/services/ground.service';
import { Ground } from '../../../core/models/ground.model';

@Component({
  selector: 'app-manage-grounds',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './manage-grounds.component.html',
  styleUrls: ['./manage-grounds.component.scss']
})
export class ManageGroundsComponent implements OnInit {
  grounds: Ground[] = [];
  deleteId: string | null = null;

  constructor(private groundService: GroundService) {}

  ngOnInit() { this.load(); }

  load() { this.grounds = this.groundService.getAll(); }

  toggleAvailability(g: Ground) {
    this.groundService.save({ ...g, available: !g.available });
    this.load();
  }

  confirmDelete(id: string) { this.deleteId = id; }

  doDelete() {
    if (this.deleteId) {
      this.groundService.delete(this.deleteId);
      this.deleteId = null;
      this.load();
    }
  }
}
