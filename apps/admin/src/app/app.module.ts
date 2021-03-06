import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JwtInterceptor, UsersModule } from '@meerev/users';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

// Ngx stripe
import { NgxStripeModule } from 'ngx-stripe';


// Primeng Moduless
import { ConfirmationService, MessageService } from 'primeng/api';
import { CardModule } from 'primeng/card'
import { ToolbarModule } from 'primeng/toolbar'
import { ButtonModule } from 'primeng/button'
import { TableModule } from 'primeng/table'
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog'
import { ColorPickerModule } from 'primeng/colorpicker'
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea'
import { InputSwitchModule } from 'primeng/inputswitch'
import { DropdownModule } from 'primeng/dropdown';
import { EditorModule } from 'primeng/editor'
import { TagModule } from 'primeng/tag'
import { InputMaskModule } from 'primeng/inputmask'
import { FieldsetModule } from 'primeng/fieldset'

// Components
import { AppComponent } from './app.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ShellComponent } from './shared/shell/shell.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { CategoriesListComponent } from './pages/categories/categories-list/categories-list.component';
import { CategoriesFormComponent } from './pages/categories/categories-form/categories-form.component';
import { ProductsListComponent } from './pages/products/products-list/products-list.component';
import { ProductsFormComponent } from './pages/products/products-form/products-form.component';
import { UsersListComponent } from './pages/users/users-list/users-list.component';
import { UsersFormComponent } from './pages/users/users-form/users-form.component';
import { OrdersListComponent } from './pages/orders/orders-list/orders-list.component';
import { OrdersDetailsComponent } from './pages/orders/orders-details/orders-details.component';
import { AppRoutingModule } from './app-routing.module';


const UX_MODULES = [
  CardModule,
  ToolbarModule,
  ButtonModule,
  TableModule,
  InputTextModule,
  ToastModule,
  ConfirmDialogModule,
  ColorPickerModule,
  InputNumberModule,
  InputTextareaModule,
  InputSwitchModule,
  DropdownModule,
  EditorModule,
  TagModule,
  InputMaskModule,
  FieldsetModule
]


@NgModule({
  declarations: [AppComponent, DashboardComponent, ShellComponent, SidebarComponent, CategoriesListComponent, CategoriesFormComponent, ProductsListComponent, ProductsFormComponent, UsersListComponent, UsersFormComponent, OrdersListComponent, OrdersDetailsComponent],
  imports: [
    BrowserModule, 
    BrowserAnimationsModule,
    HttpClientModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgxStripeModule.forRoot('pk_test_51JcQfsKvvITcddeqjm0WwOyC1i2z5IGewA6ERMcqr5HIOMrXe4ekyVpaoogi6rR2gEUFFjWl3OSWLYetKaTPMluF00OYMu7S0v'),
    ...UX_MODULES,
    UsersModule
  ],
  providers: [MessageService, ConfirmationService,
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}
  ],
  bootstrap: [AppComponent],
  exports: [
    ShellComponent, 
    SidebarComponent
  ],
})
export class AppModule {}
