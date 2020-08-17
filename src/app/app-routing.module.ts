import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CustomersComponent} from './pages/customers/customers.component';
import {LoginGuard} from './guards/login.guard';
import {ProductsComponent} from './pages/products/products.component';
import {AccountsComponent} from './pages/accounts/accounts.component';
import {SignInComponent} from './pages/sign-in/sign-in.component';

const routes: Routes = [
    {path: 'customers', component: CustomersComponent, canActivate: [LoginGuard]},
    {path: 'products', component: ProductsComponent, canActivate: [LoginGuard]},
    {path: 'accounts', component: AccountsComponent, canActivate: [LoginGuard]},
    {path: 'sign-in', component: SignInComponent},
    {path: '**', redirectTo: '/products'}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
