import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import Swal, { SweetAlertResult } from 'sweetalert2';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-logged',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './logged.html',
  styleUrl: './logged.scss'
})
export class Logged {

  authService = inject(AuthService);

  openLogoutModal() {
    Swal.fire({
      title: '¿Desea cerrar sesión?',
      showDenyButton: true,
      showCancelButton: true,
      showConfirmButton: false,
      cancelButtonText: 'Cancelar',
      denyButtonText: 'Cerrar sesión'
    }).then((result: SweetAlertResult) => {
      if (result.isDenied) {
        this.authService.logout();
      }
    });
  }
}
