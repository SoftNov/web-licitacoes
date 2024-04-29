import { Component, Inject, Injectable, Input, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { enableDebugTools } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/Services/notification.service';
import { RegisterService } from 'src/app/Services/register.service';
import { UsuarioService } from 'src/app/Services/usuario.service';

@Component({
  selector: 'app-reset-senha',
  templateUrl: './reset-senha.component.html',
  styleUrls: ['./reset-senha.component.scss']
})
export class ResetSenhaComponent {
  @Input() NewPassword: boolean = false;

  formularioResetSenha: FormGroup;
  cpfCnpj: String = "";

  constructor(private formBuilder: FormBuilder, private notificationService: NotificationService,
    private registerService: RegisterService, private router: Router, private usuarioService: UsuarioService) {
      this.formularioResetSenha = this.formBuilder.group({
        cpfCnpj: [''],
      });
    }

    ngOnInit() {
      this.ngValidacaoForm();
    }

    ngValidacaoForm(){
      this.formularioResetSenha = this.formBuilder.group({
        cpfCnpj: ['', [Validators.required]],
      });
    }


    ngResetSenha(){
      this.cpfCnpj = this.formularioResetSenha.value.cpfCnpj.replace(".", "").replace(".", "").replace("-", "").replace("/", "");
      this.usuarioService.getResetSenha(this.cpfCnpj).then((resultado: { success: any; data: any; message: any}) => {
          if(resultado.success){
              this.notificationService.ngAlertSucesso('Sucesso!', resultado.message[0]);
              this.router.navigate(['/login']);
           }
          else{
              this.notificationService.ngAlertErro('Erro!', resultado.message[0]);
            }
        },
        (erro: { status: number; }) => {
          this.notificationService.ngAlertErro("Erro!", "Erro ao realizar recuperação de senha.");
        });
    }

}
