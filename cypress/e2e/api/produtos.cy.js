describe('Funcionalidade: Produtos', () => {

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

  it('Deve cadastrar um produto com token válido', function () {
    cy.request({
      method: 'POST',
      url: 'https://serverest.dev/produtos',
      headers: {
        Authorization: this.token
      },
      body: {
        nome: "Produto Novo " + Date.now(),
        preco: 100,
        descricao: "Produto de teste automático",
        quantidade: 5
      }
    }).should((res) => {
      expect(res.status).to.eq(201);
      expect(res.body.message).to.eq("Cadastro realizado com sucesso");
    });
  });

  it('Cadastrar produto com nome já existente', function () {
    cy.request({
      method: 'POST',
      url: 'https://serverest.dev/produtos',
      headers: {
        Authorization: this.token
      },
      failOnStatusCode: false,
      body: {
        nome: "Produto QA",
        preco: 100,
        descricao: "Produto fixo para teste de duplicidade",
        quantidade: 5
      }
    });

    cy.request({
      method: 'POST',
      url: 'https://serverest.dev/produtos',
      headers: {
        Authorization: this.token
      },
      failOnStatusCode: false,
      body: {
        nome: "Produto QA",
        preco: 100,
        descricao: "Produto duplicado",
        quantidade: 5
      }
    }).should((res) => {
      expect(res.status).to.eq(400);
      expect(res.body.message).to.eq("Já existe produto com esse nome");
    });
  });

  it('Deve consultar a lista de produtos', () => {
    cy.request({
      method: 'GET',
      url: 'https://serverest.dev/produtos'
    }).should((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.produtos).to.be.an('array');
    });
  });

  it('Deve editar o produto "Produto QA"', function () {
    cy.request({
      method: 'GET',
      url: 'https://serverest.dev/produtos'
    }).then((res) => {
      const produto = res.body.produtos.find(p => p.nome === "Produto QA");
      expect(produto).to.exist;

      cy.request({
        method: 'PUT',
        url: `https://serverest.dev/produtos/${produto._id}`,
        headers: {
          Authorization: this.token
        },
        body: {
          nome: "Produto QA Editado" + Date.now(),
          preco: 150,
          descricao: "Produto editado com sucesso",
          quantidade: 10
        }
      }).then((resEdit) => {
        expect(resEdit.status).to.eq(200);
        expect(resEdit.body.message).to.eq("Registro alterado com sucesso");
      });
    });
  });

  it('Deve deletar um produto existente', function () {
    
    cy.request({
      method: 'POST',
      url: 'https://serverest.dev/produtos',
      headers: {
        Authorization: this.token
      },
      body: {
        nome: "Produto para deletar",
        preco: 80,
        descricao: "Produto teste para deletar",
        quantidade: 2
      }
    }).then((res) => {
      const idProduto = res.body._id;

      cy.request({
        method: 'DELETE',
        url: `https://serverest.dev/produtos/${idProduto}`,
        headers: {
          Authorization: this.token
        }
      }).should((res) => {
        expect(res.status).to.eq(200);
        expect(res.body.message).to.eq("Registro excluído com sucesso");
      });
    });
  });

});
