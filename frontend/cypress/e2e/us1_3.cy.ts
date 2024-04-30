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
  it('TC-1 : Admin ban user whose point is 0', () => {
    cy.get('.h-\\[40\\%\\]').click();
    cy.wait(1000);
    cy.get('[href="/allusers"]').click();
    cy.wait(1000);
    cy.get('a > .block').click();
    cy.wait(1000);
    cy.contains('Ban').should('exist');
  })

  it('TC-2 : Admin can ban user whose point is negative', () => {
    cy.get('.h-\\[40\\%\\]').click();
    cy.wait(1000);
    cy.get('[href="/allusers"]').click();
  })

  it('TC-2 : Admin can not ban user whose point is positive', () => {
    cy.get('.h-\\[40\\%\\]').click();
    cy.wait(1000);
    cy.get('[href="/allusers"]').click();
  })
})