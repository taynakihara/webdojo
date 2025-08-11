describe('studio', () => {
  it('Exemplo do Cypress Studio', () => {
    cy.visit('https://example.cypress.io')
  })

  /* ==== Test Created with Cypress Studio ==== */
  it('Deve logar com sucesso', () => {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('http://localhost:3000');

    cy.get('#email').type('papito@webdojo.com');
    cy.get('#password').type('katana123');
    cy.contains('button', 'Entrar').click();
    cy.get('[data-cy="user-name"]').should('be.visible');
    /* ==== End Cypress Studio ==== */
  });
})