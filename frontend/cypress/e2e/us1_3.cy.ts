beforeEach(() => {

  cy.visit("/login");

  cy.get('input[type="email"]').type(Cypress.env('adminEmail'));

  cy.wait(1000);

  cy.get('input[type="password"]').type(Cypress.env('adminPass'));

  cy.wait(1000);

  cy.get('button[type="submit"]').click();

  cy.wait(1000);

});

describe('US1_3 Admin can ban user whose point is 0', () => {
  it('Test admin ban', () => {
    /* ==== Generated with Cypress Studio ==== */
    cy.get('.h-\\[40\\%\\]').click();
    cy.get('[href="/allusers"]').click();
    /* ==== End Cypress Studio ==== */
  })
})