import { inject, Injectable } from '@angular/core';
import { Contact, NewContact } from '../interfaces/contacts';
import { AuthService } from './auth-service';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  authService = inject(AuthService);
  readonly URL_BASE = 'https://agenda-api.somee.com/api/contacts';

  contacts: Contact[] = [];

  /** Obtiene los contactos del backend */
  async getContacts(): Promise<void> {
    const res = await fetch(this.URL_BASE, {
      headers: {
        Authorization: 'Bearer ' + this.authService.token,
      }
    });
    if (!res.ok) return;
    const resJson: Contact[] = await res.json();
    this.contacts = resJson;
  }

  /** Devuelve un contato en particular segun su ID */
  async getContactById(id: string | number): Promise<Contact | undefined> {
    const res = await fetch(this.URL_BASE + '/' + id, {
      headers: {
        Authorization: 'Bearer ' + this.authService.token,
      },
    });
    if (!res.ok) return;
    const resContact: Contact = await res.json();
    return resContact;
  }

  /** Crea un contacto */
  async createContact(nuevoContacto: NewContact): Promise<Contact | undefined> {
    const res = await fetch(this.URL_BASE, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.authService.token,
      },
      body: JSON.stringify(nuevoContacto)
    });
    if (!res.ok) return;
    const resContact: Contact = await res.json();
    this.contacts.push(resContact);
    return resContact;
  }

  /** Edita un contacto */
  async editContact(contactoEditado: Contact): Promise<Contact | undefined> {
    const res = await fetch(this.URL_BASE + '/' + contactoEditado.id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.authService.token,
      },
      body: JSON.stringify(contactoEditado)
    });
    if (!res.ok) return;
    this.contacts = this.contacts.map((contact) => {
      if (contact.id === contactoEditado.id) {
        return contactoEditado;
      }
      return contact;
    });
    return contactoEditado;
  }

  /** Borra un contacto */
  async deleteContact(id: string | number): Promise<boolean | undefined> {
    const res = await fetch(this.URL_BASE + '/' + id, {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + this.authService.token,
      },
    });
    if (!res.ok) return;
    this.contacts = this.contacts.filter((contact) => contact.id !== id);
    return true;
  }

  /** Marca/desmarca un contacto como favorito */
  async setFavourite(id: string | number): Promise<boolean | undefined> {
    const res = await fetch(this.URL_BASE + '/' + id + '/favorite', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + this.authService.token,
      },
    });
    if (!res.ok) return;
    this.contacts = this.contacts.map((contact) => {
      if (contact.id === id) {
        return { ...contact, isFavorite: !contact.isFavorite };
      }
      return contact;
    });
    return true;
  }
}
