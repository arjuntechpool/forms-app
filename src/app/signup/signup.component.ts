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

  submitted = false;
  showTable = false;
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

  dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  onSubmit() {
    this.submitted = true;

    if (this.isFormValid()) {
      const formData = { ...this.model };

      // Check for duplicate email
      const emailExists = this.dataSource.data.some(
        (entry, idx) => entry.email === formData.email && idx !== this.editingIndex
      );
      if (emailExists) {
        alert('An entry with this email already exists.');
        return;
      }

      if (this.editingIndex !== null) {
        // Update existing entry
        this.dataSource.data[this.editingIndex] = formData;
        this.editingIndex = null;
      } else {
        // Add new entry
        this.dataSource.data.push(formData);
      }

      // Refresh the table
      this.dataSource.data = [...this.dataSource.data];
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
    this.isEditing = false;
  }

  clearForm() {
    this.resetForm();
  }

  editEntry(index: number) {
    const entry = this.dataSource.data[index];
    this.model = { ...entry };
    this.isEditing = true;
    this.editingIndex = index;
  }

  deleteEntry(index: number) {
    const confirmed = confirm('Are you sure you want to delete this entry?');
    if (confirmed) {
      this.dataSource.data.splice(index, 1);
      this.dataSource.data = [...this.dataSource.data]; // Refresh the table
      this.showTable = this.dataSource.data.length > 0; // Hide table if no data is left
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
