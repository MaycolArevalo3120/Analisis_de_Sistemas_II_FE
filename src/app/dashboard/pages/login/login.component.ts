import { Component, inject } from '@angular/core';
import { MasterService } from '../../../services/master.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

const MODULES = [
  FormsModule,
  ReactiveFormsModule
];


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MODULES],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export default class LoginComponent {
  
  private readonly router = inject(Router);
  private authService = inject(MasterService);

  signInWithGoogle() {
    this.authService.login();
  }
  redirectToPage() {
    this.router.navigate(['/dashboard/proyect-table']);
  }
}
