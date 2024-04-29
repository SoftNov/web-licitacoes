import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { GenericService } from './generic.service';
import { HttpHeaders } from '@angular/common/http';
import { FiltroLicitacao } from '../Model/FiltroLicitacao';
import { LocalStorageService } from './local-storage.service';


const resorce = "api/Licitacao/Pesquisar";
const resorceItens = "api/Licitacao/obter/Itens/";
const resorceItensPorUsuario = "api/Licitacao/obter/Itens/Usuario/";
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6Imx1Y2FzbmF0aGFubm9ndWVpcmFAZ21haWwuY29tIiwibmJmIjoxNjkzMzkzOTE3LCJleHAiOjE2OTM0MDExMTcsImlhdCI6MTY5MzM5MzkxN30.c22jdtQoEzpg7gUHcNr1XwsGS9uqH1cNUJFf0kZ1cV0"
@Injectable({
  providedIn: 'root'
})
export class LicitacaoService {

  userLogado: any;
  httpOptions = {
    headers: new HttpHeaders({
      
      'Content-Type': 'application/json; charset=UTF-8',
    }),
  };


  constructor(private genericService: GenericService, private router: Router, private localStorageService: LocalStorageService) {


   }


   postPesquisa(filtro: FiltroLicitacao): any {
      return this.genericService.post(filtro, resorce, null );
   }

   getItens(idLicitacao: Number): any {
      const url = `${resorceItens}${idLicitacao}`
      return this.genericService.get( url, null );
    }

    getItensUsuario(idLicitacao: Number, idUsuario: Number): any {
      const url = `${resorceItensPorUsuario}${idLicitacao}/${idUsuario}`
      return this.genericService.get( url, null );
    }
}
