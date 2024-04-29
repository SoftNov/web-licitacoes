import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Senha } from 'src/app/Model/Senha';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { NotificationService } from 'src/app/Services/notification.service';
import { RegisterService } from 'src/app/Services/register.service';
import { UsuarioService } from 'src/app/Services/usuario.service';

@Component({
  selector: 'app-nova-senha',
  templateUrl: './nova-senha.component.html',
  styleUrls: ['./nova-senha.component.scss']
})
export class NovaSenhaComponent {
  user = JSON.parse(this.localStorageService.get("user"));

  formularioNovaSenha: FormGroup;
  senhaAtual: boolean = false;
  iconSenhaAtual: String = "visibility_off";
  typeSenhaAtual: String = "password"


  senha: boolean = false;
  iconSenha: String = "visibility_off";
  typeSenha: String = "password"

  senhaConfirmacao: boolean = false;
  iconSenhaConfirmacao: String = "visibility_off";
  typeSenhaConfirmacao: String = "password"

  constructor(private formBuilder: FormBuilder, private notificationService: NotificationService,
    private registerService: RegisterService, private router: Router,
     private usuarioService: UsuarioService, private localStorageService: LocalStorageService) {

    this.formularioNovaSenha = this.formBuilder.group({
      senhaAtual: [''],
      novaSenha: [''],
      confirmacaoNovaSenha: [''],
    });
   }


   ngOnInit() {
    this.ngValidacaoForm();
  }
  SetValue(){
    this.formularioNovaSenha.setValue({senhaAtual: "", 
      novaSenha: "",
      confirmacaoNovaSenha: ""
    })
  }
   ngValidacaoForm(){
    this.formularioNovaSenha = this.formBuilder.group({
      senhaAtual: ['', [Validators.required, Validators.minLength(6)]],
      novaSenha: ['', [Validators.required, Validators.minLength(6)]],
      confirmacaoNovaSenha: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngVisualizarSenhaAtual(){
    debugger
    if(this.senhaAtual){
      this.iconSenhaAtual = "visibility_off"
      this.senhaAtual = false;
      this.typeSenhaAtual = "password"
    }
    else{
      this.iconSenhaAtual = "visibility"
      this.senhaAtual = true;
      this.typeSenhaAtual = "text"
    }
  }

  ngVisualizarSenha(){
    debugger
    if(this.senha){
      this.iconSenha = "visibility_off"
      this.senha = false;
      this.typeSenha = "password"
    }
    else{
      this.iconSenha = "visibility"
      this.senha = true;
      this.typeSenha = "text"
    }
  }

  ngVisualizarSenhaConfirmacao(){
    debugger
    if(this.senhaConfirmacao){
      this.iconSenhaConfirmacao = "visibility_off"
      this.senhaConfirmacao = false;
      this.typeSenhaConfirmacao = "password"
    }
    else{
      this.iconSenhaConfirmacao = "visibility"
      this.senhaConfirmacao = true;
      this.typeSenhaConfirmacao = "text"
    }
  }

  ngAtualizar(){
    //usuarioService
  }

  ngNovaSenha(){
    const novaSenha: Senha = new Senha();
    novaSenha.IdUsuario = this.user.usuario.id

    novaSenha.senha = this.formularioNovaSenha.value.senhaAtual;
    novaSenha.novaSenha = this.formularioNovaSenha.value.novaSenha;
    novaSenha.novaSenhaConfirmacao = this.formularioNovaSenha.value.confirmacaoNovaSenha;


    this.usuarioService.putAtualizarSenha(novaSenha).subscribe(
      (resultado: { success: any; data: any; message: any}) => {
        console.log(resultado)
        if(resultado.success){
          this.notificationService.ngAlertSucesso('Sucesso!', resultado.message[0]);
          this.SetValue();
        }
        else{
           this.notificationService.ngAlertErro("Erro!", resultado.message[0]);
        }
      },
      (erro: { status: number; }) => {
        if(erro.status > 400) {
          console.log(erro);
        }
        this.notificationService.ngAlertErro("Erro!", "Erro ao realizar requisição.");
      }
    );
  }
}
