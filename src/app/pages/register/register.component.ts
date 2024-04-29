import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/Model/Usuario';
import { NotificationService } from 'src/app/Services/notification.service';
import { RegisterService } from 'src/app/Services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
 
  formularioRegister: FormGroup;


  constructor(private formBuilder: FormBuilder, private notificationService: NotificationService,
    private registerService: RegisterService, private router: Router) {
    this.formularioRegister = this.formBuilder.group({
      nome: [''],
      email: [''],
      telefone: [''],
      cpfCnph: [''],
      senha: [''],
      confirmacaoSenha: [''],
      termo: [''],
    });
   }

  ngOnInit() {
    this.ngValidacaoForm();
  }

  ngValidacaoForm(){
    this.formularioRegister = this.formBuilder.group({
      nome: ['', [Validators.required]],
      email: ['',  [Validators.required, Validators.email]],
      telefone: ['', [Validators.required]],
      cpfCnpj: ['', [Validators.required]],
      senha: ['', [Validators.required, Validators.minLength(6)], Validators.maxLength(9)],
      confirmacaoSenha: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(9)]],
      termo: ['', [Validators.required]],
    });
  }

  ObterValoresCadastro(){
    const usuario: Usuario = new Usuario();

    usuario.nome = this.formularioRegister.value.nome;
    usuario.cpfCnpj = this.formularioRegister.value.cpfCnpj.replace(".", "").replace(".", "").replace("-", "").replace("/", "");
    usuario.contato.Email = this.formularioRegister.value.email;
    usuario.contato.NumTelefone = this.formularioRegister.value.telefone.replace("(", "").replace(")", "").replace(".", "").replace(" ", "");
    usuario.login.NomeUsr = this.formularioRegister.value.email;
    usuario.login.Senha = this.formularioRegister.value.senha;

    return usuario;
  }
  ngRegister(){
    if(this.formularioRegister.value.senha == this.formularioRegister.value.confirmacaoSenha){
      const usuario: Usuario = this.ObterValoresCadastro();


      console.log(JSON.stringify(usuario))

      this.registerService.postRegister(usuario).subscribe(
        (resultado: { success: any; data: any; message: any}) => {
          console.log(resultado)
          if(resultado.success){
            this.notificationService.ngAlertSucesso('Sucesso!', resultado.message[0]);
  
            this.router.navigate(['/login']);
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
    else{
      this.notificationService.ngAlertErro("Erro!", "Senhas não conferem.");
    }
  }

  
}
