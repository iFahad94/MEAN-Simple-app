import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SignupService } from './signup.service'; // Import SignupService
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  imports: [
    ReactiveFormsModule,
    RouterLink,
    RouterOutlet
  ]
})
export class SignupComponent {
  signupForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private signupService: SignupService, // Inject SignupService
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSignup(): void {
    if (this.signupForm.valid) {
      this.signupService.signup(this.signupForm.value).subscribe(
        response => {
          console.log('Signup successful', response);
          this.router.navigate(['/login']);
        },
        error => {
          console.error('Signup failed', error);
        }
      );
    }
  }
}
