describe('Formulário de Consultoria', () => {

  // before(() => {
  //   cy.log('Isso acontece uma vez antes de todos os testes');
  // }); //executa uma vez antes de todos os it

  beforeEach(() => { //executa antes de cada it
    cy.login()
    cy.goTo('Formulários', 'Consultoria')

    cy.fixture('consultancy').as('consultancyData')
  }); 

  it('Deve solicitar consultoria individual', function() {

    const consultancyForm = this.consultancyData.personal //this dá acesso ao contexto definido em uma função externa (nesse caso está dentro do beforeEach)

    cy.get('input[placeholder="Digite seu nome completo"]').type(
      'Fernando Papito'
    );

    cy.get('input[placeholder="Digite seu email"]').type(consultancyForm.email);
    cy.get('input[placeholder="(00) 00000-0000"]')
      .type(consultancyForm.phone)
    //.should('have.value', '(11) 99999-1000');

    cy.contains('label', 'Tipo de Consultoria')
      .parent()
      .find('select')
      .select(consultancyForm.consultancyType);

    if (consultancyForm.personType === 'cpf') {
      cy.contains('label', 'Pessoa Física') //escolho no botão radio pessoa fisica
        .find('input')
        .click()
        .should('be.checked');

      cy.contains('label', 'Pessoa Jurídica')
        .find('input')
        .should('not.be.checked'); // verifica se pessoa juridica nao foi marcada
    }

    if (consultancyForm.personType === 'cnpj') {
      cy.contains('label', 'Pessoa Jurídica') //escolho no botão radio pessoa juridica
        .find('input')
        .click()
        .should('be.checked');

      cy.contains('label', 'Pessoa Física')
        .find('input')
        .should('not.be.checked'); // verifica se pessoa fisica nao foi marcada
    }


    cy.contains('label', 'CPF')
      .parent()
      .find('input')
      .type(consultancyForm.document)
    //.should('have.value', '123.456.789-01');

    consultancyForm.discoveryChannels.forEach((channel) => {
      cy.contains('label', channel)
        .find('input')
        .check()
        .should('be.checked');
    });

    consultancyForm.discoveryChannels.forEach((channel) => {
      cy.contains('label', channel).find('input').check().should('be.checked');
    });

    cy.get('input[type="file"]').selectFile(
      consultancyForm.file,
      { force: true }
    );

    cy.get(
      'textarea[placeholder="Descreva mais detalhes sobre sua necessidade"]'
    ).type(
      consultancyForm.description
    );

    consultancyForm.techs.forEach((tech) => {
      cy.get('input[placeholder="Digite uma tecnologia e pressione Enter"]')
        .type(tech)
        .type('{enter}');

      cy.contains('label', 'Tecnologias')
        .parent()
        .contains('span', tech)
        .should('be.visible');
    });

    if (consultancyForm.terms === true) {
      cy.contains('label', 'termos de uso')
        .find('input')
        .check()
        .should('be.checked');
    }

    cy.get('button[type="submit"]').click(); // OU cy.contains('button', 'Enviar Formulário').click()

    cy.get('.modal', { timeout: 10000 }) //modal da mensagem de sucesso
      .should('be.visible') //garante que o modal está visível
      .find('.modal-content') //procura o conteúdo do modal
      .should('be.visible') //garante que o conteúdo está visível
      .and(
        'have.text',
        'Sua solicitação de consultoria foi enviada com sucesso! Em breve, nossa equipe entrará em contato através do email fornecido.',
        { timeout: 20000 }
      ); //valida o texto exato do conteúdo
  });

  it('Deve solicitar consultoria In Company', function() {

    const consultancyForm = this.consultancyData.company

    cy.get('input[placeholder="Digite seu nome completo"]').type(
      'Fernando Papito'
    );

    cy.get('input[placeholder="Digite seu email"]').type(consultancyForm.email);
    cy.get('input[placeholder="(00) 00000-0000"]')
      .type(consultancyForm.phone)
    //.should('have.value', '(11) 99999-1000');

    cy.contains('label', 'Tipo de Consultoria')
      .parent()
      .find('select')
      .select(consultancyForm.consultancyType);

    if (consultancyForm.personType === 'cpf') {
      cy.contains('label', 'Pessoa Física') //escolho no botão radio pessoa fisica
        .find('input')
        .click()
        .should('be.checked');

      cy.contains('label', 'Pessoa Jurídica')
        .find('input')
        .should('not.be.checked'); // verifica se pessoa juridica nao foi marcada
    }

    if (consultancyForm.personType === 'cnpj') {
      cy.contains('label', 'Pessoa Jurídica') //escolho no botão radio pessoa juridica
        .find('input')
        .click()
        .should('be.checked');

      cy.contains('label', 'Pessoa Física')
        .find('input')
        .should('not.be.checked'); // verifica se pessoa fisica nao foi marcada
    }


    cy.contains('label', 'CNPJ')
      .parent()
      .find('input')
      .type(consultancyForm.document)
    //.should('have.value', '123.456.789-01');

    consultancyForm.discoveryChannels.forEach((channel) => {
      cy.contains('label', channel)
        .find('input')
        .check()
        .should('be.checked');
    });

    consultancyForm.discoveryChannels.forEach((channel) => {
      cy.contains('label', channel).find('input').check().should('be.checked');
    });

    cy.get('input[type="file"]').selectFile(
      consultancyForm.file,
      { force: true }
    );

    cy.get(
      'textarea[placeholder="Descreva mais detalhes sobre sua necessidade"]'
    ).type(
      consultancyForm.description
    );

    consultancyForm.techs.forEach((tech) => {
      cy.get('input[placeholder="Digite uma tecnologia e pressione Enter"]')
        .type(tech)
        .type('{enter}');

      cy.contains('label', 'Tecnologias')
        .parent()
        .contains('span', tech)
        .should('be.visible');
    });

    if (consultancyForm.terms === true) {
      cy.contains('label', 'termos de uso')
        .find('input')
        .check()
        .should('be.checked');
    }

    cy.get('button[type="submit"]').click(); // OU cy.contains('button', 'Enviar Formulário').click()

    cy.get('.modal', { timeout: 10000 }) //modal da mensagem de sucesso
      .should('be.visible') //garante que o modal está visível
      .find('.modal-content') //procura o conteúdo do modal
      .should('be.visible') //garante que o conteúdo está visível
      .and(
        'have.text',
        'Sua solicitação de consultoria foi enviada com sucesso! Em breve, nossa equipe entrará em contato através do email fornecido.',
        { timeout: 20000 }
      ); //valida o texto exato do conteúdo
  });

  it('Deve verifica os campos obrigatórios', () => {
    cy.get('button[type="submit"]').click();

    cy.contains('label', 'Nome Completo')
      .parent() //navega ao pai do label
      .find('p') //procura o parágrafo dentro do pai
      .should('be.visible') //garante que o texto está visível
      .should('have.text', 'Campo obrigatório') //valida o texto exato
      .and('have.class', 'text-red-400') //valida a cor do texto
      .and('have.css', 'color', 'rgb(248, 113, 113)'); //valida direto no css a cor do texto

    cy.contains('label', 'Email')
      .parent()
      .find('p')
      .should('be.visible')
      .should('have.text', 'Campo obrigatório')
      .and('have.class', 'text-red-400')
      .and('have.css', 'color', 'rgb(248, 113, 113)');

    cy.contains('label', 'termos de uso')
      .parent()
      .find('p')
      .should('be.visible')
      .should('have.text', 'Você precisa aceitar os termos de uso')
      .and('have.class', 'text-red-400')
      .and('have.css', 'color', 'rgb(248, 113, 113)');
  });

  // afterEach(() => {
  //   cy.log('Isso acontece após cada teste');
  // });

  // after(() => {
  //   cy.log('Isso acontece uma vez após todos os testes');
  // }); //executa uma vez após todos os it

});
