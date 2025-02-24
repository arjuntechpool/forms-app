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
  submitted = false; // Track if the form has been submitted

  onSubmit() {
    this.submitted = true; // Set submitted to true on form submission

    if (this.isFormValid()) {
      this.formResults.push({ ...this.model });
      this.showTable = true;
      this.resetForm();
      this.submitted = false; // Reset submitted state after successful submission
    } else {
      alert('Please fill out all required fields correctly.');
    }
  }

  isFormValid(): boolean {
    const pinMatch = this.model.pin.match(/^\d{6}$/);
    return (
      this.model.name.length >= 2 &&
      this.model.email.includes('@') &&
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
  }
}
