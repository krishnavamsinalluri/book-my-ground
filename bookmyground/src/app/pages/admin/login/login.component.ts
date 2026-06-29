import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  form: ReturnType<FormBuilder['group']>;
  error = '';
  loading = false;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    if (auth.isLoggedIn()) router.navigate(['/admin/dashboard']);
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  submit() {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.loading = true;
    this.error = '';
    setTimeout(() => {
      const { username, password } = this.form.value;
      if (this.auth.login(username!, password!)) {
        this.router.navigate(['/admin/dashboard']);
      } else {
        this.error = 'Invalid credentials. Try admin / admin123';
        this.loading = false;
      }
    }, 600);
  }
}
