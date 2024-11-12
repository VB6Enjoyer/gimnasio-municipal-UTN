import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { CategoriasComponent } from './components/categorias/categorias.component';
import { AuthGuard } from './services/auth/authguard.service';
import { CursosComponent } from './components/cursos/cursos.component';
import { EjerciciosComponent } from './components/ejercicios/ejercicios.component';
import { ElementosComponent } from './components/elementos/elementos.component';
import { RutinasComponent } from './components/rutinas/rutinas.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'categorias', component: CategoriasComponent, canActivate: [AuthGuard] },
    { path: 'cursos', component: CursosComponent, canActivate: [AuthGuard] },
    { path: 'ejercicios', component: EjerciciosComponent, canActivate: [AuthGuard] },
    { path: 'elementos', component: ElementosComponent, canActivate: [AuthGuard] },
    { path: 'rutinas', component: RutinasComponent, canActivate: [AuthGuard] },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})

export class AppRoutingModule { }
