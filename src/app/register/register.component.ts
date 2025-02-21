import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatCheckboxModule,
    MatSelectModule,
    MatIconModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  buy: boolean = false;
  rent: boolean = false;
  modelName: string = '';
  gender: string = '';
  showTable: boolean = false;
  formResults: any[] = [];
  editIndex: number | null = null;
  selectedState: string = '';
  selectedDistrict: string = '';
  email: string = '';
  houseName: string = '';
  mainPlace: string = '';
  post: string = '';
  pin: string = '';
  filteredDistricts: string[] = [];
  selectedDate: Date | null = null;

  states: string[] = ['Kerala', 'Tamil Nadu'];
  districts: { [key: string]: string[] } = {
    Kerala: ['Kochi', 'Trivandrum', 'Calicut'],
    'Tamil Nadu': ['Chennai', 'Dindigul', 'Thoothukudi'],
  };

  onStateChange(state: string) {
    this.filteredDistricts = this.districts[state] || [];
    this.selectedDistrict = '';
  }

  editEntry(index: number) {
    const data = this.formResults[index];
    this.editIndex = index;

    // Directly bind data to ngModel properties
    this.modelName = data.name;
    this.gender = data.gender;
    this.buy = data.buy;
    this.rent = data.rent;
    this.selectedState = data.state;
    this.onStateChange(this.selectedState);
    this.selectedDistrict = data.district;
    this.selectedDate = new Date(data.date);
    this.email = data.email;
    this.houseName = data.houseName;
    this.mainPlace = data.mainPlace;
    this.post = data.post;
    this.pin = data.pin;
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      const formData = {
        name: this.modelName,
        email: this.email,
        date: this.selectedDate,
        gender: this.gender,
        buy: this.buy,
        rent: this.rent,
        houseName: this.houseName,
        mainPlace: this.mainPlace,
        post: this.post,
        pin: this.pin,
        state: this.selectedState,
        district: this.selectedDistrict,
      };

      if (this.editIndex !== null) {
        this.formResults[this.editIndex] = { ...formData };
        this.editIndex = null;
      } else {
        this.formResults.push(formData);
      }

      form.resetForm();
      this.showResults();
    } else {
      console.log('Form is invalid!');
    }
  }

  showResults() {
    this.showTable = true;
  }
}

function showResults() {
  throw new Error('Function not implemented.');
}
