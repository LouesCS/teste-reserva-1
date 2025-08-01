Cypress.Commands.add('selecionarDatas', (inicio, fim) => {
  cy.get('.datepickerDays td:not(.datepickerNotInMonth) a')
    .contains(inicio).click();
  cy.get('.datepickerDays td:not(.datepickerNotInMonth) a')
    .contains(fim).click();
});

Cypress.Commands.add('preencherCadastro', (email, senha) => {
  cy.get('#nmpessoafn').type('Luiz');
  cy.get('#nmpessoasn').type('Lazari');
  cy.get('#nmlogin').type(email);
  cy.get('#nmlogin1').type(email);
  cy.get('#nmsenha').type(senha);
  cy.get('#nmsenha2').type(senha);
  cy.get('#button').click();
});

Cypress.Commands.add('fazerLogin', (email, senha) => {
  cy.get('.float-left > a > strong').click();
  cy.get('#usuario').type(email);
  cy.get('#senha').type(senha);
  cy.get('.largura_site > .cx').click();
});

Cypress.Commands.add('getIframeBody', (iframeSelector) => {
  return cy
    .get(iframeSelector)
    .its('0.contentDocument.body')
    .should('not.be.empty')
    .then(cy.wrap);
});
