import {Routes, RouterModule} from '@angular/router';
import {UserCreateComponent} from './users/user-create/user-create.component';
import {UserListComponent} from './users/user-list/user-list.component';
import {UserResolver} from './users/users.resolve';

const MAINMENU_ROUTES: Routes = [
    {path: '', redirectTo: '/users', pathMatch: 'full'},
    {path: 'users', component: UserListComponent},
    {path: 'users/create', component: UserCreateComponent},
    {
        path: 'users/edit/:id', component: UserCreateComponent, resolve: {
            userDetail: UserResolver,
        },
    }
];
export const CONST_ROUTING = RouterModule.forRoot(MAINMENU_ROUTES);