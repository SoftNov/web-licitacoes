import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from 'src/app/pages/home/home.component';
import { LayoutComponent } from './layout.component';
import { ResetPasswordComponent } from 'src/app/pages/reset-password/reset-password.component';
import { LicitacaoComponent } from 'src/app/pages/licitacao/licitacao.component';
import { MeusNegociosComponent } from 'src/app/pages/meus-negocios/meus-negocios.component';
import { ContaComponent } from 'src/app/pages/conta/conta.component';
import { FornecedorComponent } from 'src/app/pages/fornecedor/fornecedor.component';
import { GridFornecedoresComponent } from 'src/app/pages/grid-fornecedores/grid-fornecedores.component';
import { VinculoItemFornecedorComponent } from 'src/app/pages/vinculo-item-fornecedor/vinculo-item-fornecedor.component';
import { PrecificacaoGridComponent } from 'src/app/pages/precificacao-grid/precificacao-grid.component';
import { PrecificacaoComponent } from 'src/app/pages/precificacao/precificacao.component';

export const LayoutRoutes: Routes = [
      { path: 'home',      component: HomeComponent },
      {path: 'Nova/Senha', component: ResetPasswordComponent},    
      {path: 'Pesquisa/licitacoes', component: LicitacaoComponent},
      {path: 'Negocios', component: MeusNegociosComponent},
      {path: 'Conta', component: ContaComponent},
      {path: 'Fornecedor', component: GridFornecedoresComponent},
      {path: 'Fornecedor/:idContrato', component: GridFornecedoresComponent},
      {path: 'Fornecedor/Cadastro/Novo', component: FornecedorComponent},
      { path: 'Fornecedor/Cadastro/:idFornecedor', component: FornecedorComponent },
      { path: 'Vinculo/Fornecedor/:idFornecedor/:idContrato', component: VinculoItemFornecedorComponent },
      {path: 'PrecificacaoGrid', component: PrecificacaoGridComponent},
      {path: 'Precificacao/Novo/Cadastro', component: PrecificacaoComponent},
      {path: 'Precificacao/Editar/:idContabil', component: PrecificacaoComponent},
];

