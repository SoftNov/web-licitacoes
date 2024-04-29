import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { GenericService } from './generic.service';
import { Router } from '@angular/router';
import { Contabil } from '../Model/Contabil';

const resorce = "api/Contabil/Pesquisar/";
const resorceId = "api/Contabil/Pesquisar/id/";
const resorceInsert = "api/Contabil/Cadastrar";
const resorceUpdate = "api/Contabil/Atualizar";
const resorceDelete = 'api/Contabil/Delete/'

@Injectable({
  providedIn: 'root'
})
export class PrecificacaoService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=UTF-8',
    }),
  };



  constructor(private genericService: GenericService
    , private router: Router, private localStorageService: LocalStorageService) { }


  getContabil(idUsuario: Number): any {
    const url = `${resorce}${idUsuario}`
    return this.genericService.get(url, null);
  }

  getBuscarContabilId(idUsuario: Number, idContabil: Number): any {
    const url = `${resorceId}${idUsuario}/${idContabil}`
    return this.genericService.get(url, null);
  }

  postCadastro(contabil: Contabil): any {
    debugger
    return this.genericService.post(contabil, resorceInsert, null);
  }

  postAtualizar(contabil: Contabil): any {
    return this.genericService.post(contabil, resorceUpdate, null);
  }

  DeleteContabil(idUsuario: Number, idContabil: Number): any {
    const url = `${resorceDelete}${idUsuario}/${idContabil}`
    return this.genericService.delete( url, this.httpOptions );
  }
}
