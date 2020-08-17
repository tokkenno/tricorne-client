import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {SidebarComponent} from './components/sidebar/sidebar.component';
import {CustomersComponent} from './pages/customers/customers.component';
import {ProductsComponent} from './pages/products/products.component';
import {AccountsComponent} from './pages/accounts/accounts.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthInterceptor} from './interceptors/auth.interceptor';
import {SignInComponent} from './pages/sign-in/sign-in.component';
import {ReactiveFormsModule} from '@angular/forms';
import {ToastContainerComponent} from './components/toast-container/toast-container.component';
import { ProductEditComponent } from './pages/products/product-edit/product-edit.component';

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        SidebarComponent,
        CustomersComponent,
        ProductsComponent,
        AccountsComponent,
        SignInComponent,
        ToastContainerComponent,
        ProductEditComponent
    ],
    imports: [
        HttpClientModule,
        BrowserModule,
        AppRoutingModule,
        NgbModule,
        ReactiveFormsModule
    ],
    providers: [{
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true
    }],
    bootstrap: [AppComponent]
})
export class AppModule {
}
