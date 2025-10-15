import { Routes } from '@angular/router';
import { LoginPage } from './pages/login-page/login-page';
import { ContactsPage } from './pages/contacts-page/contacts-page';
import { ContactsDetailsPage } from './pages/contacts-details-page/contacts-details-page';

export const routes: Routes = [

    {
        path: "login",
        component: LoginPage
    },

    {
        path: "",
        component: ContactsPage
    },

    {
        path: "contacts/:id",
        component: ContactsDetailsPage
    },
];