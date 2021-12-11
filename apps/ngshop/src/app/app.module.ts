import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';

// import { UixModule } from './../../../../libs/uix/src/lib/uix.module';
import { UixModule } from '@meerev/uix';
import { ProductsModule } from './../../../../libs/products/src/lib/products.module';
import { OrdersModule } from './../../../../libs/orders/src/lib/orders.module';
import { UiModule } from '@meerev/ui';

import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import {ButtonModule} from 'primeng/button';
import { NavComponent } from './shared/nav/nav.component';
import { MessagesComponent } from './shared/messages/messages.component';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';


const appRoute: Routes = [
  { path: '', redirectTo: '/home-page', pathMatch: 'full' },
  { path: 'home-page', component: HomePageComponent },
];

@NgModule({
  declarations: [AppComponent, 
    HomePageComponent,
    HeaderComponent, 
    FooterComponent, 
    NavComponent, MessagesComponent],
  imports: [
    BrowserModule, 
    BrowserAnimationsModule, 
    HttpClientModule,
    RouterModule.forRoot(appRoute), 
    UiModule, 
    ButtonModule,
    ProductsModule,
    UixModule,
    OrdersModule,
    ToastModule
  ],
  providers: [MessageService],
  bootstrap: [AppComponent],
  exports: [
    MessagesComponent
  ],
})
export class AppModule {}
