import { Component, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Fornecedor } from 'src/app/Model/Fornecedor';
import { FornecedorService } from 'src/app/Services/fornecedor.service';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { NotificationService } from 'src/app/Services/notification.service';
import { RegisterService } from 'src/app/Services/register.service';

@Component({
  selector: 'app-fornecedor',
  templateUrl: './fornecedor.component.html',
  styleUrls: ['./fornecedor.component.scss']
}) 
export class FornecedorComponent {
  titulo: String = "Cadastro de Fornecedor"
  formularioRegisterFornecedor: FormGroup;
  user = JSON.parse(this.localStorageService.get("user"));
  idFornecedor: Number = 0;
  isEdit: Boolean = false;
  fornecedorSelecionado: Fornecedor = new  Fornecedor();

  constructor(private formBuilder: FormBuilder, private notificationService: NotificationService,
    private registerService: RegisterService, private router: Router, private route: ActivatedRoute,
    private fornecedorService: FornecedorService,   private localStorageService: LocalStorageService) {
    this.formularioRegisterFornecedor = this.formBuilder.group({
      nomeEmpresa: [''],
      nomeRepresentanteComercial: [''],
      marca: [''],
      modelo: [''],
      descricao: [''],
      valor: [''],
      email: [''],
      telefone: [''],
      cnpj: [''],
    });
  }

  ngOnInit() {
    this.ObterIdFornecedor();
  }

  ModCadastro(){
    this.ngValidacaoFormCadastro();
    this.titulo = "Cadastro de Fornecedor"
    this.isEdit = false;
  }
  ModEdit(idFornecedor: Number){
    this.ngValidacaoFormEdit();
    this.titulo = "Editar Fornecedor"
    this.isEdit = true;
    this.ngGetFornecedorPorId(idFornecedor);
  }

  ObterIdFornecedor(){
    
    this.idFornecedor = this.route.snapshot.params['idFornecedor'];
    if(this.idFornecedor == 0 || this.idFornecedor == undefined){
      this.ModCadastro();
    }
    else{
      this.ModEdit(this.idFornecedor);
    }
  }


  ngValidacaoFormEdit() {
    this.formularioRegisterFornecedor = this.formBuilder.group({
      nomeEmpresa: [''],
      nomeRepresentanteComercial: [''],
      marca: [''],
      modelo: [''],
      descricao: ['', [Validators.required]],
      valor: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', [Validators.required]],
      cnpj: ['']
    });

    this.formularioRegisterFornecedor.controls['nomeEmpresa'].disable()
    this.formularioRegisterFornecedor.controls['cnpj'].disable()
    this.formularioRegisterFornecedor.controls['marca'].disable()
    this.formularioRegisterFornecedor.controls['modelo'].disable()
  }

  ngValidacaoFormCadastro() {
    this.formularioRegisterFornecedor = this.formBuilder.group({
      nomeEmpresa: ['', [Validators.required]],
      nomeRepresentanteComercial: ['', [Validators.required]],
      marca: ['', [Validators.required]],
      modelo: ['', [Validators.required]],
      descricao: ['', [Validators.required]],
      valor: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', [Validators.required]],
      cnpj: ['', [Validators.required]]

    });
  }

  ngApagarForm() {
    this.formularioRegisterFornecedor.value.nomeEmpresa = "";
    this.formularioRegisterFornecedor.value.nomeRepresentanteComercial = "";
    this.formularioRegisterFornecedor.value.marca = "";
    this.formularioRegisterFornecedor.value.modelo = "";
    this.formularioRegisterFornecedor.value.descricao = "";
    this.formularioRegisterFornecedor.value.valor = "";
    this.formularioRegisterFornecedor.value.email = "";
    this.formularioRegisterFornecedor.value.cnpj = "";
    this.formularioRegisterFornecedor.value.telefone = "";
  }

  ObterValoresCadastro(){
    debugger
    const fornecedor: Fornecedor = this.fornecedorSelecionado;
    fornecedor.idUsuario = this.user.usuario.id
    fornecedor.nomeEmpresa = this.formularioRegisterFornecedor.value.nomeEmpresa;
    fornecedor.nomeRepresentanteComercial = this.formularioRegisterFornecedor.value.nomeRepresentanteComercial;
    fornecedor.marca = this.formularioRegisterFornecedor.value.marca;
    fornecedor.modelo = this.formularioRegisterFornecedor.value.modelo;
    fornecedor.descricao = this.formularioRegisterFornecedor.value.descricao;
    if(this.formularioRegisterFornecedor.value.valor.toString().indexOf('R$') != -1){
      fornecedor.valor = this.formularioRegisterFornecedor.value.valor.replace('R$', '').replace(' ', '');
    }
    else{
      fornecedor.valor = this.formularioRegisterFornecedor.value.valor
    }
    fornecedor.email = this.formularioRegisterFornecedor.value.email;
    fornecedor.cnpj = this.formularioRegisterFornecedor.value.cnpj;
    fornecedor.telefone = this.formularioRegisterFornecedor.value.telefone;
    return fornecedor;
  }

  SetForm(fornecedor: Fornecedor) {
    debugger
    this.formularioRegisterFornecedor.setValue({
      nomeEmpresa: fornecedor.nomeEmpresa,
      telefone: fornecedor.telefone + '0',
      nomeRepresentanteComercial: fornecedor.nomeRepresentanteComercial,
      marca: fornecedor.marca,
      modelo:fornecedor.modelo,
      descricao: fornecedor.descricao,
      valor:fornecedor.valor,
      email: fornecedor.email,
      cnpj: fornecedor.cnpj
    })
  }

  ngCadastroEdicao(){
    if(this.isEdit){
      this.ngEdit();
    }
    else{
      this.ngRegister();
    }
  }

  ngEdit() {
    debugger
    const fornecedor: Fornecedor = this.ObterValoresCadastro();
    this.fornecedorService.postAtualizar(fornecedor).subscribe(
      (resultado: { success: any; data: any; message: any }) => {
        console.log(resultado)
        if (resultado.success) {
          this.notificationService.ngAlertSucesso("Sucesso!", resultado.message[0]);
          this.router.navigate(['/Fornecedor']);
        }
        else {
          this.notificationService.ngAlertErro("Erro!", resultado.message[0]);
        }
      },
      (erro: { status: number; }) => {
        if (erro.status > 400) {
          console.log(erro);
        }
        this.notificationService.ngAlertErro("Erro!", "Erro ao realizar requisição de cadastro de fornecedor.");
      }
    );
  }

  ngRegister() {
    const fornecedor: Fornecedor = this.ObterValoresCadastro();
    this.fornecedorService.postCadastro(fornecedor).subscribe(
      (resultado: { success: any; data: any; message: any }) => {
        console.log(resultado)
        if (resultado.success) {
          this.notificationService.ngAlertSucesso("Sucesso!", resultado.message[0]);
          this.router.navigate(['/Fornecedor']);
        }
        else {
          this.notificationService.ngAlertErro("Erro!", resultado.message[0]);
        }
      },
      (erro: { status: number; }) => {
        if (erro.status > 400) {
          console.log(erro);
        }
        this.notificationService.ngAlertErro("Erro!", "Erro ao realizar requisição de cadastro de fornecedor.");
      }
    );
  }


  ngGetFornecedorPorId(idFornecedor: Number) {
    this.fornecedorSelecionado = new Fornecedor();
    this.fornecedorService.getFornecedorPorId(this.user.usuario.id, idFornecedor).then((resultado: { success: any; data: any; message: any }) => {
      if (resultado.success) {
        this.fornecedorSelecionado = resultado.data;
        this.SetForm(this.fornecedorSelecionado);
      }
      else {
        this.notificationService.ngAlertErro('Erro!', resultado.message[0]);
      }
    },
      (erro: { status: number; }) => {
        this.notificationService.ngAlertErro("Erro!", "Erro ao realizar busca por fornecedores.");
      });
  }

}
