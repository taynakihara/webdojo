describe('iFrame', () => {
  it('Deve tocar o vídeo de exemplo', () => {
    cy.login();

    cy.contains('Video').click();
    cy.get('iframe[title="Video Player"]')
      .should('exist')
      .its('0.contentDocument.body') //conteudo da página que está dentro do iframe
      .then(cy.wrap) //pega o elemento e transforma em um objeto cypress para eu poder manipulá-lo
      .as('iFramePlayer'); //gravando isso dentro de um as para reutilizar depois

    cy.get('@iFramePlayer').find('.play-button').click(); //seleciona o botão de play dentro do iframe

    cy.get('@iFramePlayer').find('.pause-button').should('be.visible'); //verifica se o botão de pause está visível, ou seja, o vídeo está tocando
  });
});
