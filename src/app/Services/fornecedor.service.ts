import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { Router } from '@angular/router';
import { LocalStorageService } from './local-storage.service';
import { Fornecedor } from '../Model/Fornecedor';


const resorce = "api/Fornecedor/Pesquisar/";
const resorceConsultaPorId = "api/Fornecedor/Pesquisa/Id/";
const resorceInsert = "api/Fornecedor/Cadastrar";
const resorceUpdate = "api/Fornecedor/Atualizar";
const resorceDelete = 'api/Fornecedor/Delete/Id/'

@Injectable({
  providedIn: 'root'
})
export class FornecedorService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=UTF-8',
    }),
  };


  constructor(private genericService: GenericService
    , private router: Router, private localStorageService: LocalStorageService) {

  }

  getFornecedor(idUsuario: Number): any {
    const url = `${resorce}${idUsuario}`
    return this.genericService.get(url, null);
  }

  getFornecedorPorId(idUsuario: Number, idFornecedor: Number): any {
    const url = `${resorceConsultaPorId}${idUsuario}/${idFornecedor}`

    return this.genericService.get(url, null);
  }

  DeleteFornecedo(idUsuario: Number, idFornecedor: Number): any {
    const url = `${resorceDelete}${idUsuario}/${idFornecedor}`
    return this.genericService.delete(url, this.httpOptions);
  }


  postCadastro(fornecedor: Fornecedor): any {
    return this.genericService.post(fornecedor, resorceInsert, null);
  }

  postAtualizar(fornecedor: Fornecedor): any {
    return this.genericService.post(fornecedor, resorceUpdate, null);
  }
}
