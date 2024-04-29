import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-grid-licitacoes',
  templateUrl: './grid-licitacoes.component.html',
  styleUrls: ['./grid-licitacoes.component.scss']
})
export class GridLicitacoesComponent {

  displayedColumns: string[] = ['licitacao'];
  dataSource: any;
  @ViewChild('paginator') paginator: MatPaginator | undefined;


  displayedColumnsItens: string[] = ['Numero','Descricao', 'Quantidade','ValorUnitArio','ValortotalEstimado','Detalhar'];
  dataSourceItens: any;
  @ViewChild('paginatorItens') paginatorItens: MatPaginator | undefined;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngAfterViewInitItens() {
    this.dataSourceItens.paginator = this.paginatorItens;
  }
}
