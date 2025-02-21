import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// import { SigninComponent } from "./signin/signin.component";
import { RegisterComponent } from './register/register.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    //  SigninComponent,
    RegisterComponent
    ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'form-app';
}
