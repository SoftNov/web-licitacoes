import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { FornecedorService } from 'src/app/Services/fornecedor.service';
import { LicitacaoService } from 'src/app/Services/licitacao.service';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { MeusNegociosService } from 'src/app/Services/meus-negocios.service';
import { NotificationService } from 'src/app/Services/notification.service';
import { PrecificacaoService } from 'src/app/Services/precificacao.service';

@Component({
  selector: 'app-precificacao-grid',
  templateUrl: './precificacao-grid.component.html',
  styleUrls: ['./precificacao-grid.component.scss']
})
export class PrecificacaoGridComponent {
  selecionaContabil: Boolean = false;
  displayedColumnsItens: string[] = ['descricao', 'transporte', 'garantiaExtra', 'icms'
  , 'pis', 'cofins', 'ipi', 'iss', 'margem', 'Evento'];
  dataSource: any;
  @ViewChild('paginatorItens') paginatorItens: MatPaginator | undefined;

  listContabil: any[] = [];
  user = JSON.parse(this.localStorageService.get("user"));


  constructor( private licitacaoService: LicitacaoService, private notificationService: NotificationService, 
    private localStorageService: LocalStorageService, private route: ActivatedRoute, public dialog: MatDialog,
    private fornecedorService: FornecedorService, private router: Router,
     private meusNegociosService: MeusNegociosService, private precificacaoService: PrecificacaoService) {
      this.selecionaContabil = false;
      this.getContabil();
  }

  ngAfterViewInitItens() {
    this.dataSource.paginator = this.paginatorItens;
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getContabil() {

    this.precificacaoService.getContabil(this.user.usuario.id).then((resultado: { success: any; data: any; message: any }) => {
      if (resultado.success) {
        this.listContabil = resultado.data;
        this.dataSource = new MatTableDataSource<any>(this.listContabil);

        this.ngAfterViewInitItens();
        this.dataSource.paginator = this.paginatorItens;
      }
      else {
        this.notificationService.ngAlertErro('Erro!', resultado.message[0]);
      }
    },
      (erro: { status: number; }) => {
        this.notificationService.ngAlertErro("Erro!", "Erro ao realizar busca por fornecedores.");
      });
  }
  ngEdit(IdContabil: Number){ 
    this.router.navigate(['/Precificacao/Editar/', IdContabil]);
  }


  ngDelete(idContabil: Number){
    
    this.precificacaoService.DeleteContabil(this.user.usuario.id, idContabil).then((resultado: { success: any; data: any; message: any }) => {
      if (resultado.success) {
        this.notificationService.ngAlertSucesso('Sucesso!', resultado.message[0]);
        this.getContabil();
      }
      else {
        this.notificationService.ngAlertErro('Erro!', resultado.message[0]);
      }
    },
      (erro: { status: number; }) => {
        this.notificationService.ngAlertErro("Erro!", "Erro ao deletar contabil.");
      });
  }
}
