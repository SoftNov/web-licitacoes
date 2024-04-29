import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { Router } from '@angular/router';
import { LocalStorageService } from './local-storage.service';

const resorce = "api/Filtro/Buscar/Dados";
const resorceMunicipio = "api/Filtro/Buscar/Municipios";

@Injectable({
  providedIn: 'root'
})
export class FiltroService {

  constructor(private genericService: GenericService, private router: Router, private localStorageService: LocalStorageService) { }



  getFiltros(): any{
    return this.genericService.get(`${resorce}` , null);
   }
  postMunicipios(filtro: any): any {
    return this.genericService.post(filtro, `${resorceMunicipio}`, null );
  }

}
