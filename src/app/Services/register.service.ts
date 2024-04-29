import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { Router } from '@angular/router';
import { Usuario } from '../Model/Usuario';
import { NotificationService } from './notification.service';

const httpOptions = {
  Headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}
const resorce = "api/Usuario/Cadastrar";
const resorceAtivacao = "api/Usuario/Ativar/";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private genericService: GenericService, private router: Router, private notificationService: NotificationService) { }


  postRegister(usuario: Usuario): any {
    return this.genericService.post(usuario, resorce, httpOptions);
 }

 getAtivarUsuario(id: number): any{
  return this.genericService.get(`${resorceAtivacao}${id}` , httpOptions).then((resultado: { success: any; data: any; message: any}) => {
    console.log(resultado)
      this.notificationService.ngAlertSucesso('Bem vindo!', "Obrigado por fazer parte da nossa família.");
    
  },
  (erro: { status: number; }) => {
    this.notificationService.ngAlertErro("Erro!", "Erro ao realizar ativação.");
  });
 }

}
