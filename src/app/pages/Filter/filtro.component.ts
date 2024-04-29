import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FiltroLicitacao } from 'src/app/Model/FiltroLicitacao';
import { FiltroService } from 'src/app/Services/filtro.service';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { NotificationService } from 'src/app/Services/notification.service';
import { LicitacaoComponent } from '../licitacao/licitacao.component';


@Component({
  selector: 'app-filtro',
  templateUrl: './filtro.component.html',
  styleUrls: ['./filtro.component.scss']
})
export class FiltroComponent {

  dadosFiltros: any;
  filtrosForm: FormGroup;
  municipios: any;
  disabled: Boolean = false;
  
  constructor(private formBuilder: FormBuilder, public dialog: MatDialog, private notificationService: NotificationService
    , private localStorageService: LocalStorageService, private filtroService: FiltroService) {
      this.filtrosForm = this.formBuilder.group({
        // dtInicio: [''],
        dtFim: [''],
        estados: [''],
        municipios: [''],
        modalidades: [''],
      });

      this.setFiltros();
    }

  ngOnInit() {
    debugger
    this.ObterDadosFiltro();
    this.setFiltros();
  }

  ngValidacaoForm(){
    this.filtrosForm = this.formBuilder.group({
      // dtInicio: ['', [Validators.required]],
      dtFim: ['', [Validators.required]],
      estados: ['', [Validators.required]],
      municipios: [''],
      modalidades: [''],
    });
  }

  NgBuscarMunicipios(){
    const estados = this.filtrosForm.value.estados;

    if(estados != undefined){
      debugger
      if(estados.length > 0){
        this.ObterMunicipios(estados)
       }
       else{
        let filtro: FiltroLicitacao = new FiltroLicitacao();
        filtro  =  JSON.parse(this.localStorageService.get("FiltrosSelecionados"));
        filtro.listMunicipio = [];
        filtro.listEstado = [];
        this.localStorageService.set("FiltrosSelecionados", filtro)
        this.filtrosForm.value.estados = undefined;
        this.municipios= undefined;
        
       }
    }
    else{
      this.filtrosForm.value.estados = [];
      this.municipios= [];
    }
    this.ngAplicar();
  }

  limparFiltros(){
    let filtro: FiltroLicitacao = new FiltroLicitacao();
    filtro  =  JSON.parse(this.localStorageService.get("FiltrosSelecionados"));

    if(filtro.DatFim == undefined){
      filtro.DatFim = new Date().toDateString();
    }

    if(filtro.DatInicio== undefined){
      filtro.DatInicio = new Date(-60).toDateString();
    }
    filtro.listMunicipio = [];
    filtro.listEstado = [];

    this.localStorageService.set("FiltrosSelecionados", filtro)
  }

  setFiltros(){
    let filtro: FiltroLicitacao = new FiltroLicitacao();
    filtro  =  JSON.parse(this.localStorageService.get("FiltrosSelecionados"));
    this.dadosFiltros =  JSON.parse(this.localStorageService.get("dadosFiltros"));
    debugger
    
    if(filtro.listModalidade == undefined){
      if(this.dadosFiltros.modalidades != undefined){
        if(this.dadosFiltros.modalidades.length > 0){
          filtro.listModalidade = [];
          debugger
          for(var i = 0; i< this.dadosFiltros.modalidades.length; i++){
            filtro.listModalidade.push(this.dadosFiltros.modalidades[i].idModalidade)
          }
  
        }
      }
    }



    if(filtro.DatFim == undefined){
      filtro.DatFim = new Date().toDateString();
    }

    if(filtro.DatInicio== undefined){
      filtro.DatInicio = new Date(-60).toDateString();
    }


    if(filtro.listEstado != undefined){
      this.filtrosForm.setValue({
        // dtInicio: filtro.DatInicio,
        dtFim: filtro.DatFim,
        estados: filtro.listEstado,
        municipios:  filtro.listMunicipio,
        modalidades: filtro.listModalidade,
      });
    }
  }

  ObterDadosFiltro(){
    let filtro: FiltroLicitacao = new FiltroLicitacao();
    filtro  =  JSON.parse(this.localStorageService.get("FiltrosSelecionados"));
    this.dadosFiltros =  JSON.parse(this.localStorageService.get("dadosFiltros"));
    if(filtro != undefined){
      if(filtro.listEstado.length > 0){
        this.ObterMunicipios(filtro.listEstado);
      }
    }

  }

  ObterMunicipios(filtro: any){
    this.filtroService.postMunicipios(filtro).subscribe(
      (resultado: { success: any; data: any; message: any}) => {
        console.log(resultado)
        if(resultado.success){
          this.municipios = resultado.data;
        }
        else{
           this.notificationService.ngAlertErro("Erro!", resultado.message[0]);
        }
      },
      (erro: { status: number; }) => {
        if(erro.status > 400) {
          console.log(erro);
        }
        this.notificationService.ngAlertErro("Erro!", "Erro ao buscar municipios.");
      }
    );
  }

  ngAplicar(){
    let filtro: FiltroLicitacao = new FiltroLicitacao();
    filtro  =  JSON.parse(this.localStorageService.get("FiltrosSelecionados"));

    if(this.filtrosForm.value.estados != undefined){
      if(this.filtrosForm.value.estados.length > 0){
        filtro.listMunicipio = this.filtrosForm.value.municipios;
        filtro.listEstado = this.filtrosForm.value.estados;
      }
      else{
        filtro.listMunicipio = [];
        filtro.listEstado = [];
      }
    }
    else{
      filtro.listMunicipio = [];
      filtro.listEstado = [];
    }
    debugger
    filtro.listModalidade = this.filtrosForm.value.modalidades;
    filtro.DatFim = this.filtrosForm.value.dtFim;
    filtro.DatInicio = this.filtrosForm.value.dtInicio;
    this.localStorageService.set("FiltrosSelecionados", filtro);
  }

  
}
