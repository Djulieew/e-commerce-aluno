import { Component, signal, computed, effect, inject } from '@angular/core';
import { Produto } from '../produto/produto';
import { PrecoFormatadoPipe } from '../../../shared/pipes/preco-formatado-pipe';
import { UpperCasePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { produtoService } from '../produtos.service';


@Component({
  selector: 'app-lista-produtos',
  imports: [Produto, PrecoFormatadoPipe, UpperCasePipe],
  templateUrl: './lista-produtos.html',
  styleUrl: './lista-produtos.css',
})
export class ListaProdutos {
//! remoção da lista de produtos, dados carregados via API Fakestoreapi
 
 produtos = signal <
 { nome: string ; preco: number }[]>([]);

 //? criar estado de carregamento, 
 //** true: requisição em andamento, exibir indicador no template
 //! false: esconder dados e exibir a lista de produtos

 carregando = signal(true);

 //! cria método para requisição dos produtos
 carregarProdutos(){
    this.carregando.set(true);
    this.produtoService.buscarProdutos().subscribe({
          next: (dados) => {
            const produtos = this.produtoService.transformarProdutos(dados);
            this.produtos.set(produtos);
            this.carregando.set(false);
          },
          error: (erro) => {
            console.error('Erro ao Carregar os Produtos:, ', erro);
            this.carregando.set(false);
          },
    });

 }

  exibirProduto (nome: string){
   // console.log ('Produto Selecionado: ', nome);
   this.produtoSelecionado.set(nome);
  }

adicionarProduto(){
  this.produtos.update(listaAtual => [
    ...listaAtual, {nome: 'Sony PlayStation 5', preco:10000}
  ]);
}
totalProdutos = computed (() => this.produtos().length);
valorTotal= computed (() => { return this.produtos().reduce
  ((total, item) => total + item.preco,0)});

  substituirProdutos (){
    this.produtos.set([
      {nome: 'Arroz Tio João', preco: 400},
    ]);
  }

  //! injetar httpClient dentro de constructor, reestruturar constructor
  constructor(){

    //? carregar a API
    this.carregarProdutos();

    //** effects continuam iguais
    effect(() => {
      console.log('Lista de Produtos Alterados: ', this.produtos());
    }); 
    effect (() =>{
      console.log ('Valor Total Atualizado: ', this.valorTotal());
    });
    effect (() => {
  if (typeof document !== 'undefined') {
    document.title = `(${this.totalProdutos()}) Minha Loja`;
  }
   });
  }
  produtoSelecionado = signal <string | null> (null);

  carrinho = signal<{nome: string; preco:number}[]>([]);

  adicionarAoCarrinho(produto:{nome: string; preco:number}){
    this.carrinho.update(listaAtual=>
    [...listaAtual,produto]);

  }

      private produtoService = inject(produtoService);

  quantidadeCarrinho = computed (() => this.carrinho().length);
  totalCarrinho = computed (() =>{
    return this.carrinho().reduce((total, item)=> total+item.preco,0)
  });
}


