import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { Router } from '@angular/router';
import { NotificationService } from './notification.service';
import { HttpHeaders } from '@angular/common/http';
import { GenericService } from './generic.service';
import { Usuario } from '../Model/Usuario';
import { Senha } from '../Model/Senha';


const httpOptions = {
  Headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}
const resorce = "api/Usuario/Recuperar/Senha/";
const resorceAtualizar = "api/Usuario/Atualizar";
const resorceAtualizarSenha = "api/Usuario/Criar/Nova/Senha";

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private localStorageService: LocalStorageService
    , private router: Router, private notificationService: NotificationService,
    private genericService: GenericService) { }


  hasAccess() {
    const user = JSON.parse(this.localStorageService.get("user"));

    if (user != null) {
      if (user.access_token != null) {
        return true;
      }
      else {
        this.notificationService.ngAlertInfo("Atenção!", "Realize o login para acessar essa página.");
        return false;
      }
    }
    else {
      this.notificationService.ngAlertInfo("Atenção!", "Realize o login para acessar essa página.");
      return false;
    }
  }

  login() {
    this.router.navigate(['/login']);
  }

  AcessoNegado() {
    this.router.navigate(['/AcessoNegado']);
  }


  getResetSenha(cpfCnpj: String): any {
    return this.genericService.get(`${resorce}${cpfCnpj}`, httpOptions);
  }

  putAtualizar(usuario: Usuario): any {
    return this.genericService.put(usuario, resorceAtualizar, httpOptions);
  }

  putAtualizarSenha(novaSenha: Senha): any {
    return this.genericService.put(novaSenha, resorceAtualizarSenha, httpOptions);
  }
}

