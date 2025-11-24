describe('Kanban Board', () => {
  it('Deve mover uma tarefa de Todo para Done e atualizar o board', () => {
    cy.login();
    cy.contains('Kanban').click();

    const dataTransfer = new DataTransfer();
    cy.contains('div[draggable=true]', 'Documentar API').trigger('dragstart', {
      dataTransfer,
    }); //simula o clique e arrastar

    cy.get('.column-done')
      .trigger('drop', { dataTransfer }) //soltar na coluna done
      .find('h3')
      .should('have.text', 'Done (4)'); //verifica se o contador de tarefas na coluna done foi atualizado

    cy.get('.column-done')
      .should('include.text', 'Documentar API') //verifica se a tarefa está na coluna done pelo título
      .and('include.text', 'Criar documentação da API com Swagger');
  });
});
