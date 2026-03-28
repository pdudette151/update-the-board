import { Component, inject } from '@angular/core';
import { Auth } from '../../services/auth';


@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  public auth = inject(Auth);

}
