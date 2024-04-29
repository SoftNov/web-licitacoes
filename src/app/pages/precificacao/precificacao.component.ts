import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { max } from 'date-fns';
import { Contabil } from 'src/app/Model/Contabil';
import { FornecedorService } from 'src/app/Services/fornecedor.service';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { NotificationService } from 'src/app/Services/notification.service';
import { PrecificacaoService } from 'src/app/Services/precificacao.service';
import { RegisterService } from 'src/app/Services/register.service';

@Component({
  selector: 'app-precificacao',
  templateUrl: './precificacao.component.html',
  styleUrls: ['./precificacao.component.scss']
})
export class PrecificacaoComponent {
  titulo: String = "Cadastro de Parâmeto Contábeis"
  formularioContabeis: FormGroup;
  user = JSON.parse(this.localStorageService.get("user"));
  isEdit: Boolean = false;
  idContabil: Number = 0;
  contabilSelecionado: Contabil = new Contabil();

  constructor(private formBuilder: FormBuilder, private notificationService: NotificationService,
    private registerService: RegisterService, private router: Router, private route: ActivatedRoute,
    private fornecedorService: FornecedorService, private localStorageService: LocalStorageService, private precificacaoService: PrecificacaoService) {

    this.formularioContabeis = this.formBuilder.group({
      descricao: [''],
      transporte: [''],
      garantiaExtra: [''],
      icms: [''],
      pis: [''],
      cofins: [''],
      ipi: [''],
      iss: [''],
      margem: [''],
    });

    this.ngValidacaoFormEdit();
  }
  ngOnInit() {
    this.ObterIdFornecedor();
  }

  ObterIdFornecedor() {

    this.idContabil = this.route.snapshot.params['idContabil'];
    if (this.idContabil == 0 || this.idContabil == undefined) {
      this.ModCadastro();
    }
    else {
      this.ModEdit(this.idContabil);
    }
  }

  ModCadastro() {
    this.ngValidacaoFormEdit();
    this.titulo = "Cadastro de Parâmeto Contábeis"
    this.isEdit = false;
  }
  ModEdit(idContabil: Number) {
    this.ngValidacaoFormEdit();
    this.titulo = "Editar Contábil"
    this.isEdit = true;
    this.ngGetContabilPorId(idContabil);
  }

  ngValidacaoFormEdit() {

    this.formularioContabeis = this.formBuilder.group({
      descricao: ['', [Validators.required, Validators.max(100)]],
      transporte: ['', [Validators.required]],
      garantiaExtra: ['', [Validators.required]],
      icms: ['', [Validators.required]],
      pis: ['', [Validators.required]],
      cofins: ['', [Validators.required]],
      ipi: ['', [Validators.required]],
      iss: ['', [Validators.required]],
      margem: ['', [Validators.required]],
    });


    this.formularioContabeis.setValue({
      descricao: '',
      transporte: '0',
      garantiaExtra: '0',
      icms: '0',
      pis: '0',
      cofins: '0',
      ipi: '0',
      iss: '0',
      margem: '0',
    })
  }


  SetForm(contabil: Contabil) {
    this.formularioContabeis.setValue({
      descricao: contabil.descricao,
      transporte: contabil.transporte,
      garantiaExtra: contabil.garantiaExtra,
      icms: contabil.icms,
      pis: contabil.pis,
      cofins: contabil.cofins,
      ipi: contabil.ipi,
      iss: contabil.iss,
      margem: contabil.margem
    })
  }

  ObterValoresCadastro() {
    debugger
    const contabil: Contabil = this.contabilSelecionado;
    contabil.idUsuario = this.user.usuario.id
    contabil.descricao = this.formularioContabeis.value.descricao;
    contabil.transporte = this.formularioContabeis.value.transporte;
    contabil.garantiaExtra = this.formularioContabeis.value.garantiaExtra;
    contabil.icms = this.formularioContabeis.value.icms;
    contabil.pis = this.formularioContabeis.value.pis;
    contabil.cofins = this.formularioContabeis.value.cofins;
    contabil.ipi = this.formularioContabeis.value.ipi;
    contabil.iss = this.formularioContabeis.value.iss;
    contabil.margem = this.formularioContabeis.value.margem;
    return contabil;
  }

  ngGetContabilPorId(idContabil: Number) {
    debugger
    this.contabilSelecionado = new Contabil();
    this.precificacaoService.getBuscarContabilId(this.user.usuario.id, idContabil).then((resultado: { success: any; data: any; message: any }) => {
      if (resultado.success) {
        this.contabilSelecionado = resultado.data;
        this.SetForm(this.contabilSelecionado);
      }
      else {
        this.notificationService.ngAlertErro('Erro!', resultado.message[0]);
      }
    },
      (erro: { status: number; }) => {
        this.notificationService.ngAlertErro("Erro!", "Erro ao realizar busca por parametros contabeis.");
      });
  }


  ngCadastroEdicao() {
    if (this.isEdit) {
      this.ngEdit();
    }
    else {
      this.ngRegister();
    }
  }

  ngRegister() {
    const contabil: Contabil = this.ObterValoresCadastro();
    this.precificacaoService.postCadastro(contabil).subscribe(
      (resultado: { success: any; data: any; message: any }) => {
        console.log(resultado)
        if (resultado.success) {
          this.notificationService.ngAlertSucesso("Sucesso!", resultado.message[0]);
          this.router.navigate(['/PrecificacaoGrid']);
        }
        else {
          this.notificationService.ngAlertErro("Erro!", resultado.message[0]);
        }
      },
      (erro: { status: number; }) => {
        if (erro.status > 400) {
          console.log(erro);
        }
        this.notificationService.ngAlertErro("Erro!", "Erro ao realizar requisição de cadastro de parametros contabil.");
      }
    );
  }

  ngEdit() {
    debugger
    const contabil: Contabil = this.ObterValoresCadastro();
    this.precificacaoService.postAtualizar(contabil).subscribe(
      (resultado: { success: any; data: any; message: any }) => {
        console.log(resultado)
        if (resultado.success) {
          this.notificationService.ngAlertSucesso("Sucesso!", resultado.message[0]);
          this.router.navigate(['/PrecificacaoGrid']);
        }
        else {
          this.notificationService.ngAlertErro("Erro!", resultado.message[0]);
        }
      },
      (erro: { status: number; }) => {
        if (erro.status > 400) {
          console.log(erro);
        }
        this.notificationService.ngAlertErro("Erro!", "Erro ao realizar requisição de edição de contabil.");
      }
    );
  }
}
