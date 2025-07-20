  describe('Funcionalidade: Usuários', () => {

  it('Deve cadastrar um novo usuário com sucesso', () => {
    cy.request({
      method: 'POST',
      url: 'https://serverest.dev/usuarios',
      body: {
        nome: "Douglas Teste",
        email: "douglas.teste@qa.com",
        password: "123456",
        administrador: "true"
      }
    }).should((res) => {
      expect(res.status).to.eq(201);
      expect(res.body.message).to.eq("Cadastro realizado com sucesso");
      expect(res.body).to.have.property("_id");
    });
  });


    it('Criar usuário com e-mail já existente', () => {
    cy.request({
      method: 'POST',
      url: 'https://serverest.dev/usuarios',
      failOnStatusCode: false,
      body: {
        nome: "Douglas Teste",
        email: "douglas.teste@qa.com",
        password: "123456",
        administrador: "true"
      }
    }).should((res) => {
      expect(res.status).to.eq(400);
      expect(res.body.message).to.eq("Este email já está sendo usado");
    });
  });

  it('Deve editar um usuário com e-mail fixo', () => {
  cy.request('https://serverest.dev/usuarios')
    .then((res) => {
      const usuario = res.body.usuarios.find(u => u.email === 'douglas.teste@qa.com');
      
      if (usuario) {
        cy.request({
          method: 'PUT',
          url: `https://serverest.dev/usuarios/${usuario._id}`,
          body: {
            nome: "Douglas Editado",
            email: usuario.email,
            password: "123456",
            administrador: "true"
          }
        }).should((res) => {
          expect(res.status).to.eq(200);
          expect(res.body.message).to.eq("Registro alterado com sucesso");
        });
      }
    });
});

it('Deve deletar um usuário com e-mail fixo', () => {
  cy.request('https://serverest.dev/usuarios')
    .then((res) => {
      const usuario = res.body.usuarios.find(u => u.email === 'douglas.teste@qa.com');

      if (usuario) {
        cy.request({
          method: 'DELETE',
          url: `https://serverest.dev/usuarios/${usuario._id}`
        }).should((res) => {
          expect(res.status).to.eq(200);
          expect(res.body.message).to.eq("Registro excluído com sucesso");
        });
      }
    });
});


});

