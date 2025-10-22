import { Component, OnInit, inject, input, viewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Spinner } from '../../components/spinner/spinner';
import { Contact, NewContact } from '../../interfaces/contacts';
import { ContactsService } from '../../services/contacts-service';

@Component({
  selector: 'app-new-edit-contact',
  imports: [FormsModule, Spinner],
  templateUrl: './new-edit-contact.html',
  styleUrl: './new-edit-contact.scss'
})
export class NewEditContact implements OnInit {
  contactsService = inject(ContactsService);
  router = inject(Router);
  errorEnBack = false;
  idContacto = input<number>();
  contactoOriginal: Contact | undefined = undefined;
  form = viewChild<NgForm>('newContactForm');
  isLoading = false;

  async ngOnInit() {
    if (this.idContacto()) {
      this.contactoOriginal = await this.contactsService.getContactById(this.idContacto()!);
      if (this.contactoOriginal) {
        this.form()?.setValue({
          firstName: this.contactoOriginal.firstName,
          lastName: this.contactoOriginal.lastName,
          address: this.contactoOriginal.address,
          email: this.contactoOriginal.email,
          image: this.contactoOriginal.image,
          number: this.contactoOriginal.number,
          company: this.contactoOriginal.company,
        });
      }
    }
  }

  async handleFormSubmission(form: NgForm) {
    this.errorEnBack = false;
    const nuevoContacto: NewContact = {
      firstName: form.value.firstName,
      lastName: form.value.lastName,
      address: form.value.address,
      email: form.value.email,
      image: form.value.image,
      number: form.value.number,
      company: form.value.company,
      isFavorite: false
    };
    let res: Contact | undefined;
    this.isLoading = true;
    if (this.idContacto()) {
      res = await this.contactsService.editContact({ ...nuevoContacto, id: this.idContacto()! });
    } else {
      res = await this.contactsService.createContact(nuevoContacto);
    }
    this.isLoading = false;
    if (!res) {
      this.errorEnBack = true;
      return;
    }
    this.router.navigate(['/contacts', res.id]);
  }
}
