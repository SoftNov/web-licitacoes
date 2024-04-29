import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AtivacaoContaComponent } from 'src/app/pages/ativacao-conta/ativacao-conta.component';
import { ErroComponent } from 'src/app/pages/erro/erro.component';
import { LoginComponent } from 'src/app/pages/login/login.component';
import { RegisterComponent } from 'src/app/pages/register/register.component';
import { ResetSenhaComponent } from 'src/app/pages/reset-senha/reset-senha.component';

export const AuthLayoutRoutes: Routes = [
    {
        path: '',
        children: [
          {
            path: "",
            component: LoginComponent
          },
          {
            path: "login",
            component: LoginComponent
          },
          {
            path: "register",
            component: RegisterComponent
          },
          {
            path: "Aprovar/Cadastro/:idUsuario",
            component: AtivacaoContaComponent
          },
          {
            path: "Reset/Senha",
            component: ResetSenhaComponent
          },
          
          {
            path: "AcessoNegado",
            component: ErroComponent
          },
        ]
      }
];

