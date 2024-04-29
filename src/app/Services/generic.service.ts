import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class GenericService {

  userLogado: any;
  constructor(private http: HttpClient, private localStorageService: LocalStorageService) { 

  }

  nghttpOptions(){
    this.userLogado = JSON.parse(this.localStorageService.get("user"));
    if(this.userLogado == null){
      return {
        headers: new HttpHeaders({
          'Content-Type': 'application/json;',
        }),
      };
    }
    else{
      return {
        headers: new HttpHeaders({
          'Authorization': 'Bearer ' + this.userLogado.access_token,
          'Content-Type': 'application/json;',
        }),
      };
    }

   }

  get<T>(resorce: any, httpOption: any): Promise<any> {
    const url = `${environment.apiEndPoint}/${resorce}`
    console.log(url);
    return this.http.get<T>(url, this.nghttpOptions()).toPromise();
  }

  

  post<T>(body: any, resorce: String, httpOption: any): Observable<any>{
    const url = `${environment.apiEndPoint}/${resorce}`;
    console.log(url);
    return this.http.post(url, body, this.nghttpOptions());
  }

  put<T>(body: any, resorce: String, httpOption: any): Observable<any>{
    const url = `${environment.apiEndPoint}/${resorce}`;
    console.log(url);
    return this.http.put(url, body, this.nghttpOptions());
   }
  // delete<T>(body: any, resorce: String): Observable<any>{
  //   const url = `${environment.apiEndPoint}/${resorce}`;
  //   console.log(url);
  //   return this.http.delete(url, body,);
  // }
  

  delete<T>(resorce: any, body: any): Promise<any> {
    const url = `${environment.apiEndPoint}/${resorce}`
    console.log(url);
    return this.http.delete<T>(url, this.nghttpOptions()).toPromise();
  }
}
