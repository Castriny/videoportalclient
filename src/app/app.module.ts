import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AppComponent} from './app.component';
import {AppRoomComponent} from './Components/Room/app.room.component';
import {AppPagenotfoundComponent} from './Components/GUI/PageNotFound/app.pagenotfound.component';
import {AppRegisterComponent} from './Components/Register/app.register.component';
import {AppDashboardComponent} from './Components/Dashboard/app.dashboard.component';
import {AppLoginComponent} from './Components/Login/app.login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {JWTInterceptor} from './Interceptors/JWTInterceptor';
import {CanActivateViaAuthGuard} from './Service/AuthService/Guards/CanActivateViaAuthGuard';
import {AuthService} from './Service/AuthService/AuthService';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppNavbarComponent} from './Components/GUI/Navbar/app.navbar.component';
import {AppHeaderComponent} from './Components/GUI/Header/app.header.component';
import {AppFooterComponent} from './Components/GUI/Footer/app.footer.component';
import {AppGalleryComponent} from './Components/GUI/Gallery/app.gallery.component';
import {AppShoppingcartComponent} from './Components/ShoppingCart/app.shoppingcart.component';
import {AppUploadfilesComponent} from './Components/UploadFiles/app.uploadfiles.component';
import {FileUploadModule} from 'ng2-file-upload';
import {SessionService} from "./Service/AuthService/SessionService";
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {AppGalleryListComponent} from "./Components/Admin/Gallery/app.gallery.list.component";
import {AppAdminDashboardComponent} from "./Components/Admin/Gallery/app.admin.dashboard.component";
import {AppAdminRouterComponent} from "./Components/Admin/Gallery/app.admin.router.component";

const appRoutes: Routes = [
    {path: 'register', component: AppRegisterComponent},
    {
        path: 'dashboard',
        component: AppDashboardComponent,
        canActivate: [CanActivateViaAuthGuard],
        data: {name: 'dashboard'}
    },
    {path: 'login', component: AppLoginComponent},
    {
        path: 'gallery',
        component: AppGalleryComponent,
        canActivate: [CanActivateViaAuthGuard],
        data: {name: 'gallery.index'}
    },
    {
        path: 'admin',
        component: AppAdminRouterComponent,
        canActivate: [CanActivateViaAuthGuard],
        data: {name: 'admin.dashboard'},
        children: [
            {path: '', redirectTo: '/admin/(adminoutlet:dashboard)', component: null, pathMatch: 'full'},
            {
                path: 'dashboard',
                component: AppAdminDashboardComponent,
                outlet: 'adminoutlet',
                pathMatch: 'full',
                canActivate: [CanActivateViaAuthGuard],
                data: {name: 'admin.dashboard'}
            },
            {
                path: 'gallery',
                component: AppGalleryListComponent,
                outlet: 'adminoutlet',
                pathMatch: 'full',
                canActivate: [CanActivateViaAuthGuard],
                data: {name: 'gallery.edit'}
            },
            {
                path: 'gallery-add',
                component: AppUploadfilesComponent,
                outlet: 'adminoutlet',
                pathMatch: 'full',
                canActivate: [CanActivateViaAuthGuard],
                data: {name: 'gallery.store'}
            },
            {
                path: 'gallery-edit/:id',
                component: AppUploadfilesComponent,
                outlet: 'adminoutlet',
                pathMatch: 'full',
                canActivate: [CanActivateViaAuthGuard],
                data: {name: 'gallery.edit'}
            },


        ]
    },


    {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
    },
    {path: '**', component: AppPagenotfoundComponent}
];

@NgModule({
    declarations: [

        AppNavbarComponent,
        AppHeaderComponent,
        AppFooterComponent,
        AppGalleryComponent,
        AppShoppingcartComponent,
        AppUploadfilesComponent,
        AppGalleryListComponent,


        AppComponent,
        AppPagenotfoundComponent,
        AppRoomComponent,
        AppRegisterComponent,
        AppLoginComponent,
        AppDashboardComponent,

        AppAdminDashboardComponent,
        AppAdminRouterComponent

    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
        FileUploadModule,
        NgxDatatableModule,
        RouterModule.forRoot(
            appRoutes,
            {enableTracing: false} // <-- debugging purposes only
        ),


    ],
    providers: [
        CanActivateViaAuthGuard,
        SessionService,
        AuthService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: JWTInterceptor,
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
