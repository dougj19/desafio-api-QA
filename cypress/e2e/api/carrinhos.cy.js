describe('Funcionalidade: Carrinhos', () => {

  beforeEach(function () {
    cy.request({
      method: 'POST',
      url: 'https://serverest.dev/login',
      body: {
        email: "fulano@qa.com",
        password: "teste"
      }
    }).then((res) => {
      expect(res.status).to.eq(200);
      this.token = res.body.authorization;
    });
  });

  function limparCarrinhoSeExistir(token) {
    return cy.request({
      method: 'GET',
      url: 'https://serverest.dev/carrinhos',
      headers: { Authorization: token },
      failOnStatusCode: false
    }).then((res) => {
      if (res.body.quantidade > 0) {
        return cy.request({
          method: 'DELETE',
          url: 'https://serverest.dev/carrinhos/cancelar-compra',
          headers: { Authorization: token }
        });
      }
    });
  }

  it('Criar carrinho com produto válido', function () {
  return limparCarrinhoSeExistir(this.token).then(() => {
    cy.request('GET', 'https://serverest.dev/produtos').then((res) => {
      const produtoDisponivel = res.body.produtos.find(p => p.quantidade > 0);
      expect(produtoDisponivel, 'Produto com estoque').to.exist;

      cy.request({
        method: 'POST',
        url: 'https://serverest.dev/carrinhos',
        headers: { Authorization: this.token },
        body: {
          produtos: [
            { idProduto: produtoDisponivel._id, quantidade: 1 }
          ]
        }
      }).should((res) => {
        expect(res.status).to.eq(201);
        expect(res.body.message).to.eq("Cadastro realizado com sucesso");
      });
    });
  });
});


  it('Criar carrinho com produto inexistente', function () {
    limparCarrinhoSeExistir(this.token);

    cy.request({
      method: 'POST',
      url: 'https://serverest.dev/carrinhos',
      headers: { Authorization: this.token },
      failOnStatusCode: false,
      body: {
        produtos: [
          { idProduto: "idInvalido123456", quantidade: 1 }
        ]
      }
    }).should((res) => {
      expect(res.status).to.eq(400);
      expect(res.body.message).to.eq("Produto não encontrado");
    });
  });

  it('Concluir compra com sucesso', function () {
  limparCarrinhoSeExistir(this.token).then(() => {
    cy.request('GET', 'https://serverest.dev/produtos').then((res) => {
      const produtoDisponivel = res.body.produtos.find(p => p.quantidade > 0);
      expect(produtoDisponivel).to.exist;

      cy.request({
        method: 'POST',
        url: 'https://serverest.dev/carrinhos',
        headers: { Authorization: this.token },
        body: {
          produtos: [
            { idProduto: produtoDisponivel._id, quantidade: 1 }
          ]
        }
      }).then(() => {
        cy.request({
          method: 'DELETE',
          url: 'https://serverest.dev/carrinhos/concluir-compra',
          headers: { Authorization: this.token }
        }).should((res) => {
          expect(res.status).to.eq(200);
          expect(res.body.message).to.eq("Registro excluído com sucesso");
        });
      });
    });
  });
});


  it('Buscar carrinho por ID', function () {
  limparCarrinhoSeExistir(this.token).then(() => {
    cy.request('GET', 'https://serverest.dev/produtos').then((res) => {
      const produtoDisponivel = res.body.produtos.find(p => p.quantidade > 0);
      expect(produtoDisponivel, 'Produto com estoque disponível').to.exist;

      cy.request({
        method: 'POST',
        url: 'https://serverest.dev/carrinhos',
        headers: { Authorization: this.token },
        body: {
          produtos: [
            { idProduto: produtoDisponivel._id, quantidade: 1 }
          ]
        }
      }).then(() => {
        cy.request({
          method: 'GET',
          url: 'https://serverest.dev/carrinhos',
          headers: { Authorization: this.token }
        }).then((resCarrinhos) => {
          const idCarrinho = resCarrinhos.body.carrinhos[0]._id;

          cy.request({
            method: 'GET',
            url: `https://serverest.dev/carrinhos/${idCarrinho}`,
            headers: { Authorization: this.token }
          }).should((resGet) => {
            expect(resGet.status).to.eq(200);
            expect(resGet.body).to.have.property('idUsuario');
            expect(resGet.body).to.have.property('produtos');
          });
        });
      });
    });
  });
});


});
