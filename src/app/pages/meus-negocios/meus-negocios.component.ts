import { CdkDragDrop, CdkDragEnter, CdkDragExit, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Route, Router } from '@angular/router';
import { de } from 'date-fns/locale';
import { Subscription } from 'rxjs';
import { Contrato } from 'src/app/Model/Contrato';
import { MeuNegocio } from 'src/app/Model/MeuNegocio';
import { MeusContratos } from 'src/app/Model/MeusContratos';
import { MovimentoMeusContratos } from 'src/app/Model/MovimentoMeusContratos';
import { Negocio } from 'src/app/Model/Negocio';
import { FiltroService } from 'src/app/Services/filtro.service';
import { LicitacaoService } from 'src/app/Services/licitacao.service';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { LoginService } from 'src/app/Services/login.service';
import { MeusNegociosService } from 'src/app/Services/meus-negocios.service';
import { NotificationService } from 'src/app/Services/notification.service';
import { ModalViewContratoComponent } from '../modal-view-contrato/modal-view-contrato.component';

@Component({
  selector: 'app-meus-negocios',
  templateUrl: './meus-negocios.component.html',
  styleUrls: ['./meus-negocios.component.scss']
})
export class MeusNegociosComponent {
  user = JSON.parse(this.localStorageService.get("user"));
  Contratos: Contrato[] = [];
  step = 0;

  NovosContratos: Contrato[] = [];;
  ContratosEmBuscaFornecedor: Contrato[] = [];
  ContratosEmPrecificacao: Contrato[] = [];
  ContratosEmDisputa: Contrato[] = [];
  subscription: Subscription | undefined;
  allowDropOnFirstHalf: boolean = false;
  
  constructor(private formBuilder: FormBuilder, private notificationService: NotificationService,
    private service: LicitacaoService, private router: Router, private loginService: LoginService
    , private localStorageService: LocalStorageService, public dialog: MatDialog, private httpClient: HttpClient,
    private filtroService: FiltroService, private meusNegociosService: MeusNegociosService) {

    this.getMeusContratos();
  }


  setStep(index: any) {
    this.step = index;
  }

  getMeusContratos() {
    this.meusNegociosService.getMeusContratos(this.user.usuario.id).then((resultado: { success: any; data: any; message: any }) => {
      debugger
      if (resultado.success) {
        this.Contratos = resultado.data;
        this.ngFilterStatusMeuNegocios(resultado.data)
      }
      else {
        this.notificationService.ngAlertErro('Erro!', resultado.message[0]);
      }
    },
      (erro: { status: number; }) => {
        this.notificationService.ngAlertErro("Erro!", "Erro ao consultar meus contratos salvos.");
      });
  }

  ngFilterStatusMeuNegocios(data: MeusContratos) {
    this.NovosContratos = data.novosContratos;
    this.ContratosEmBuscaFornecedor = data.contratosEmBuscaFornecedor;
    this.ContratosEmPrecificacao = data.contratosEmPrecificacao;
    this.ContratosEmDisputa = data.contratosEmDisputa;
  }


  ngDeleteContrato(idContrato: any) {
    const meuNegocio = new MeuNegocio();
    const negocio = new Negocio();
    negocio.idContrato = idContrato;
    meuNegocio.negocio = negocio;
    meuNegocio.idUsuario = this.user.usuario.id


    this.meusNegociosService.DeleteContrato(meuNegocio).subscribe(
      (resultado: { success: any; data: any; message: any }) => {
        this.getMeusContratos();
        this.notificationService.ngAlertSucesso("Sucesso!", "Contrato excluido com sucesso dos meus negócios!");
      },
      (erro: { status: number; }) => {
        this.notificationService.ngAlertErro("Erro!", "Erro ao deletar contrato aos meus negocios");
      }
    );
  }

  ngRedirecionamento(url: any) {
    window.open(url)
  }

  drop(event: any, idPainel: any) {
    this.ngAtualizaStatusContrato(event.previousContainer.data, event.previousIndex, idPainel)
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }

  }



  ngAtualizaStatusContrato(list: Contrato[], index: any, idPainel: any) {
    if (list.length > 0 && list.length >= index) {
      const movimento: MovimentoMeusContratos = new MovimentoMeusContratos();
      movimento.idContrato = list[index].idContrato;
      movimento.idUsuario = this.user.usuario.id;
      movimento.idPainel = idPainel
      this.meusNegociosService.postUpdateMeusContratos(movimento).subscribe(

        (resultado: { success: any; data: any; message: any }) => {
          if (resultado.success) {
            this.notificationService.ngAlertSucesso("Sucesso!", resultado.message[0]);
          }
          else {
            this.notificationService.ngAlertErro("Erro!", resultado.message[0]);
          }
          return resultado.success;
        },
        (erro: { status: number; }) => {
          if (erro.status > 400) {
            console.log(erro);
          }
          this.notificationService.ngAlertErro("Erro!", "Erro ao mover card!");
        }
      );
    }
  }


  onDropListEntered(event: CdkDragEnter<any, any>) {
    this.subscription = event.item.moved.subscribe((e) => {
    });
  }

  onDragEntered(event: CdkDragEnter<any>) {
    if (this.subscription) {
      this.subscription.unsubscribe();

    }
    this.subscription = event.item.moved.subscribe((e) => {
      const dropTargetHeight =
        event.container.element.nativeElement.offsetHeight;
      const pointerPositionY =
        e.pointerPosition.y -
        event.container.element.nativeElement.getBoundingClientRect().top;
      this.allowDropOnFirstHalf = pointerPositionY <= dropTargetHeight / 2;
      console.log(
        dropTargetHeight,
        pointerPositionY,
        this.allowDropOnFirstHalf,
        e
      );
    });
  }

  onDropListExited(event: CdkDragExit) {

    console.error('drag list exited testing');
  }

  onDragExited(event: CdkDragExit) {

    console.error('drag exited testing');
  }

  onMoved(event: any) {

    console.error('on moved log');
  }

  ngTesteOnChande() {
    alert("TESTE")
  }

  openDialog(contrato: Contrato) {
    const dialogRef = this.dialog.open(ModalViewContratoComponent, {
      width: '100%',
      height: '70%',
      data: { contrato},
    }

    );

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);

    });
  }
}
