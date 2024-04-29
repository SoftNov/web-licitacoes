import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { Router } from '@angular/router';
import { LocalStorageService } from './local-storage.service';
import { MeuNegocio } from '../Model/MeuNegocio';
import { HttpHeaders } from '@angular/common/http';
import { MovimentoMeusContratos } from '../Model/MovimentoMeusContratos';
import { VinculoFornecedor } from '../Model/VinculoFornecedor';

const resorce = "api/MeusNegocios/Incluir/Novo/Negocio";
const resorceVinculo = "api/MeusNegocios/Incluir/Vinculo/Fornecedor";
const resorceMeusNegociosPorId = "api/MeusNegocios/Buscar/Contrato/Id/";
const resorceDelete = "api/MeusNegocios/Delete/Negocio";
const resorceDeleteContrato = "api/MeusNegocios/Delete/Contrato";
const resorceDeleteVinculo = "api/MeusNegocios/Delete/Vinculo/Fornecedor/";
const resorceBuscarMeusNegocios = "api/MeusNegocios/Obter/";
const resorceBuscarMeusContratos = "api/MeusNegocios/Buscar/Contratos/";
const resorceUpdateMeusContratos = "api/MeusNegocios/Move/Card/Contrato";
@Injectable({
  providedIn: 'root'
})


export class MeusNegociosService {
  httpOptions = {
    headers: new HttpHeaders({
      
      'Content-Type': 'application/json; charset=UTF-8',
    }),
  };

  constructor(private genericService: GenericService, private router: Router, private localStorageService: LocalStorageService) { }

  postSalvar(negocio: MeuNegocio): any {
    return this.genericService.post(negocio, resorce, null );
  }

  postVinculoFornecedor(vinculo: VinculoFornecedor): any {
    return this.genericService.post(vinculo, resorceVinculo, null );
  }

  Delete(negocio: MeuNegocio): any {
    return this.genericService.post(negocio, resorceDelete, null );
  }

  DeleteContrato(negocio: MeuNegocio): any {
    return this.genericService.post(negocio, resorceDeleteContrato, null );
  }

  getMeusNegocios(idUsuario: Number): any {
    const url = `${resorceBuscarMeusNegocios}${idUsuario}`
    return this.genericService.get( url, null );
  }

  getMeusContratos(idUsuario: Number): any {
    const url = `${resorceBuscarMeusContratos}${idUsuario}`
    return this.genericService.get( url, null );
  }

 postUpdateMeusContratos(movimento: MovimentoMeusContratos): any {
    return this.genericService.post(movimento, resorceUpdateMeusContratos, null );
  }

  getMeusNegociosPorId(idUsuario: Number, idContrato: Number): any {
    const url = `${resorceMeusNegociosPorId}${idUsuario}/${idContrato}`
    return this.genericService.get( url, null );
  }

  DeleteVinculoFornecedo(idVinculo: Number): any {
    const url = `${resorceDeleteVinculo}${idVinculo}`
    return this.genericService.delete( url, this.httpOptions );
  }
}
