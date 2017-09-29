import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AppComponent} from './app.component';
import {AppRoomComponent} from './Components/Room/app.room.component';
import {AppPagenotfoundComponent} from './Components/PageNotFound/app.pagenotfound.component';
import {AppRegisterComponent} from './Components/Register/app.register.component';
import {AppDashboardComponent} from './Components/Dashboard/app.dashboard.component';
import {AppLoginComponent} from './Components/Login/app.login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {JWTInterceptor} from './Interceptors/JWTInterceptor';
import {CanActivateViaAuthGuard} from './Service/AuthService/Guards/CanActivateViaAuthGuard';
import {AuthService} from './Service/AuthService/AuthService';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

const appRoutes: Routes = [
    {path: 'register', component: AppRegisterComponent},
    {path: 'dashboard', component: AppDashboardComponent, canActivate: [CanActivateViaAuthGuard]},
    {path: 'login', component: AppLoginComponent},

    {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
    },
    {path: '**', component: AppPagenotfoundComponent}
];

@NgModule({
    declarations: [
        AppComponent,
        AppPagenotfoundComponent,
        AppRoomComponent,
        AppRegisterComponent,
        AppLoginComponent,
        AppDashboardComponent

    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
        RouterModule.forRoot(
            appRoutes,
            {enableTracing: false} // <-- debugging purposes only
        ),


    ],
    providers: [
        CanActivateViaAuthGuard,
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
