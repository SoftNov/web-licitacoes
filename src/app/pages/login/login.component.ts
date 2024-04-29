import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Login } from 'src/app/Model/Login';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { LoginService } from 'src/app/Services/login.service';
import { NotificationService } from 'src/app/Services/notification.service';
import { NgxUiLoaderService } from "ngx-ui-loader"; 
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  user: Login = new  Login();
  formularioLogin: FormGroup;
  //regras de negócio do component 
  router: Router;

  senha: boolean = false;
  iconSenha: String = "visibility_off";
  type: String = "password"

  constructor(private formBuilder: FormBuilder, private loginService: LoginService, private Router: Router, private LocalStorageService: LocalStorageService,
    private notificationService: NotificationService) {
    this.router = Router;


    this.formularioLogin = this.formBuilder.group({
      NomeUsr: [''],
      Senha: [''],
    });
  }

  ngOnInit() {
    this.user = new Login();
    this.LocalStorageService.remove("user")
    this.ngValidacaoForm();
  }

  ngValidacaoForm(){
    this.formularioLogin = this.formBuilder.group({
      NomeUsr: ['', [Validators.required]],
      Senha: ['',  [Validators.required, , Validators.minLength(6)]],
    });
  }

  ngLogin(){

    this.user.NomeUsr = this.formularioLogin.value.NomeUsr;
    this.user.Senha = this.formularioLogin.value.Senha;

    this.loginService.postLogin(this.user).subscribe(
      (resultado: { success: any; data: any; message: any}) => {
        console.log(resultado)
        if(resultado.success){
          console.log("Usuário autenticado")
          this.LocalStorageService.set('user', resultado.data);
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
  }

  ngVisualizarSenha(){
    debugger
    if(this.senha){
      this.iconSenha = "visibility_off"
      this.senha = false;
      this.type = "password"
    }
    else{
      this.iconSenha = "visibility"
      this.senha = true;
      this.type = "text"
    }
  }
}
