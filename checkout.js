import {
  desenharProdutoNoCarrinhoSimples,
  lerLocalStorage,
  apagarDoLocalStorage,
  salvarLocalStorage,
} from "./src/utilidades.js";

import { atualizarPrecoCarrinho } from "./src/menuCarrinho.js";

function desenharProdutosCheckout() {
  const idsProdutosCarrinhoComQuantidade = lerLocalStorage("carrinho") ?? {};

  for (const idProduto in idsProdutosCarrinhoComQuantidade) {
    desenharProdutoNoCarrinhoSimples(
      idProduto,
      "container-produtos-checkout",
      idsProdutosCarrinhoComQuantidade[idProduto]
    );
  }
}

function finalizarCompra(evento) {
  evento.preventDefault();
  const idsProdutosCarrinhoComQuantidade = lerLocalStorage("carrinho") ?? {};

  if (Object.keys(idsProdutosCarrinhoComQuantidade).length === 0) {
    return;
  }

  const dataAtual = new Date();
  const pedidoFeito = {
    dataPedido: dataAtual,
    pedido: idsProdutosCarrinhoComQuantidade,
  };

  const historicoDePedidos = lerLocalStorage("historico") ?? [];
  const historicoDePedidosAtualizado = [pedidoFeito, ...historicoDePedidos];

  salvarLocalStorage("historico", historicoDePedidosAtualizado);

  apagarDoLocalStorage("carrinho");

  window.location.href = "./pedidos.html";
}

atualizarPrecoCarrinho();
desenharProdutosCheckout();

document.addEventListener("submit", (evt) => finalizarCompra(evt));
