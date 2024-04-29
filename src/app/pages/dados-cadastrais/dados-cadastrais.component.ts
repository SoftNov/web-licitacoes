import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { de } from 'date-fns/locale';
import { Senha } from 'src/app/Model/Senha';
import { Usuario } from 'src/app/Model/Usuario';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { NotificationService } from 'src/app/Services/notification.service';
import { RegisterService } from 'src/app/Services/register.service';
import { UsuarioService } from 'src/app/Services/usuario.service';

@Component({
  selector: 'app-dados-cadastrais',
  templateUrl: './dados-cadastrais.component.html',
  styleUrls: ['./dados-cadastrais.component.scss'] 
})
export class DadosCadastraisComponent {
  formularioRegister: FormGroup;
  user = JSON.parse(this.localStorageService.get("user"));


  constructor(private formBuilder: FormBuilder, private notificationService: NotificationService,
    private registerService: RegisterService, private router: Router,
     private localStorageService: LocalStorageService, private usuarioService: UsuarioService) {
    this.formularioRegister = this.formBuilder.group({
      nome: [''],
      email: [''],
      telefone: [''],
      cpfCnph: [''],
    });

   
   }

   ngOnInit() {
    this.ngValidacaoForm();
    this.SetValue();
  }
  
   ngValidacaoForm(){
    this.formularioRegister = this.formBuilder.group({
      nome: ['', [Validators.required], ],
      email: ['',  [Validators.required, Validators.email]],
      telefone: ['', [Validators.required]],
      cpfCnpj: ['', [Validators.required]]
    });

    this.formularioRegister.controls['nome'].disable()
    this.formularioRegister.controls['cpfCnpj'].disable()
  }


  SetValue(){
    this.formularioRegister.setValue({nome: this.user.usuario.nome, 
      cpfCnpj: this.user.usuario.cpfCnpj,
      email: this.user.usuario.contato.email,
      telefone:this.user.usuario.contato.numTelefone
    })
  }

  ObterValoresCadastro(){
    const usuario: Usuario = new Usuario();

    usuario.contato.Email = this.formularioRegister.value.email;
    usuario.contato.NumTelefone = this.formularioRegister.value.telefone.replace("(", "").replace(")", "").replace(".", "").replace(" ", "");

    return usuario;
  }
  ngAtualizar(){
    debugger
    const usuario: Usuario = this.ObterValoresCadastro();
    usuario.contato.Id = this.user.usuario.contato.id;

    this.usuarioService.putAtualizar(usuario).subscribe(
      (resultado: { success: any; data: any; message: any}) => {
        console.log(resultado)
        if(resultado.success){
          this.notificationService.ngAlertSucesso('Sucesso!', resultado.message[0]);
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
