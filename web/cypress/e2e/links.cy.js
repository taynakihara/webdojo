describe("Links abrindo nova guia/janela", () => {
  it("Validando o atributo do link do Instagram", () => {
    cy.start();
    cy.submitLoginForm("papito@webdojo.com", "katana123");

    cy.get('[data-cy="instagram-link"]')
      .should("have.attr", "href", "https://www.instagram.com/qapapito")
      .and("have.attr", "target", "_blank");
  });

  it.only("Acessa link de termos de uso removendo o target blank", () => {
    cy.start();
    cy.submitLoginForm("papito@webdojo.com", "katana123");

    cy.contains("Formulários").click();
    cy.contains("termos de uso").invoke("removeAttr", "target").click(); //remove a opção de abrir em nova guia/janela

    cy.contains(
      "Ao acessar e usar nossos serviços, você concorda em cumprir estes termos de uso."
    ).should("be.visible");
  });
});
