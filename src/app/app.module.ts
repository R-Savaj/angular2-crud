import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';
import {ReactiveFormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import {UserCreateComponent} from './users/user-create/user-create.component';
import {UserListComponent} from './users/user-list/user-list.component';
import {MenuComponent} from './menu/menu.component';
import {CONST_ROUTING} from './app.routing';
import {BlockUIModule} from 'ng-block-ui';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';
import {CommonModule} from '@angular/common';
import {UserResolver} from './users/users.resolve';
import {UsersService} from './users/users.service';
import {DataTableModule} from "angular2-datatable";
import { NgDatepickerModule } from 'ng2-datepicker';
import { MomentModule } from 'angular2-moment';

import { FormsModule } from '@angular/forms';


@NgModule({
    declarations: [
        AppComponent,
        UserCreateComponent,
        UserListComponent,
        MenuComponent
    ],
    imports: [
        BrowserModule,
        HttpModule,
        ReactiveFormsModule,
        CONST_ROUTING,
        BlockUIModule,
        CommonModule,
        BrowserAnimationsModule, 
        ToastrModule.forRoot(),
         DataTableModule,
         FormsModule,
         NgDatepickerModule,
          MomentModule
 
  
    
       ],
    providers: [UserResolver,UsersService],
    bootstrap: [AppComponent]
})
export class AppModule {}
