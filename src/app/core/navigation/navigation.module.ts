import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { HeaderComponent } from './header/header.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { MenuLoginComponent } from './menu-login/menu-login.component';

@NgModule({
  declarations: [
    HeaderComponent,
    NavbarComponent,
    FooterComponent,
    NotFoundComponent,
    MenuLoginComponent,
  ],
  imports: [CommonModule, RouterModule, NgbModule],
  exports: [
    HeaderComponent,
    NavbarComponent,
    FooterComponent,
    NotFoundComponent,
  ],
})
export class NavigationModule {}
