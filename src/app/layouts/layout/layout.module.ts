import { NgModule } from '@angular/core';
import { CommonModule, DatePipe, NgFor, NgIf } from '@angular/common';
import { LayoutRoutes } from './lauout-routing';
import { RouterModule } from '@angular/router';
import { HomeComponent } from 'src/app/pages/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';
import { NgxMaskModule } from 'ngx-mask';
import { ResetPasswordComponent } from 'src/app/pages/reset-password/reset-password.component';
import { LicitacaoComponent } from 'src/app/pages/licitacao/licitacao.component';
import { MeusNegociosComponent } from 'src/app/pages/meus-negocios/meus-negocios.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FiltroComponent } from 'src/app/pages/Filter/filtro.component';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTabsModule } from '@angular/material/tabs';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [
    HomeComponent,
    ResetPasswordComponent,
    LicitacaoComponent,
    MeusNegociosComponent,
    FiltroComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(LayoutRoutes),
    FormsModule,
    NgxMaskModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatSidenavModule,
    MatButtonModule,
    MatMenuModule, MatToolbarModule, MatIconModule,  MatListModule, MatExpansionModule,
    MatTooltipModule, MatCardModule, NgxMaskModule.forChild(), MatButtonModule,
    MatFormFieldModule, MatChipsModule, FormsModule, ReactiveFormsModule, NgFor, MatIconModule,
    NgIf, MatProgressSpinnerModule, MatTableModule, MatSortModule, MatPaginatorModule, DragDropModule,
    DatePipe, MatInputModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule, MatCheckboxModule, MatTabsModule
  ],
  exports: [
    RouterModule
  ] 

})
export class LayoutModule { }
