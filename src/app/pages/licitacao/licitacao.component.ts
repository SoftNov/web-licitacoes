import { Component, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatChipInputEvent } from '@angular/material/chips';
import { NotificationService } from 'src/app/Services/notification.service';
import { LoginService } from 'src/app/Services/login.service';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { FiltroLicitacao } from 'src/app/Model/FiltroLicitacao';
import { LicitacaoService } from 'src/app/Services/licitacao.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FiltroComponent } from '../Filter/filtro.component';
import { FiltroService } from 'src/app/Services/filtro.service';
import { Negocio } from 'src/app/Model/Negocio';
import { MeuNegocio } from 'src/app/Model/MeuNegocio';
import { MeusNegociosService } from 'src/app/Services/meus-negocios.service';
import { ModalViewContratoComponent } from '../modal-view-contrato/modal-view-contrato.component';

@Component({
  selector: 'app-licitacao',
  templateUrl: './licitacao.component.html',
  styleUrls: ['./licitacao.component.scss']
}) 
export class LicitacaoComponent implements AfterViewInit {
  showFiller = false;
  isPaginatorItem = false;
  step = 0;
  contarto: number = 0;
  list: any;
  listItens: any[] = [];
  listIdLicitacao = [0];
  keywords = [''];
  formControl = new FormControl(['angular']);
  announcer = inject(LiveAnnouncer);
  ListItensSelecionado: Array<any>;
  ListMeusNegocios: Negocio[] = [];
  user = JSON.parse(this.localStorageService.get("user"));

  displayedColumns: string[] = ['licitacao'];
  dataSource: any;
  @ViewChild('paginator') paginator: MatPaginator | undefined;


  displayedColumnsItens: string[] = ['Numero', 'Descricao', 'Quantidade', 'ValorUnitArio', 'ValortotalEstimado', 'Detalhar'];
  dataSourceItens: any;
  @ViewChild('paginatorItens') paginatorItens: MatPaginator | undefined;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngAfterViewInitItens() {
    this.dataSourceItens.paginator = this.paginatorItens;
  }
  constructor(private formBuilder: FormBuilder, private notificationService: NotificationService,
    private service: LicitacaoService, private router: Router, private loginService: LoginService
    , private localStorageService: LocalStorageService, public dialog: MatDialog,
    private filtroService: FiltroService, private meusNegociosService: MeusNegociosService) {
    this.ngDefinirFiltros()
    this.ListItensSelecionado = [];
  }

  ngOnInit() {
    this.ngPesquisar();
    this.ObterDadosFiltros();
    this.removeKeyword('')
  }

  

  ObterDadosFiltros() {
    this.filtroService.getFiltros().then((resultado: { success: any; data: any; message: any }) => {
      console.log(resultado)

      this.localStorageService.set("dadosFiltros", resultado.data)
    },
      (erro: { status: number; }) => {
        this.notificationService.ngAlertErro("Erro!", "Erro ao obter dados de filtros");
      });
  }

  removeKeyword(keyword: string) {
    const index = this.keywords.indexOf(keyword);
    if (index >= 0) {
      this.keywords.splice(index, 1);
      this.announcer.announce(`removed ${keyword}`);
      this.ngPesquisar();
    }
  }

  add(event: MatChipInputEvent): void {
    debugger
    const value = (event.value || '').trim();
    if (value) {
      this.keywords.push(value);
      this.ngPesquisar();
    }
    // Clear the input value
    event.chipInput!.clear();
  }

  removeKeyId(id: number) {
    const index = this.listIdLicitacao.indexOf(id);
    if (index >= 0) {
      this.listIdLicitacao.splice(index, 1);
      this.announcer.announce(`removed ${id}`);
    }
  }

  addId(id: number): void {
    this.listIdLicitacao.push(id);
  }

  ngDefinirFiltros() {
    let filtro: FiltroLicitacao = new FiltroLicitacao();
    filtro = JSON.parse(this.localStorageService.get("FiltrosSelecionados"));
    if (filtro == null || filtro == undefined) {
      filtro = new FiltroLicitacao();
    }
    debugger
    filtro.listDesProduto = ['']
    filtro.listDesProduto = this.keywords;

    if (filtro.DatFim == undefined || filtro.DatFim == "") {
      filtro.DatFim = this.date_TO_String(new Date());
    }

    filtro.listEstado = [];
    filtro.listMunicipio = [];
    this.localStorageService.set("FiltrosSelecionados", filtro);
  }

  date_TO_String(date_Object: Date) {
    // get the year, month, date, hours, and minutes seprately and append to the string.
    var date_String = this.validaNumber(date_Object.getFullYear().toString()) +
      "-" +
      this.validaNumber((date_Object.getMonth() + 1).toString()) +
      "-" + this.validaNumber((date_Object.getDay()).toString()) + "T03:00:00.000Z"

    return date_String;
  }

  validaNumber(digito: String) {
    if (digito.length == 1) {
      return "0" + digito
    }
    return digito
  }



  ngPesquisar() {
    let filtro: FiltroLicitacao = new FiltroLicitacao();
    filtro = JSON.parse(this.localStorageService.get("FiltrosSelecionados"));
    filtro.listDesProduto = this.keywords;
    this.localStorageService.set("FiltrosSelecionados", filtro);
 

    this.service.postPesquisa(filtro).subscribe(

      (resultado: { success: any; data: any; message: any }) => {
        console.log(resultado)
        if (resultado.success) {
          this.list = resultado.data.contratos;
          this.dataSource = new MatTableDataSource<any>(this.list);
          this.ngAfterViewInit();
          this.getMeusNegocios();
        }
        else {
          this.notificationService.ngAlertErro("Erro!", resultado.message[0]);
        }
      },
      (erro: { status: number; }) => {
        if (erro.status > 400) {
          console.log(erro);
        }
        this.notificationService.ngAlertErro("Erro!", "Erro ao realizar requisição.");
      }
    );
  }

  private ValidaItenMeuNegocio(idContrato: number, idItem: any): Boolean {
    let existeContrato: Boolean = false;
    this.ListMeusNegocios.forEach(function (value) {
      if (value.idContrato == idContrato) {

        if (value.listItens.indexOf(idItem) != -1) {
          const index = value.listItens.indexOf(idItem);
          if (index >= 0) {
            existeContrato = true;
          }
        }
      }
    });

    return existeContrato;
  }

  ngItens(idContrato: number) {
    const index = this.listIdLicitacao.indexOf(idContrato);
    if (index <= 0) {

      this.nextStep();
      this.prevStep();

      this.listIdLicitacao = [0]
      this.addId(idContrato);
      this.contarto = idContrato;

      this.service.getItens(idContrato).then((resultado: { success: any; data: any; message: any }) => {
        if (resultado.success) {
          this.listItens = resultado.data;

          this.listItens.forEach((value) => {
            value.checked = this.ValidaItenMeuNegocio(idContrato, value.id);
          })
          this.dataSourceItens = new MatTableDataSource<any>(this.listItens);
          this.ngAfterViewInitItens();
          this.dataSourceItens.paginator = this.paginatorItens;
        }
        else {
          this.notificationService.ngAlertErro('Erro!', resultado.message[0]);
        }
      },
        (erro: { status: number; }) => {
          this.notificationService.ngAlertErro("Erro!", "Erro ao realizar recuperação de senha.");
        });
    }
    else {
      this.removeKeyId(idContrato);
    }

  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  ngRedirecionamento(url: any) {
    window.open(url)
    console.log(url);
  }

  ngSetItemMeusNegocios(idContrato: number, idItem: number) {
    const negocio = new Negocio();
    negocio.idContrato = idContrato;
    let meusNegocios: Boolean = true;
    negocio.listItens.push(idItem);
    if (this.ListMeusNegocios.length == 0) {
      this.ListMeusNegocios.push(negocio);
      meusNegocios = true;
    }
    else {
      let existeContrato: Boolean = false;

      this.ListMeusNegocios.forEach(function (value) {
        if (value.idContrato == idContrato) {
          existeContrato = true;
          if (value.listItens.indexOf(idItem) != -1) {
            const index = value.listItens.indexOf(idItem);
            if (index >= 0) {
              value.listItens.splice(index, 1);
              meusNegocios = false;
            }
          }
          else {
            value.listItens.push(idItem)
            meusNegocios = true;
          }
        }
      });

      if (!existeContrato) {
        let meusNegocios: Boolean = false;
        this.ListMeusNegocios.push(negocio);
      }
    }


    const meuNegocio = new MeuNegocio();
    meuNegocio.negocio = negocio;
    meuNegocio.idUsuario = this.user.usuario.id
    debugger


    if (meusNegocios) {

      this.meusNegociosService.postSalvar(meuNegocio).subscribe(

        (resultado: { success: any; data: any; message: any }) => {
          this.notificationService.ngAlertSucesso("Sucesso!", "item inserido com sucesso nos meus negócios!");
        },
        (erro: { status: number; }) => {
          this.notificationService.ngAlertErro("Erro!", "Erro ao salvar item aos meus negocios");
        }
      );
    }
    else {
      this.meusNegociosService.Delete(meuNegocio).subscribe(
        (resultado: { success: any; data: any; message: any }) => {
          this.notificationService.ngAlertSucesso("Sucesso!", "item excluido com sucesso dos meus negócios!");
        },
        (erro: { status: number; }) => {
          this.notificationService.ngAlertErro("Erro!", "Erro ao deletar item aos meus negocios");
        }
      );
    }
  }

  getMeusNegocios(){
    this.meusNegociosService.getMeusNegocios(this.user.usuario.id).then((resultado: { success: any; data: any; message: any }) => {
      debugger
      if (resultado.success) {
        this.ListMeusNegocios = resultado.data;
      }
      else {
        this.notificationService.ngAlertErro('Erro!', resultado.message[0]);
      }
    },
      (erro: { status: number; }) => {
        this.notificationService.ngAlertErro("Erro!", "Erro ao realizar recuperação de senha.");
      });
  }
}
