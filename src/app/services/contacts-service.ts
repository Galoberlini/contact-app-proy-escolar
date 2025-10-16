import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  /** Devuelve todos los contactos */
  getContacts() { }

  /** Devuelve un contato segun ID */
  getContactById(id: string) {
  }

  /** Crea un contacto */
  createContact(contact: any) {
  }

  /** Edita un contacto */
  editContact(contact: any) { }

  /** Borra un contacto */
  deleteContact(id: string) {
  }

  setFavourite() { }
}
