import { Component, inject, signal } from '@angular/core';
import { Auth } from '../../services/auth';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})

export class Login {
  public auth = inject(Auth);
  email = signal('');
  password = signal('');
}