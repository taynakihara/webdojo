describe("Formulário de Consultoria", () => {
  it("Deve solicitar consultoria individual", () => {
    cy.start();
    cy.submitLoginForm("papito@webdojo.com", "katana123");
    cy.goTo("Formulários", "Consultoria");

    cy.get('input[placeholder="Digite seu nome completo"]').type(
      "Fernando Papito"
    );

    cy.get('input[placeholder="Digite seu email"]').type("papito@webdojo.com");
    cy.get('input[placeholder="(00) 00000-0000"]')
      .type("11 99999-1000")
      .should("have.value", "(11) 99999-1000");

    cy.contains("label", "Tipo de Consultoria")
      .parent()
      .find("select")
      .select("Individual");

    cy.contains("label", "Pessoa Física")
      .find("input")
      .click()
      .should("be.checked");

    cy.contains("label", "Pessoa Jurídica")
      .find("input")
      .should("not.be.checked");

    cy.contains("label", "CPF")
      .parent()
      .find("input")
      .type("12345678901")
      .should("have.value", "123.456.789-01");

    const discoveryChannels = [
      "Instagram",
      "LinkedIn",
      "Udemy",
      "YouTube",
      "Indicação de Amigo",
    ];

    discoveryChannels.forEach((channel) => {
      cy.contains("label", channel).find("input").check().should("be.checked");
    });

    cy.get('input[type="file"]').selectFile(
      "./cypress/fixtures/cypress_udemy.pdf",
      { force: true }
    );

    cy.get(
      'textarea[placeholder="Descreva mais detalhes sobre sua necessidade"]'
    ).type(
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod"
    );

    const techs = ["Cypress", "Robot Framework", "Python", "Java"];

    techs.forEach((tech) => {
      cy.get('input[placeholder="Digite uma tecnologia e pressione Enter"]')
        .type(tech)
        .type("{enter}");

      cy.contains("label", "Tecnologias")
        .parent()
        .contains("span", tech)
        .should("be.visible");
    });

    cy.contains("label", "termos de uso")
      .find("input")
      .check()
      .should("be.checked");

    cy.get('button[type="submit"]').click(); // OU cy.contains('button', 'Enviar Formulário').click()

    cy.get(".modal", { timeout: 10000 }) //modal da mensagem de sucesso
      .should("be.visible") //garante que o modal está visível
      .find(".modal-content") //procura o conteúdo do modal
      .should("be.visible") //garante que o conteúdo está visível
      .and(
        "have.text",
        "Sua solicitação de consultoria foi enviada com sucesso! Em breve, nossa equipe entrará em contato através do email fornecido.",
        { timeout: 20000 }
      ); //valida o texto exato do conteúdo

    it("Deve verifica os campos obrigatórios", () => {
      cy.start();
      cy.submitLoginForm("papito@webdojo.com", "katana123");
      cy.goTo("Formulários", "Consultoria");
      cy.get('button[type="submit"]').click();

      cy.contains("label", "Nome Completo")
        .parent() //navega ao pai do label
        .find("p") //procura o parágrafo dentro do pai
        .should("be.visible") //garante que o texto está visível
        .should("have.text", "Campo obrigatório") //valida o texto exato
        .and("have.class", "text-red-400") //valida a cor do texto
        .and("have.css", "color", "rgb(248, 113, 113)"); //valida direto no css a cor do texto

      cy.contains("label", "Email")
        .parent()
        .find("p")
        .should("be.visible")
        .should("have.text", "Campo obrigatório")
        .and("have.class", "text-red-400")
        .and("have.css", "color", "rgb(248, 113, 113)");

      cy.contains("label", "termos de uso")
        .parent()
        .find("p")
        .should("be.visible")
        .should("have.text", "Você precisa aceitar os termos de uso")
        .and("have.class", "text-red-400")
        .and("have.css", "color", "rgb(248, 113, 113)");
    });
  });
});
