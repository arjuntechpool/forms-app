import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';

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
    MatIconModule,
  ],
})
export class SignupComponent implements OnInit, AfterViewInit {
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
    state: '',
    district: '',
  };

  constructor(private dialog: MatDialog) {}

  states: string[] = ['Kerala', 'Tamil Nadu'];
  districts: Record<string, string[]> = {
    Kerala: ['Kochi', 'Trivandrum', 'Calicut'],
    'Tamil Nadu': ['Chennai', 'Dindigul', 'Thoothukudi'],
  };
  onStateChange(event: Event) {
    const selectedState = (event.target as HTMLSelectElement).value;
    this.model.state = selectedState;
    this.model.district = ''; // Reset district when state changes
  }

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
    // 'houseName',
    // 'mainPlace',
    // 'post',
    // 'pin',
    // 'state',
    // 'district',
    'actions',
  ];

  formResults: any[] = [];
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit() {
    this.showTable = this.dataSource.data.length > 0;
    this.showTable = true;
  }

  ngAfterViewInit() {
    // This will run after the view is initialized
    // and the paginator and sort components are available
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }

    if (this.sort) {
      this.dataSource.sort = this.sort;
    }
  }

  // This method will be called whenever we need to update the dataSource
  private updateDataSource(data: any[]) {
    this.dataSource = new MatTableDataSource<any>(data);

    // We need to reassign the paginator and sort after creating a new dataSource
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }

    if (this.sort) {
      this.dataSource.sort = this.sort;
    }

    this.showTable = data.length > 0;
  }

  onSubmit() {
    this.submitted = true;

    if (this.isFormValid()) {
      const formData = { ...this.model };

      // Check for duplicate email
      const emailExists = this.dataSource.data.some(
        (entry, idx) =>
          entry.email === formData.email && idx !== this.editingIndex
      );
      if (emailExists) {
        alert('An entry with this email already exists.');
        return;
      }

      let updatedData = [...this.dataSource.data];

      if (this.editingIndex !== null) {
        // Update existing entry
        updatedData[this.editingIndex] = formData;
        this.editingIndex = null;
      } else {
        // Add new entry
        updatedData.push(formData);
      }

      console.log('Saved/Updated Row Data:', formData);

      // Use the updateDataSource method to ensure paginator is connected
      this.updateDataSource(updatedData);
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
    if (!this.model.pin) return true; // Make PIN optional
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
      state: '',
      district: '',
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
      const updatedData = [...this.dataSource.data];
      updatedData.splice(index, 1);

      // Use the updateDataSource method to ensure paginator is connected
      this.updateDataSource(updatedData);
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
