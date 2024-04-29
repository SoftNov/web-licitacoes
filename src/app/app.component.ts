import { Component } from '@angular/core';
import { HttpInterceptorService } from './Services/http-interceptor.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'web-importa-licitacoes';
 

  constructor(private httpStatus: HttpInterceptorService, private loaderService: NgxUiLoaderService) {
    this.httpStatus.getHttpStatus().subscribe((status: boolean) => {
      if(status) {
        this.loaderService.start();
      }
      else {
        this.loaderService.stop();
      }
    });
  }

}
