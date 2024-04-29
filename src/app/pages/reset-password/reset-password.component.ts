import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from 'src/app/Model/Login';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { LoginService } from 'src/app/Services/login.service';
import { NotificationService } from 'src/app/Services/notification.service';
import { RegisterService } from 'src/app/Services/register.service';
import { UsuarioService } from 'src/app/Services/usuario.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {

  formularioNewPassword: FormGroup;

  constructor(private formBuilder: FormBuilder, private notificationService: NotificationService,
    private registerService: RegisterService, private router: Router, private loginService: LoginService
    , private localStorageService: LocalStorageService) {
      this.formularioNewPassword = this.formBuilder.group({
        novaSenha: [''],
        ConfNovaSenha: [''],
      });
    }

    ngOnInit() {
      this.ngValidacaoForm();
    }
  
    ngValidacaoForm(){
      this.formularioNewPassword = this.formBuilder.group({
        novaSenha: ['', [Validators.required, Validators.minLength(6)]],
        ConfNovaSenha: ['',  [Validators.required, Validators.minLength(6)]],
      });
    }

    ngCreatePassword(){
      const senha = this.formularioNewPassword.value.novaSenha;
      const confNovaSenha = this.formularioNewPassword.value.ConfNovaSenha;

      if(senha == confNovaSenha){
        const user =  JSON.parse(this.localStorageService.get("user"));
        const login = new  Login();
         login.NomeUsr = user.usuario.login.nomeUsr;
         login.Id = user.usuario.login.id;
         login.Senha = senha;

        this.loginService.putLogin(login).subscribe(
          (resultado: { success: any; data: any; message: any}) => {
            console.log(resultado)
            if(resultado.success){
              user.usuario.login.resetPaswoerd = null;
              this.localStorageService.remove("user")
              this.localStorageService.set("user", user);
              this.notificationService.ngAlertSucesso('Sucesso!', resultado.message[0]);
              this.router.navigate(['/home']);
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

      }else{
        this.notificationService.ngAlertErro("Erro!", "As senhas não são iguais. Corrija, e Tente novamente.");
      }


    }


}
