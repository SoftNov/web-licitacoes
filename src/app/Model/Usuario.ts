import { Contato } from "./Contato";
import { Login } from "./Login";
import { Perfil } from "./Perfil";

export class Usuario {
    nome: String = "";
    cpfCnpj: String = "";
    flgAtivo: boolean = false;
    contato: Contato = new Contato();
    login: Login = new Login();
    perfil: Perfil = new Perfil();
}