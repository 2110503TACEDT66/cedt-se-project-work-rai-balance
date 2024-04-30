beforeEach(() => {

  cy.visit("/login");

  cy.get('input[type="email"]').type(Cypress.env('userUs1Email'));

  cy.wait(1000);

  cy.get('input[type="password"]').type(Cypress.env('userPass'));

  cy.wait(1000);

  cy.get('button[type="submit"]').click();

  cy.wait(1000);

});

describe('User shall remove their booking if it\'s not due yet.', () => {
  it('Remove booking', function () {
    
    cy.get('[href="/coworking"]').click();

    cy.wait(1000);

    cy.get('[href="/coworking/65e2a201ccf74188031ddc3f"] > .h-\\[300px\\] > .h-\\[70\\%\\] > .object-cover').click();

    cy.wait(1000);

    cy.get('a > .block').click();

    cy.get('[data-testid="CalendarIcon"]').click();
    cy.get('.MuiIconButton-edgeStart').click();
    cy.get('.MuiIconButton-edgeStart').click();
    cy.get('[data-timestamp="1718125200000"]').click();
    
    cy.get('#\\:r2\\:').type('08:00 AM');
    cy.get('#\\:r4\\:').type('10:00 AM');

    cy.wait(1000);

    /* ==== Generated with Cypress Studio ==== */

    cy.get('.min-h-full > .block').click();
    cy.get('.h-\\[40\\%\\]').click();
    cy.get('[href="/mybooking"]').click();

    /* ==== End Cypress Studio ==== */

    cy.contains('Bartoletti').should('exist');

    /* ==== Generated with Cypress Studio ==== */

    cy.get('[alt="deletelogo"]').click();
    cy.get('a > .block').click();
    cy.contains('Bartoletti').should('not.exist');

    /* ==== End Cypress Studio ==== */
    
  });
})