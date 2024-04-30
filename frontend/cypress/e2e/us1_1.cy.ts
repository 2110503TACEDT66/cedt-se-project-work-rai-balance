beforeEach(() => {

  // Initial login setup for user

  cy.visit("/login");

  cy.get('input[type="email"]').type(Cypress.env('userUs1Email'));

  cy.wait(1000);

  cy.get('input[type="password"]').type(Cypress.env('userPass'));

  cy.wait(1000);

  cy.get('button[type="submit"]').click();

  cy.wait(1000);

});

describe('template spec', () => {
  it('Check Point', () => {
    /* ==== Generated with Cypress Studio ==== */
    cy.get('.h-\\[40\\%\\]').click();
    cy.get('[href="/pointHistory/66306babe91195858a52cb21"]').click();
    cy.contains('Point : 2').should('exist');
    /* ==== End Cypress Studio ==== */
  })
})

// cy.get('.h-\\[40\\%\\]').click();
// cy.get('[href="/profile"]').click();
// /* ==== End Cypress Studio ==== */
// cy.contains('2').should('exist');