import { Component, inject, input, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Contact } from '../../interfaces/contacts';
import { ContactsService } from '../../services/contacts-service';
import { Spinner } from '../../components/spinner/spinner';

@Component({
  selector: 'app-contacts-details-page',
  imports: [RouterModule, Spinner],
  templateUrl: './contacts-details-page.html',
  styleUrl: './contacts-details-page.scss'
})
export class ContactsDetailsPage implements OnInit {
  idContacto = input.required<string>();
  readonly contactService = inject(ContactsService);
  contacto: Contact | undefined;
  cargandoContacto = false;
  router = inject(Router);

  async ngOnInit() {
    if (this.idContacto()) {
      this.contacto = this.contactService.contacts.find(
        (contacto) => contacto.id.toString() === this.idContacto()
      );
      if (!this.contacto) this.cargandoContacto = true;
      const res = await this.contactService.getContactById(this.idContacto());
      if (res) this.contacto = res;
      this.cargandoContacto = false;
    }
  }

  async toggleFavorite() {
    if (this.contacto) {
      const res = await this.contactService.setFavourite(this.contacto.id);
      if (res) this.contacto.isFavorite = !this.contacto.isFavorite;
    }
  }

  async deleteContact() {
    if (this.contacto) {
      const res = await this.contactService.deleteContact(this.contacto.id);
      if (res) this.router.navigate(['/']);
    }
  }
}
