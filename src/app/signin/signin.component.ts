import { MatCheckboxModule } from '@angular/material/checkbox';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroupDirective,
  FormsModule,
  NgForm,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher, MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CommonModule } from '@angular/common';
import { MatRadioModule } from '@angular/material/radio';

// /** Error when invalid control is dirty, touched, or submitted. */
// export class MyErrorStateMatcher implements ErrorStateMatcher {
//   isErrorState(
//     control: FormControl | null,
//     form: FormGroupDirective | NgForm | null
//   ): boolean {
//     const isSubmitted = form && form.submitted;
//     return !!(
//       control &&
//       control.invalid &&
//       (control.dirty || control.touched || isSubmitted)
//     );
//   }
// }

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatCheckboxModule,
  ],
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent {
  gender: string = '';
  buy: boolean = false;
  rent: boolean = false;
  formResults: any[] = [];
  showTable: boolean = false;

  onSubmit(form: any) {
    if (form.valid) {
      this.formResults.push(form.value);
      console.log('Form Submitted!', form.value);
      form.resetForm(); // Reset the form after successful submission
    } else {
      console.log('Form is invalid!');
    }
  }

  showResults() {
    this.showTable = true;
  }
}
