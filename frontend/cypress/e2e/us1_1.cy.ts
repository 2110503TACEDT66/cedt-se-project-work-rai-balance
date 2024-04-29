beforeEach(() => {

  // Initial login setup for user

  cy.visit("/login");

  cy.get('input[type="email"]').type(Cypress.env('userEmail'));

  cy.wait(250);

  cy.get('input[type="password"]').type(Cypress.env('userPass'));

  cy.wait(250);

  cy.get('button[type="submit"]').click();

  cy.wait(250);

});

describe('template spec', () => {
  it('Check Point', () => {

    /* ==== Generated with Cypress Studio ==== */

    cy.get('.h-\\[40\\%\\]').click();
    cy.get('[href="/pointHistory/662fcee0534b5136d4579ec0"]').click();

    /* ==== End Cypress Studio ==== */

    cy.contains('Point :').should('exist');

  })
})

// cy.get('.h-\\[40\\%\\]').click();
// cy.get('[href="/profile"]').click();
// /* ==== End Cypress Studio ==== */
// cy.contains('2').should('exist');