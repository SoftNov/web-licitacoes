import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layouts/layout/layout.component';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { usuarioNaoAutenticadoGuard } from './Services/usuario-nao-autenticado.guard';
import { usuarioAutenticadoGuard } from './Services/usuario-autenticado.guard';

const routes: Routes = [
  {
    path: "", canActivate: [usuarioNaoAutenticadoGuard],
    loadChildren:  () => import('src/app/layouts/auth-layout/auth-layout.module').then(m => m.AuthLayoutModule)
  },
  {
    path: "",
    component: LayoutComponent,  canActivate: [usuarioAutenticadoGuard],
   loadChildren:  () => import('src/app/layouts/layout/layout.module').then(m => m.LayoutModule)
  }

];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
      useHash: true
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
