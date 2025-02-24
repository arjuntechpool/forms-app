import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
  ],
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

  // Table properties
  displayedColumns: string[] = [
    'name',
    'email',
    'date',
    'gender',
    'preference',
    'houseName',
    'mainPlace',
    'post',
    'pin',
    'actions',
  ];
  filteredResults = new MatTableDataSource<any>([]); // DataSource for the table
  pageSize = 10; // Default page size
  pageSizeOptions = [5, 10, 25, 100]; // Page size options

  // Handle button click
  onSubmit() {
    this.submitted = true;

    if (this.isFormValid()) {
      // Save the form data
      const formData = { ...this.model, date: this.formatDate(this.model.date) };
      this.formResults.push(formData);
      this.filteredResults.data = [...this.formResults]; // Update the table data
      this.showTable = true;
      this.resetForm();
      this.submitted = false;
    } else {
      alert('Please fill out all required fields correctly.');
    }
  }

  // Validate form fields
  isFormValid(): boolean {
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
    this.filteredResults.data = [...this.formResults]; // Update the table data
  }

  // Delete an entry
  deleteEntry(index: number) {
    this.formResults.splice(index, 1); // Remove the entry at the specified index
    this.filteredResults.data = [...this.formResults]; // Update the table data
    if (this.formResults.length === 0) {
      this.showTable = false; // Hide the table if no entries are left
    }
  }

  // Format date as dd/MM/yyyy
  formatDate(dateString: string): string {
    if (!dateString) return ''; // Handle null or undefined
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB');
  }

  // Apply filter to the table
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.filteredResults.filter = filterValue.trim().toLowerCase();
  }

  // Handle page change
  onPageChange(event: PageEvent) {
    this.pageSize = event.pageSize;
  }
}
