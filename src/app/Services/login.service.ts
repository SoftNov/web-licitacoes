import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Login } from '../Model/Login';


const resorce = "Auth/login";
const resorceUpdate = "api/Login/Atualizar/Senha";

const httpOptions = {
  Headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  constructor(private genericService: GenericService, private router: Router) { }


  postLogin(login: Login): any {
     return this.genericService.post(login, resorce, httpOptions);
  }

  putLogin(login: Login): any {
    return this.genericService.post(login, resorceUpdate, httpOptions);
 }

}
