describe('Funcionalidade: Login', () => {
  it('Deve logar com sucesso', () => {
    cy.request({
      method: 'POST',
      url: 'https://serverest.dev/login',
      body: {
        email: "fulano@qa.com",
        password: "teste"
      }
    }).should((res) => {
      expect(res.status).to.eq(200)
      expect(res.body.message).to.eq("Login realizado com sucesso")
      expect(res.body.authorization).to.not.be.empty
    })
  })

  it('Não deve logar com senha inválida', () => {
    cy.request({
      method: 'POST',
      url: 'https://serverest.dev/login',
      failOnStatusCode: false,
      body: {
        email: "fulano@qa.com",
        password: "errado"
      }
    }).should((res) => {
      expect(res.status).to.eq(401)
      expect(res.body.message).to.eq("Email e/ou senha inválidos")
    })
  })

  it('Login com usuário inexistente', () => {
    cy.request({
      method: 'POST',
      url: 'https://serverest.dev/login',
      failOnStatusCode: false,
      body: {
        email: "douglas@qa.com",
        password: "teste"
      }
    }).should((res) => {
      expect(res.status).to.eq(401)
      expect(res.body.message).to.eq("Email e/ou senha inválidos")
    })
  })

  it('Login sem preencher campos obrigatórios', () => {
  cy.request({
    method: 'POST',
    url: 'https://serverest.dev/login',
    failOnStatusCode: false,
    body: {
      email: "",
      password: ""
    }
  }).should((res) => {
    expect(res.status).to.eq(400);
    expect(res.body).to.have.property("email", "email não pode ficar em branco");
    expect(res.body).to.have.property("password", "password não pode ficar em branco");
  });
});


})
