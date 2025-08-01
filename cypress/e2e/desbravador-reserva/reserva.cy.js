Cypress.on('uncaught:exception', (err, runnable) => {
  return false; // Ignora erros não tratados da aplicação
});

describe('Reserva de hotel', () => {
  it('deve realizar uma reserva para 3 dias e efetuar o pagamento', () => {
    const email = `teste+${Date.now()}@gmail.com`;
    const senha = 'senha123';

    cy.visit('https://reservas.desbravador.com.br/1111');

    // Seleciona datas
    cy.get('.datepickerDays', { timeout: 10000 }).should('be.visible');
    cy.selecionarDatas('10', '12');

    // Seleciona hóspedes
    cy.get('#cdadultos').select('2');
    cy.get('#cdchdfree').select('1');

    // Seleciona tarifa
    cy.get('#button').click();
    cy.get('#btn_tarifas-ST1-TESTEAR').click();
    cy.get('#bt_compra-ST1').click();

    // Pagar
    cy.get('#bt_pagar > .btn').click();

    // Cadastro
    cy.get('#opcoes_autenticacao > .float-right').click();
    cy.preencherCadastro(email, senha);

    // Login (caso já exista)
    cy.fazerLogin(email, senha);
    cy.get('.largura_site > .cx').click();

    // Aceitar termos no iframe
      cy.get('#frame_politicas')
      .its('0.contentDocument.body').should('not.be.empty')
      .then(cy.wrap)
      .within(() => {
        // Marca o checkbox 
      cy.get('label.checkbox').click({ force: true });
    });

    // Verifica se finalizou a reserva com sucesso
    cy.contains('Reserva confirmada', { timeout: 10000 }).should('be.visible');
    cy.url().should('include', '/reserva-confirmada');
  });
});