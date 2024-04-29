import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Contrato } from 'src/app/Model/Contrato';
import { FornecedorService } from 'src/app/Services/fornecedor.service';
import { LicitacaoService } from 'src/app/Services/licitacao.service';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { NotificationService } from 'src/app/Services/notification.service';
import { ModalViewContratoComponent } from '../modal-view-contrato/modal-view-contrato.component';
import { MatDialog } from '@angular/material/dialog';
import { MeusNegociosService } from 'src/app/Services/meus-negocios.service';

@Component({
  selector: 'app-grid-fornecedores',
  templateUrl: './grid-fornecedores.component.html',
  styleUrls: ['./grid-fornecedores.component.scss']
})
export class GridFornecedoresComponent {
  user = JSON.parse(this.localStorageService.get("user"));
  listFornecedores: any[] = [];
  idContrato: number = 0;
  selecionaFornecedor: Boolean = false;
  ContratoSelecionado: Contrato = new Contrato();

  displayedColumnsItens: string[] = ['Empresa', 'Cnpj', 'Marca', 'Modelo'
  , 'DescricaoProduto', 'Valor', 'Evento'];
  dataSource: any;
  @ViewChild('paginatorItens') paginatorItens: MatPaginator | undefined;




  constructor( private licitacaoService: LicitacaoService, private notificationService: NotificationService, 
    private localStorageService: LocalStorageService, private route: ActivatedRoute, public dialog: MatDialog,
    private fornecedorService: FornecedorService, private router: Router, private meusNegociosService: MeusNegociosService) {
      this.selecionaFornecedor = false;
      this.ngGetFornecedor();
      this.ngValidaModoSelecaoFornecedor();
  }

  ngAfterViewInitItens() {
    this.dataSource.paginator = this.paginatorItens;
  }

  ngValidaModoSelecaoFornecedor(){
    this.idContrato = this.route.snapshot.params['idContrato'];
    if(this.idContrato > 0){
      this.selecionaFornecedor = true;
      this.ngBuscarContrato(this.idContrato);
    }
    else{
      this.selecionaFornecedor = false;
    }

  }

  ngBuscarContrato(idContrato: Number){

    this.meusNegociosService.getMeusNegociosPorId(this.user.usuario.id, idContrato).then((resultado: { success: any; data: any; message: any }) => {
      if (resultado.success) {
        debugger
        this.ContratoSelecionado = resultado.data;
      }
      else {
        this.notificationService.ngAlertErro('Erro!', resultado.message[0]);
      }
    },
      (erro: { status: number; }) => {
        this.notificationService.ngAlertErro("Erro!", "Erro ao realizar busca por fornecedores.");
      });
  }

  ngGetFornecedor() {

    this.fornecedorService.getFornecedor(this.user.usuario.id).then((resultado: { success: any; data: any; message: any }) => {
      if (resultado.success) {
        this.listFornecedores = resultado.data;
        this.dataSource = new MatTableDataSource<any>(this.listFornecedores);

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

  ngEdit(IdFornecedor: Number){ 
    this.router.navigate(['/Fornecedor/Cadastro/', IdFornecedor]);
  }

  ngDelete(IdFornecedor: Number){ 
    this.fornecedorService.DeleteFornecedo(this.user.usuario.id, IdFornecedor).then((resultado: { success: any; data: any; message: any }) => {
      if (resultado.success) {
        this.notificationService.ngAlertSucesso('Sucesso!', resultado.message[0]);
        this.ngGetFornecedor();
      }
      else {
        this.notificationService.ngAlertErro('Erro!', resultado.message[0]);
      }
    },
      (erro: { status: number; }) => {
        this.notificationService.ngAlertErro("Erro!", "Erro ao deletar fornecedores.");
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngVincular(IdFornecedor: Number, checked: Boolean){
      if(checked){
        this.router.navigate(['/Vinculo/Fornecedor', IdFornecedor, this.ContratoSelecionado.idContrato]);
        // this.openDialog(this.ContratoSelecionado, IdFornecedor)
      }
      
  }


  openDialog(contrato: Contrato, IdFornecedor: Number) {
    const dialogRef = this.dialog.open(ModalViewContratoComponent, {
      width: '100%',
      height: '70%',
      data: { contrato, IdFornecedor },
    }

    );

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);

    });
  }
}
