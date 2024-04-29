export class Fornecedor {
    id: Number = 0;
    idUsuario: Number = 0;
    idContato: Number = 0;
    nomeEmpresa: String = "";
    nomeRepresentanteComercial: String = "";
    marca: String = "";
    modelo: String = "";
    descricao: String = "";
    valor: String = "";
    email: String = "";
    telefone: String = '';
    cnpj: String = "";
    DatCadastro: Date = new Date();
    ativo: Boolean = false;
}