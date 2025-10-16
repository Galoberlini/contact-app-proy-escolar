import { Routes } from '@angular/router';
import { LoginPage } from './pages/login-page/login-page';
import { ContactsPage } from './pages/contacts-page/contacts-page';
import { ContactsDetailsPage } from './pages/contacts-details-page/contacts-details-page';
import { Logged } from './layouts/logged/logged';
import { RegisterPage } from './pages/register-page/register-page';

export const routes: Routes = [

    {
        path: "login",
        component: LoginPage
    },

    {
        path: "register",
        component: RegisterPage
    },

    {
        path: "contacts/:id",
        component: ContactsDetailsPage
    },
    {
        path: "",
        component: Logged,
        children: [
            {
                path: "",
                component: ContactsPage
            },
        ]
    },
];