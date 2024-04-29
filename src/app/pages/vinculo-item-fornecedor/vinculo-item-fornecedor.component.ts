import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Contrato } from 'src/app/Model/Contrato';
import { VinculoFornecedor } from 'src/app/Model/VinculoFornecedor';
import { FornecedorService } from 'src/app/Services/fornecedor.service';
import { LicitacaoService } from 'src/app/Services/licitacao.service';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { MeusNegociosService } from 'src/app/Services/meus-negocios.service';
import { NotificationService } from 'src/app/Services/notification.service';

@Component({
  selector: 'app-vinculo-item-fornecedor',
  templateUrl: './vinculo-item-fornecedor.component.html',
  styleUrls: ['./vinculo-item-fornecedor.component.scss']
})
export class VinculoItemFornecedorComponent {

  contrato: any;
  listItens: any[] = [];
  IdFornecedor: Number = 0;
  IdContrato: Number = 0;
  setFornecedor: Boolean = false;
  user = JSON.parse(this.localStorageService.get("user"));

  displayedColumnsItens: string[] = ['Itens'];
  dataSourceItens: any;
  @ViewChild('paginatorItens') paginatorItens: MatPaginator | undefined;

  constructor(private licitacaoService: LicitacaoService,
    private notificationService: NotificationService, private meusNegociosService: MeusNegociosService,
    private localStorageService: LocalStorageService, private router: Router, private route: ActivatedRoute) {
    this.IdContrato = this.route.snapshot.params['idContrato'];
    this.ngBuscarContrato(this.IdContrato );
    this.IdFornecedor = this.route.snapshot.params['idFornecedor'];
     this.ngSetFornecedor(this.IdFornecedor);
 
  }

  
  ngAfterViewInitItens() {
    this.dataSourceItens.paginator = this.paginatorItens;
  }

  ngSetFornecedor(id: any){
    if(id == undefined){
      this.setFornecedor = false;
    }
    else{
      this.setFornecedor = true;
    }
  }
  ngBuscarContrato(idContrato: Number){

    this.meusNegociosService.getMeusNegociosPorId(this.user.usuario.id, idContrato).then((resultado: { success: any; data: any; message: any }) => {
      if (resultado.success) {
        this.contrato  = resultado.data;
        this.ngItens(this.contrato.idContrato);
      }
      else {
        this.notificationService.ngAlertErro('Erro!', resultado.message[0]);
      }
    },
      (erro: { status: number; }) => {
        this.notificationService.ngAlertErro("Erro!", "Erro ao realizar busca por fornecedores.");
      });
  }


  ngItens(idContrato: number) {

    this.licitacaoService.getItensUsuario(idContrato, this.user.usuario.id).then((resultado: { success: any; data: any; message: any }) => {
      if (resultado.success) {
        debugger
        this.listItens = resultado.data;
        this.dataSourceItens = new MatTableDataSource<any>(this.listItens);
        this.ngAfterViewInitItens();
        this.dataSourceItens.paginator = this.paginatorItens;
      }
      else {
        this.notificationService.ngAlertErro('Erro!', resultado.message[0]);
      }
    },
      (erro: { status: number; }) => {
        this.notificationService.ngAlertErro("Erro!", "Erro ao realizar pusca por item da licitação.");
      });
  }

  ngVincular(IdItem: Number, idVinculo: Number, checked: Boolean){
    debugger
    if(checked){
      var vinculo = new VinculoFornecedor();
      vinculo.idContrato = this.contrato.idContrato;
      vinculo.idFornecedor = this.IdFornecedor;
      vinculo.idItem = IdItem;
      vinculo.idUsuario = this.user.usuario.id;
      
      this.meusNegociosService.postVinculoFornecedor(vinculo).subscribe(
        (resultado: { success: any; data: any; message: any }) => {
          if (resultado.success) {
            this.ngItens(this.contrato.idContrato);
            this.notificationService.ngAlertSucesso("Sucesso!", resultado.message[0]);
          }
          else {
            this.notificationService.ngAlertErro('Erro!', resultado.message[0]);
          }
        },
        (erro: { status: number; }) => {
          this.notificationService.ngAlertErro("Erro!", "Erro ao vincular fornecedor!");
        }
      );
    }
    else{
      //REMOVER VINCULO
      this.meusNegociosService.DeleteVinculoFornecedo(idVinculo).then((resultado: { success: any; data: any; message: any }) => {
        if (resultado.success) {
          this.ngItens(this.contrato.idContrato);
          this.notificationService.ngAlertSucesso('Sucesso!', resultado.message[0]);
        }
        else {
          this.notificationService.ngAlertErro('Erro!', resultado.message[0]);
        }
      },
        (erro: { status: number; }) => {
          this.notificationService.ngAlertErro("Erro!", "Erro ao deletar fornecedores.");
        });
    }
  }


  ngVoltarViewFornecedor(){
    this.router.navigate(['/Fornecedor', this.contrato.idContrato]);
  }
}
