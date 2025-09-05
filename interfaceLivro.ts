interface ILivro {
  titulo: string;
  autor: string;
  editora: string;
  isbn: string;
  preco: number;
  ano: number;
  estoque: number;

  exibirDetalhes(): void;
  atualizarEstoque(quantidade: number): void;
}

class LivroEbook implements ILivro {
  titulo: string;
  autor: string;
  preco: number;
  ano: number;
  editora: string;
  isbn: string;
  estoque: number;
  tamanhoArquivo: number; 

  constructor(titulo: string, autor: string, preco: number, ano: number, editora: string, isbn: string, estoque: number,tamanhoArquivo: number) {
    this.titulo = titulo;
    this.autor = autor;
    this.preco = preco;
    this.ano = ano;
    this.editora = editora;
    this.isbn = isbn;
    this.estoque = estoque;
    this.tamanhoArquivo = tamanhoArquivo;
  }

  exibirDetalhes(): void {
    console.log("Dados do EBook:");
    console.log(`Título: ${this.titulo}`);
    console.log(`Autor: ${this.autor}`);
    console.log(`Preço: ${this.preco}`);
    console.log(`Ano: ${this.ano}`);
    console.log(`Editora: ${this.editora}`);
    console.log(`ISBN: ${this.isbn}`);
    console.log(`Estoque: ${this.estoque}`);
    console.log(`Tamanho do Arquivo: ${this.tamanhoArquivo}`);
  }

  atualizarEstoque(quantidade: number): void {
    this.estoque += quantidade;
  }
}

class LivroFisico implements ILivro {
  titulo: string;
  autor: string;
  preco: number;
  ano: number;
  editora: string;
  isbn: string;
  estoque: number;

  constructor(titulo: string, autor: string, preco: number, ano: number, editora: string, isbn: string, estoque: number) {
    this.titulo = titulo;
    this.autor = autor;
    this.preco = preco;
    this.ano = ano;
    this.editora = editora;
    this.isbn = isbn;
    this.estoque = estoque;
  }

  exibirDetalhes(): void {
    console.log("Dados do Livro Físico:");
    console.log(`Título: ${this.titulo}`);
    console.log(`Autor: ${this.autor}`);
    console.log(`Preço: ${this.preco}`);
    console.log(`Ano: ${this.ano}`);
    console.log(`Editora: ${this.editora}`);
    console.log(`ISBN: ${this.isbn}`);
    console.log(`Estoque: ${this.estoque}`);
  }

  atualizarEstoque(quantidade: number): void {
    this.estoque += quantidade;
  }
}

class Livraria {
  private livros: ILivro[] = [];

  adicionarLivro(livro: ILivro): void {
    this.livros.push(livro);
    console.log(`Livro "${livro.titulo}" adicionado com sucesso!`);
  }

  excluirLivro(isbn: string): void {
  for (let i = 0; i < this.livros.length; i++) {
    if (this.livros[i].isbn === isbn) {
      this.livros.splice(i, 1);
      console.log(`Livro com ISBN ${isbn} removido da livraria.`);
      return; 
    }
  }
  console.log(`Livro com ISBN ${isbn} não encontrado.`);
}


  venderLivro(isbn: string, quantidade: number): void {
    const livro = this.livros.find((l) => l.isbn === isbn);
    if (livro) {
      if (livro.estoque >= quantidade) {
        livro.atualizarEstoque(-quantidade);
        console.log(`Venda realizada: ${quantidade} unidade(s) de "${livro.titulo}"`);
      } 
      else {
        console.log(
          `Estoque insuficiente para o livro "${livro.titulo}". Disponível: ${livro.estoque}`
        );
      }
    } 
    else {
      console.log(`Livro com ISBN ${isbn} não encontrado.`);
    }
  }

  listarLivros(): void {
    console.log("Catálogo da Livraria:");
    this.livros.forEach((livro) => livro.exibirDetalhes());
  }
}


const livro1 = new LivroFisico("O Deus que destrói sonhos", "Rodrigo Bibo", 35, 2022, "Casa Publicadora Brasileira (CPB)", "123ABC", 10);

const livro2 = new LivroEbook("Como se tornar um cristão inútil", "Rodrigo Bibo", 15, 2023, "Casa Publicadora Brasileira (CPB)", "456DEF", 50, 5);

const livro3 = new LivroFisico("Conhecer Jesus é tudo", "Alejandro Bullón", 15, 2000, "Casa Publicadora Brasileira (CPB)", "231FAC", 12);

const livraria = new Livraria();
livraria.adicionarLivro(livro1);
livraria.adicionarLivro(livro2);
livraria.adicionarLivro(livro3);

livraria.listarLivros();

livraria.venderLivro("123ABC", 3); 
livraria.venderLivro("456DEF", 10); 
livraria.venderLivro("123ABC", 20); 

livraria.listarLivros();

livraria.excluirLivro("456DEF");
livraria.listarLivros();


