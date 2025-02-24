import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class SignupComponent {
  // Model to store form values
  model = {
    name: '',
    email: '',
    date: '',
    gender: '',
    buy: false,
    rent: false,
    houseName: '',
    mainPlace: '',
    post: '',
    pin: '',
  };

  formResults: any[] = []; // Store submitted results
  showTable = false; // Control table visibility
  submitted = false; // Track if the form has been submitted

  // Handle button click
  onSubmit() {
    this.submitted = true;

    if (this.isFormValid()) {
      // Save the form data
      this.formResults.push({ ...this.model });
      this.showTable = true;
      this.resetForm();
      this.submitted = false;
    } else {
      alert('Please fill out all required fields correctly.');
    }
  }

  // Validate form fields
  isFormValid(): boolean {
    // Check if the email already exists in formResults
    const emailExists = this.formResults.some(entry => entry.email === this.model.email);
    if (emailExists) {
      alert('This email is already registered.');
      return false;
    }
    return (
      this.isNameValid() &&
      this.isEmailValid() &&
      this.isDateValid() &&
      this.isGenderValid() &&
      this.isPinValid()
    );
  }

  // Name validation
  isNameValid(): boolean {
    return this.model.name.length >= 2;
  }

  // Email validation
  isEmailValid(): boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(this.model.email);
  }

  // Date validation
  isDateValid(): boolean {
    return this.model.date.trim() !== '';
  }

  // Gender validation
  isGenderValid(): boolean {
    return this.model.gender.trim() !== '';
  }

  // PIN validation
  isPinValid(): boolean {
    const pinMatch = this.model.pin.match(/^\d{6}$/);
    return pinMatch !== null;
  }

  // Reset form fields
  resetForm() {
    this.model = {
      name: '',
      email: '',
      date: '',
      gender: '',
      buy: false,
      rent: false,
      houseName: '',
      mainPlace: '',
      post: '',
      pin: '',
    };
  }

  // Clear form without submitting
  clearForm() {
    this.resetForm();
  }

  // Edit an entry
  editEntry(index: number) {
    const entry = this.formResults[index];
    this.model = { ...entry };
    this.formResults.splice(index, 1); // Remove the entry from the table
  }

  // Delete an entry
  deleteEntry(index: number) {
    this.formResults.splice(index, 1); // Remove the entry at the specified index
    if (this.formResults.length === 0) {
      this.showTable = false; // Hide the table if no entries are left
    }
  }

  // Format date as dd/MM/yyyy
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB');
  }
}
