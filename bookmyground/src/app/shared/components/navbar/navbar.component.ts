import { Component, HostListener, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  scrolled = false;
  menuOpen = false;
  isAdmin = false;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {
    this.isAdmin = this.auth.isLoggedIn();
    this.router.events.subscribe(() => {
      this.isAdmin = this.auth.isLoggedIn();
      this.menuOpen = false;
    });
  }

  @HostListener('window:scroll')
  onScroll() { this.scrolled = window.scrollY > 60; }

  logout() {
    this.auth.logout();
    this.isAdmin = false;
    this.router.navigate(['/']);
  }
}
