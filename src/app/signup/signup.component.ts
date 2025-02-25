import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSort, MatSortModule } from '@angular/material/sort';

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
    MatSortModule,
  ],
})

export class SignupComponent implements AfterViewInit {
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
  editingIndex: number | null = null;
  isEditing: boolean = false;

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
  filteredResults = new MatTableDataSource<any>([]);
  dataSource!: MatTableDataSource<`formresults`>;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  ngAfterViewInit() {
    this.filteredResults.paginator = this.paginator;
    this.filteredResults.sort = this.sort;
  }

  onSubmit() {
    this.submitted = true;

    if (this.isFormValid()) {
      const formData = { ...this.model };

      // Check for duplicate email
      const emailExists = this.formResults.some((entry, idx) => entry.email === formData.email && idx !== this.editingIndex);
      if (emailExists) {
        alert('An entry with this email already exists.');
        return;
      }

      if (this.editingIndex !== null) {
        // Update existing entry
        this.formResults[this.editingIndex] = formData;
        this.editingIndex = null;
      } else {
        // Add new entry
        this.formResults.push(formData);
      }

      this.filteredResults.data = [...this.formResults];
      this.showTable = true;
      this.resetForm();
      this.submitted = false;
    } else {
      alert('Please fill out all required fields correctly.');
    }
  }

  isFormValid(): boolean {
    return (
      this.isNameValid() &&
      this.isEmailValid() &&
      this.isDateValid() &&
      this.isGenderValid() &&
      this.isPinValid()
    );
  }

  isNameValid(): boolean {
    return this.model.name.length >= 2;
  }

  isEmailValid(): boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(this.model.email);
  }

  isDateValid(): boolean {
    return this.model.date.trim() !== '';
  }

  isGenderValid(): boolean {
    return this.model.gender.trim() !== '';
  }

  isPinValid(): boolean {
    const pinMatch = this.model.pin.match(/^\d{6}$/);
    return pinMatch !== null;
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
    this.editingIndex = null;
  }

  clearForm() {
    this.resetForm();
  }

  editEntry(index: number) {
    const entry = this.formResults[index];
    this.model = { ...entry };
    this.isEditing = true;
    this.editingIndex = index;
  }

  deleteEntry(index: number) {
    const confirmed = confirm('Are you sure you want to delete this entry?');
    if (confirmed) {
      this.formResults.splice(index, 1);
      this.filteredResults.data = [...this.formResults];
      if (this.formResults.length === 0) {
        this.showTable = false;
      }
    }
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.filteredResults.filter = filterValue.trim().toLowerCase();
  }
}
