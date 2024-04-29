import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { NotificationService } from 'src/app/Services/notification.service';
import { RegisterService } from 'src/app/Services/register.service';

@Component({
  selector: 'app-ativacao-conta',
  templateUrl: './ativacao-conta.component.html',
  styleUrls: ['./ativacao-conta.component.scss']
})
export class AtivacaoContaComponent {
  userId: number = 0;
  constructor( private notificationService: NotificationService
    , private router: Router, private registerService: RegisterService
    , private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => this.userId = params['idUsuario']);
    this.registerService.getAtivarUsuario( this.userId);
   
  }
}
