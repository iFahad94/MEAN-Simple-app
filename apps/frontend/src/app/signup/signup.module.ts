import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'; // Ensure this import is present
import { SignupComponent } from './signup.component';

@NgModule({
  declarations: [SignupComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [SignupComponent] // Export if needed elsewhere
})
export class SignupModule {}
