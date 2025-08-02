Cypress.on('uncaught:exception', (err, runnable) => {
  // Ignora erros não tratados da aplicação
  return false;
});

it('deve realizar uma reserva para 3 dias e efetuar o pagamento', () => {
  // Acessa o site de reservas
  cy.visit('https://reservas.desbravador.com.br/1111');

  // Aguarda carregamento e seleciona datas (10 a 12)
  cy.wait(3000);
  cy.get('.datepickerDays td:not(.datepickerNotInMonth) a').contains('10').click();
  cy.get('.datepickerDays td:not(.datepickerNotInMonth) a').contains('12').click();

  // Seleciona 2 adultos e 1 criança grátis
  cy.get('#cdadultos').select('2');
  cy.get('#cdchdfree').select('1');

  // Avança para a seleção de tarifas
  cy.get('#button').click();
  cy.get('#btn_tarifas-ST1-TESTEAR').click();
  cy.get('#bt_compra-ST1').click();

  // Clica no botão para pagar
  cy.get('#bt_pagar > .btn').click();

  // Abre o formulário de cadastro
  cy.get('#opcoes_autenticacao > .float-right').click();

  // Preenche o formulário de cadastro normal
  cy.get('#nmpessoafn').type('Luiz');
  cy.get('#nmpessoasn').type('Lazari');
  cy.get('#nmlogin').type('luiz@gmail.com');
  cy.get('#nmlogin1').type('luiz@gmail.com');
  cy.get('#nmsenha').type('ha123477g');
  cy.get('#nmsenha2').type('ha123477g');
  cy.get('#button').click();

  // Caso já possua cadastro, realiza o login
  cy.get('.float-left > a > strong').click();
  cy.get('#usuario').type('luiz@gmail.com');
  cy.get('#senha').type('ha123477g');
  cy.get('.largura_site > .cx').click();

  // Aqui tem o iframe de politica, onde ele aceita os termos e continua a reserva
  cy.get('#frame_politicas')
    .its('0.contentDocument.body').should('not.be.empty')
    .then(cy.wrap)
    .within(() => {
      // Marca o checkbox 
      cy.get('label.checkbox').click({ force: true });

      // Clica no botão para continuar a reserva
      cy.contains('button', 'Continuar Reserva').click({ force: true });
    });
});
