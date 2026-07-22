import { signal } from "@angular/core";

export const usuarioLogado = signal (false);

//! Define Signal usuarioLogado como (true), Permite acesso as rotas
export function login (){
    usuarioLogado.set(true);
}

//! Define Signal usuarioLogado (false), bloqueia acesso imediatamente
export function logout(){
    usuarioLogado.set(false);
}