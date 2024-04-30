beforeEach(() => {

  cy.visit("/login");

  cy.get('input[type="email"]').type(Cypress.env('adminEmail'));

  cy.wait(1000);

  cy.get('input[type="password"]').type(Cypress.env('adminPass'));

  cy.wait(1000);

  cy.get('button[type="submit"]').click();

  cy.wait(1000);

});

describe('US2-4 Admin can delete user reviews', () => {
  it('Test admin disapprove review', () => {
    /* ==== Generated with Cypress Studio ==== */
    cy.get('.h-\\[40\\%\\]').click();
    cy.get('[href="/approval"]').click();
    /* ==== End Cypress Studio ==== */
  })
})