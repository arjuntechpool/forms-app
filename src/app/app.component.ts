import { Component } from '@angular/core';
import { SignupComponent } from './signup/signup.component';
import { ViewDetailsModalComponent } from './view-details-modal/view-details-modal.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    //  SigninComponent,
    // RegisterComponent,
    SignupComponent,
    ViewDetailsModalComponent,
    ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'form-app';
}
