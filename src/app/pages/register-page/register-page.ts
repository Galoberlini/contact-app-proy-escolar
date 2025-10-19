import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UsersService } from '../../services/users-service';
import { NewUser } from '../../interfaces/user';

@Component({
  selector: 'app-register-page',
  imports: [RouterModule, FormsModule],
  templateUrl: './register-page.html',
  styleUrl: './register-page.scss'
})
export class RegisterPage {
  errorRegister = false;
  usersService = inject(UsersService);
  router = inject(Router);

  async register(form: NgForm) {
    this.errorRegister = false;
    if (
      !form.value.email ||
      !form.value.password ||
      !form.value.password2 ||
      !form.value.firstName ||
      !form.value.lastName ||
      form.value.password !== form.value.password2
    ) {
      this.errorRegister = true;
      return;
    }
    const res: Response = await this.usersService.register(form.value as NewUser);
    if (res.ok) {
      this.router.navigate(['/login']);
    }
    this.errorRegister = true;
  }
}
