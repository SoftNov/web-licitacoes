import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthLayoutRoutes } from './auth-lauout-routing';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from 'src/app/pages/login/login.component';
import { NgxMaskModule } from 'ngx-mask';
import { MatIconModule } from '@angular/material/icon';
import { RegisterComponent } from 'src/app/pages/register/register.component';
import { AtivacaoContaComponent } from 'src/app/pages/ativacao-conta/ativacao-conta.component';
import { ResetSenhaComponent } from 'src/app/pages/reset-senha/reset-senha.component';



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    AtivacaoContaComponent,
    ResetSenhaComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(AuthLayoutRoutes),
    FormsModule,
    NgxMaskModule.forChild(),
    MatIconModule,
    ReactiveFormsModule,
  ],
})
export class AuthLayoutModule { }
