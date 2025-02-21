import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
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
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent  {
  buy: boolean = false;
  rent: boolean = false;
  modelName: string = '';
  gender: string = '';
  showTable: boolean = false;
  formResults: any[] = [];
  editIndex: number | null = null;
  selectedState: string = '';
  selectedDistrict: string = '';

  filteredDistricts: string[] = [];
  selectedDate: Date | null = null;

  states: string[] = ['Kerala', 'Tamil Nadu'];
  districts: { [key: string]: string[] } = {
    'Kerala': ['Kochi', 'Trivandrum', 'Calicut'],
    'Tamil Nadu': ['Chennai', 'Dindigul', 'Thoothukudi'],
  };

  onStateChange(state: string) {
    this.filteredDistricts = this.districts[state] || [];
    this.selectedDistrict = '';
  }

  editEntry(index: number) {
    const data = this.formResults[index];
    this.editIndex = index;

    this.modelName = data.name;
    this.gender = data.gender;
    this.buy = data.buy;
    this.rent = data.rent;
    this.selectedState = data.state;
    this.onStateChange(this.selectedState);
    this.selectedDistrict = data.district;
    this.selectedDate = new Date(data.date);

    setTimeout(() => {
      const form = document.querySelector('form') as HTMLFormElement;
      (form.elements.namedItem('email') as HTMLInputElement).value = data.email;
      (form.elements.namedItem('date') as HTMLInputElement).value = data.date;
      (form.elements.namedItem('houseName') as HTMLInputElement).value = data.houseName;
      (form.elements.namedItem('mainPlace') as HTMLInputElement).value = data.mainPlace;
      (form.elements.namedItem('post') as HTMLInputElement).value = data.post;
      (form.elements.namedItem('pin') as HTMLInputElement).value = data.pin;
    }, 0);
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      if (this.editIndex !== null) {
        // Update existing entry
        this.formResults[this.editIndex] = { ...form.value };
        this.editIndex = null; // Reset edit mode
      } else {
        // Add new entry
        this.formResults.push(form.value);
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

