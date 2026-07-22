//import { Routes } from '@angular/router';
//import { ListaProdutos } from './features/produtos/lista-produtos/lista-produtos';
import { authGuard } from './core/auth.guard';
import { Carrinho } from './features/carrinho/carrinho/carrinho';
import { Home } from './features/home/home/home';

//export const routes: Routes = [
//  {
   // path: '', 
 //   component: Home,
//},
   //{ 
   // path: 'produtos', 
   // component: ListaProdutos, 
//}, 
 // {
  //  path: 'produtos',
   // loadComponent: () =>
   //     import ('./features/produtos/lista-produtos/lista-produtos'). then(m =>m.ListaProdutos)
//  },

//{ 
  //  path: 'carrinho',  
   // component: Carrinho,
// },
//];

//! codigo final LazyLoading e LoadComponent

import { Routes } from "@angular/router";
export const routes: Routes = [
    {
        path:'',
        loadComponent: () =>
            import ('./features/home/home/home').then((m)=>m.Home), 
    },
    {
        path: 'carrinho',
        canActivate: [authGuard],
        loadComponent:() =>
            import ('./features/carrinho/carrinho/carrinho').then((m)=>m.Carrinho),
    },
    {
        path: 'produtos',
        loadComponent:() =>
            import ('./features/produtos/lista-produtos/lista-produtos').then((m)=>m.ListaProdutos),
    },
    {
        path:'**',
        redirectTo: '',
    },
];
 