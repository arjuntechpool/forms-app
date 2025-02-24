import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule],
})
export class SignupComponent {
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

  formResults: any[] = [];
  showTable = false;
  submitted = false;
  editIndex: number | null = null; // Track the index of the entry being edited

  onSubmit() {
    this.submitted = true;

    if (this.isFormValid()) {
      const formData = { ...this.model, date: this.formatDate(this.model.date) };

      if (this.editIndex !== null) {
        // Update existing entry
        this.formResults[this.editIndex] = formData;
        this.editIndex = null; // Reset edit index
      } else {
        // Add new entry
        this.formResults.push(formData);
      }

      this.showTable = true;
      this.resetForm();
      this.submitted = false;
    } else {
      alert('Please fill out all required fields correctly.');
    }
  }

  isFormValid(): boolean {
    const pinMatch = this.model.pin.match(/^\d{6}$/);
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return (
      this.model.name.length >= 2 &&
      emailPattern.test(this.model.email) &&
      this.model.date.trim() !== '' &&
      this.model.gender.trim() !== '' &&
      pinMatch !== null
    );
  }

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
    this.submitted = false;
    this.editIndex = null; // Reset edit index
  }

  clearForm() {
    this.resetForm();
  }

  editEntry(index: number) {
    const entry = this.formResults[index];
    this.model = { ...entry };
    this.editIndex = index; // Set the index of the entry being edited
  }

  deleteEntry(index: number) {
    this.formResults.splice(index, 1); // Remove the entry at the specified index
    if (this.formResults.length === 0) {
      this.showTable = false; // Hide the table if no entries are left
    }
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB'); // Format as dd/MM/yyyy
  }
}
