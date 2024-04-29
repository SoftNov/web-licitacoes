import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { NotificationService } from 'src/app/Services/notification.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  // 
  router: Router;
  constructor(private formBuilder: FormBuilder, private Router: Router, private localStorageService: LocalStorageService,
    private notificationService: NotificationService) {
    this.router = Router;
  }

  ngOnInit() {
    this.VerificaSePrecisaCriarNovaSenha();

  }


  VerificaSePrecisaCriarNovaSenha(){
    const user =  JSON.parse(this.localStorageService.get("user"));
    const login = user.usuario.login;

    if(login.resetPaswoerd != null){
      this.router.navigate(['/Nova/Senha']);
      this.notificationService.ngAlertInfo("Atenção!", "Você solicitou recentimente uma alteração de senha. Sugerimos que crie uma nova senha para sua segurança. ");
    }


  }
}
