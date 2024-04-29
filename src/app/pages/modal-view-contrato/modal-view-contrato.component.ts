import { Component, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Contrato } from 'src/app/Model/Contrato';
import { VinculoFornecedor } from 'src/app/Model/VinculoFornecedor';
import { LicitacaoService } from 'src/app/Services/licitacao.service';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { MeusNegociosService } from 'src/app/Services/meus-negocios.service';
import { NotificationService } from 'src/app/Services/notification.service';

@Component({
  selector: 'app-modal-view-contrato',
  templateUrl: './modal-view-contrato.component.html',
  styleUrls: ['./modal-view-contrato.component.scss']
})
export class ModalViewContratoComponent {
  contrato: any; 
  listItens: any[] = [];
  IdFornecedor: any;
  setFornecedor: Boolean = false;
  user = JSON.parse(this.localStorageService.get("user"));
  
  displayedColumnsItens: string[] = ['Itens'];
  dataSourceItens: any;
  @ViewChild('paginatorItens') paginatorItens: MatPaginator | undefined;


  constructor( @Inject(MAT_DIALOG_DATA) public data: any, private licitacaoService: LicitacaoService, 
    private notificationService: NotificationService, private meusNegociosService: MeusNegociosService,
    private localStorageService: LocalStorageService) {

    this.contrato = data.contrato;
    this.IdFornecedor = data.IdFornecedor;
    this.ngSetFornecedor(this.IdFornecedor);
    this.ngItens(this.contrato.idContrato);
  }

  ngSetFornecedor(id: any){
    if(id == undefined){
      this.setFornecedor = false;
    }
    else{
      this.setFornecedor = true;
    }
    
  }

  ngAfterViewInitItens() {
    this.dataSourceItens.paginator = this.paginatorItens;
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
}
