import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { CustomFormsModule } from 'ngx-custom-validators';

import { AccountRoutingModule } from './account.route';
import { AccountService } from './../../services/account.service';

import { UserComponent } from './user/user.component';
import { LoginComponent } from './login/login.component';
import { AccountAppComponent } from './account.app.component';

@NgModule({
  declarations: [AccountAppComponent, UserComponent, LoginComponent],
  imports: [
    CommonModule,
    RouterModule,
    AccountRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CustomFormsModule,
  ],
  providers: [AccountService],
})
export class AccountModule {}
