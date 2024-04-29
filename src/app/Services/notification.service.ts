import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  alertSucesso: boolean = false;
  alertErro: boolean = false;
  alertInfo: boolean = false;
  tituloAlert: string = "";
  mensagemAlert: string = "";


  constructor(private toastr: ToastrService) { }


  ngAlertSucesso( titulo: string, mensagem: string){
    this.toastr.success(mensagem, titulo);
  }

  ngAlertErro(titulo: string, mensagem: string){
    this.toastr.error( mensagem, titulo);
  }

  ngAlertInfo(titulo: string, mensagem: string){
    this.toastr.info(mensagem, titulo);
  }
}
