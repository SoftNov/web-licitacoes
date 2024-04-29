import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTooltipModule } from '@angular/material/tooltip';
import { LayoutComponent } from './layouts/layout/layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { ComponentModule } from './components/component.module';
import { CommonModule, NgIf } from '@angular/common';
import { LayoutModule } from './layouts/layout/layout.module';
import {MatCardModule} from '@angular/material/card';
import { NgxMaskModule } from 'ngx-mask';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErroComponent } from './pages/erro/erro.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { HTTPListener, HttpInterceptorService } from './Services/http-interceptor.service';
import {MatChipsModule} from '@angular/material/chips';
import {NgFor} from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTableModule} from '@angular/material/table';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { DatePipe} from '@angular/common';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatDialogModule} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatNativeDateModule} from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MomentDateModule } from '@angular/material-moment-adapter';
import { ContaComponent } from './pages/conta/conta.component';
import {MatTabsModule} from '@angular/material/tabs';
import { DadosCadastraisComponent } from './pages/dados-cadastrais/dados-cadastrais.component';
import { NovaSenhaComponent } from './pages/nova-senha/nova-senha.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ModalViewContratoComponent } from './pages/modal-view-contrato/modal-view-contrato.component';
import { FornecedorComponent } from './pages/fornecedor/fornecedor.component';
import { GridFornecedoresComponent } from './pages/grid-fornecedores/grid-fornecedores.component';
import { VinculoItemFornecedorComponent } from './pages/vinculo-item-fornecedor/vinculo-item-fornecedor.component';
import { PrecificacaoGridComponent } from './pages/precificacao-grid/precificacao-grid.component';
import { PrecificacaoComponent } from './pages/precificacao/precificacao.component';
const RxJS_Services = [HTTPListener, HttpInterceptorService];




@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    AuthLayoutComponent,
    ErroComponent,
    ContaComponent,
    DadosCadastraisComponent,
    NovaSenhaComponent,
    ModalViewContratoComponent,
    FornecedorComponent,
    GridFornecedoresComponent,
    VinculoItemFornecedorComponent,
    PrecificacaoGridComponent,
    PrecificacaoComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    MatDialogModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    MatSlideToggleModule,
    ComponentModule,
    LayoutModule,
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatExpansionModule,
    MatTooltipModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot({dropSpecialCharacters: false}),
    BrowserAnimationsModule,
    MatFormFieldModule,
    ToastrModule.forRoot({
      positionClass :'toast-bottom-right'
    }),
    NgxUiLoaderModule,
    MatChipsModule,
    NgFor,
    NgIf,
    MatProgressSpinnerModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    DatePipe,
    MatFormFieldModule, MatInputModule, MatSelectModule,
    MatDatepickerModule, MatNativeDateModule, MatCheckboxModule, MatTabsModule, DragDropModule, NgxMaskModule
    
  ],
  providers: [
    Location, // Adicione o Location ao array de providers
    RxJS_Services,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HTTPListener,
            multi: true
        },
        { provide: MAT_DATE_LOCALE, useValue: 'bt-br' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
