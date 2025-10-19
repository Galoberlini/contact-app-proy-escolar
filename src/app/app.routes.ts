import { Routes } from '@angular/router';
import { LoginPage } from './pages/login-page/login-page';
import { ContactsPage } from './pages/contacts-page/contacts-page';
import { ContactsDetailsPage } from './pages/contacts-details-page/contacts-details-page';
import { Logged } from './layouts/logged/logged';
import { RegisterPage } from './pages/register-page/register-page';
import { onlyPublicUserGuard } from './guards/only-public-user-guard';
import { onlyLoggedUserGuard } from './guards/only-logged-user-guard';
import { NewEditContact } from './pages/new-edit-contact/new-edit-contact';
import { GroupsPage } from './pages/groups/groups';

export const routes: Routes = [

    {
        path: "login",
        component: LoginPage,
        canActivate: [onlyPublicUserGuard]
    },

    {
        path: "register",
        component: RegisterPage,
        canActivate: [onlyPublicUserGuard]
    },
    {
        path: "",
        component: Logged,
        canActivateChild: [onlyLoggedUserGuard],
        children: [
            {
                path: "",
                component: ContactsPage
            },
            {
                path: "contacts/new",
                component: NewEditContact
            },
            {
                path: "contacts/:idContacto",
                component: ContactsDetailsPage
            },
            {
                path: "contacts/:idContacto/edit",
                component: NewEditContact
            },
            {
                path: "groups",
                component: GroupsPage
            }
        ]
    },
];