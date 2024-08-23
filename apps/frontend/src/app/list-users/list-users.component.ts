import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ListUsersService } from './list-users-service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    RouterOutlet,
    CommonModule]
})
export class ListUsersComponent implements OnInit {
  users: any[] = [];
  errorMessage: string | null = null; // Add an error message property

  constructor(private http: HttpClient,
    private fb: FormBuilder,
    private listUsersService: ListUsersService, // Inject SignupService
    private router: Router
  ) { }

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.listUsersService.getAllUsers().subscribe(
      response => {
        this.users = response;
        this.errorMessage = null; // Clear error message on success
        console.log('data fetched', response);
      },
      error => {
        if (error.status === 403) {
          this.errorMessage = 'You do not have permission to view this data.';
        } else {
          this.errorMessage = 'An error occurred while fetching user data.';
        }
        console.error('Error fetching data', error);
      }
    );
  }

  logout(): void {
    this.listUsersService.logout().subscribe(
      () => {
        localStorage.removeItem('token');
        this.router.navigate(['/login']); // Navigate to the login page
      },
      error => {
        console.error('Logout failed', error);
      }
    );
  }
}
